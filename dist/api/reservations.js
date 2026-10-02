const crypto = require('crypto');
const { json, readBody, db, requireAdmin, clean } = require('./_lib');

const asReservation = row => ({
  id: row.id, code: row.code, customer: row.customer_name, phone: row.phone, email: row.email || '',
  travelerNames: row.traveler_names || '', destinationKey: row.destination_key, destination: row.destination,
  date: row.travel_date, pickup: row.pickup, adults: row.adults, children: row.children,
  travelers: row.travelers, total: row.total_cents / 100, status: row.status, createdAt: row.created_at,
  payments: (row.payments || []).map(p => ({ id: p.charge_id, amount: p.amount_cents / 100, confirmedAt: p.confirmed_at })),
  charges: (row.charges || []).map(c => ({ id: c.id, token: c.public_token, now: c.amount_cents / 100,
    balance: c.balance_after_cents / 100, pix: c.pix_code, qrImage: c.qr_image, note: c.note || '',
    confirmed: c.status === 'confirmed', cancelled: ['cancelled', 'replaced'].includes(c.status), createdAt: c.created_at }))
});

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const body = await readBody(req);
      const adults = Number(body.adults), children = Number(body.children || 0), total = Number(body.total);
      const customer = clean(body.customer, 160), phone = clean(body.phone, 32), destination = clean(body.destination, 120);
      const destinationKey = clean(body.destinationKey, 64), date = clean(body.date, 10), pickup = clean(body.pickup, 300);
      if (!customer || !phone || !destination || !destinationKey || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !pickup || !Number.isInteger(adults) || !Number.isInteger(children) || adults < 1 || children < 0 || adults + children > 6 || !Number.isFinite(total) || total <= 0) {
        return json(res, 400, { error: 'Confira os dados do pedido.' });
      }
      const code = `GESS-${Date.now().toString(36).slice(-5).toUpperCase()}${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
      const rows = await db('reservations', {
        method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({
          code, customer_name: customer, phone, email: clean(body.email, 254) || null,
          traveler_names: clean(body.travelerNames, 1500) || null, destination_key: destinationKey,
          destination, travel_date: date, pickup, adults, children, total_cents: Math.round(total * 100)
        })
      });
      return json(res, 201, asReservation(rows[0]));
    }

    if (!requireAdmin(req, res)) return;
    if (req.method === 'GET') {
      const rows = await db('reservations?select=*,charges(*),payments(*)&order=created_at.desc');
      return json(res, 200, rows.map(asReservation));
    }
    if (req.method === 'PATCH') {
      const body = await readBody(req), id = clean(body.id, 36);
      if (!/^[0-9a-f-]{36}$/i.test(id)) return json(res, 400, { error: 'Reserva inválida.' });
      const updates = {};
      if ('customer' in body) updates.customer_name = clean(body.customer, 160);
      if ('phone' in body) updates.phone = clean(body.phone, 32);
      if ('email' in body) updates.email = clean(body.email, 254) || null;
      if ('pickup' in body) updates.pickup = clean(body.pickup, 300);
      if ('travelerNames' in body) updates.traveler_names = clean(body.travelerNames, 1500) || null;
      const rows = await db(`reservations?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify(updates) });
      return json(res, 200, asReservation(rows[0]));
    }
    if (req.method === 'DELETE') {
      const id = clean(req.query?.id, 36);
      if (!/^[0-9a-f-]{36}$/i.test(id)) return json(res, 400, { error: 'Reserva inválida.' });
      await db(`reservations?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
      return json(res, 200, { ok: true });
    }
    return json(res, 405, { error: 'Método não permitido.' });
  } catch (error) {
    return json(res, error.status === 409 ? 409 : 500, { error: error.message || 'Não foi possível concluir a operação.' });
  }
};
