const { json, readBody, db, requireAdmin, validSession, clean } = require('./_lib');
const { runQuery } = require('./_settings-db');
const QRCode = require('qrcode');

let optionalQrReady = false;
async function allowOptionalQr() {
  if (optionalQrReady) return;
  await runQuery('alter table public.charges alter column qr_image drop not null');
  optionalQrReady = true;
}

async function getReservation(id) {
  const rows = await db(`reservations?id=eq.${encodeURIComponent(id)}&select=*,payments(*)`);
  return rows[0];
}

const publicCharge = row => ({
  v: 3, id: row.id, code: row.reservations.code, customer: row.reservations.customer_name,
  phone: row.reservations.phone, email: row.reservations.email || '', travelerNames: row.reservations.traveler_names || '',
  adults: row.reservations.adults, children: row.reservations.children, travelers: row.reservations.travelers,
  destination: row.reservations.destination, date: row.reservations.travel_date, pickup: row.reservations.pickup,
  total: row.reservations.total_cents / 100, now: row.amount_cents / 100, balance: row.balance_after_cents / 100,
  pix: row.pix_code, qrImage: row.qr_image, note: row.note || '', confirmed: row.status === 'confirmed'
});

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET' && req.query?.token) {
      const token = clean(req.query.token, 36);
      if (!/^[0-9a-f-]{36}$/i.test(token)) return json(res, 404, { error: 'Cobrança não encontrada.' });
      const rows = await db(`charges?public_token=eq.${encodeURIComponent(token)}&status=neq.cancelled&status=neq.replaced&select=*,reservations(*)`);
      if (!rows[0]) return json(res, 404, { error: 'Cobrança não encontrada.' });
      return json(res, 200, publicCharge(rows[0]));
    }
    if (!requireAdmin(req, res)) return;
    if (req.method === 'POST') {
      const body = await readBody(req), reservationId = clean(body.reservationId, 36), amount = Number(body.amount);
      const pix = clean(body.pix, 4096), uploadedQr = String(body.qrImage || ''), note = clean(body.note, 300);
      if (!/^[0-9a-f-]{36}$/i.test(reservationId) || !Number.isFinite(amount) || amount <= 0 || !pix || (uploadedQr && !/^data:image\/(png|jpeg|webp);base64,/.test(uploadedQr)) || uploadedQr.length > 1_400_000) return json(res, 400, { error: 'Confira o valor e o Pix informado.' });
      await allowOptionalQr();
      const qrImage = uploadedQr || (/^000201/.test(pix) ? await QRCode.toDataURL(pix, { width: 420, margin: 2, errorCorrectionLevel: 'M' }) : null);
      const reservation = await getReservation(reservationId);
      if (!reservation) return json(res, 404, { error: 'Reserva não encontrada.' });
      const paid = (reservation.payments || []).reduce((sum, item) => sum + item.amount_cents, 0);
      const remaining = reservation.total_cents - paid, amountCents = Math.round(amount * 100);
      const minimum = paid > 0 ? 1 : Math.min(remaining, reservation.travelers * 10000);
      if (amountCents < minimum || amountCents > remaining) return json(res, 400, { error: `O valor deve ficar entre R$ ${(minimum / 100).toFixed(2)} e R$ ${(remaining / 100).toFixed(2)}.` });
      await db(`charges?reservation_id=eq.${encodeURIComponent(reservationId)}&status=eq.awaiting`, { method: 'PATCH', body: JSON.stringify({ status: 'replaced' }) });
      const rows = await db('charges', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({
        reservation_id: reservationId, amount_cents: amountCents, paid_before_cents: paid,
        balance_after_cents: remaining - amountCents, pix_code: pix, qr_image: qrImage, note: note || null
      }) });
      await db(`reservations?id=eq.${encodeURIComponent(reservationId)}`, { method: 'PATCH', body: JSON.stringify({ status: 'charge_ready' }) });
      return json(res, 201, { id: rows[0].id, token: rows[0].public_token, now: amount, balance: (remaining - amountCents) / 100 });
    }
    if (req.method === 'PATCH') {
      const body = await readBody(req), id = clean(body.id, 36);
      if (!validSession(req) || !/^[0-9a-f-]{36}$/i.test(id)) return json(res, 400, { error: 'Cobrança inválida.' });
      const charges = await db(`charges?id=eq.${encodeURIComponent(id)}&status=eq.awaiting&select=*`), charge = charges[0];
      if (!charge) return json(res, 409, { error: 'Esta cobrança já foi confirmada ou substituída.' });
      const reservation = await getReservation(charge.reservation_id);
      const paid = (reservation.payments || []).reduce((sum, item) => sum + item.amount_cents, 0);
      if (paid + charge.amount_cents > reservation.total_cents) return json(res, 409, { error: 'O valor ultrapassa o saldo atual.' });
      await db('payments', { method: 'POST', body: JSON.stringify({ reservation_id: reservation.id, charge_id: charge.id, amount_cents: charge.amount_cents }) });
      await db(`charges?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ status: 'confirmed' }) });
      const remaining = reservation.total_cents - paid - charge.amount_cents;
      await db(`reservations?id=eq.${encodeURIComponent(reservation.id)}`, { method: 'PATCH', body: JSON.stringify({ status: remaining === 0 ? 'paid' : 'partial' }) });
      return json(res, 200, { ok: true, remaining: remaining / 100 });
    }
    return json(res, 405, { error: 'Método não permitido.' });
  } catch (error) {
    return json(res, error.status === 409 ? 409 : 500, { error: error.message || 'Não foi possível concluir a cobrança.' });
  }
};
