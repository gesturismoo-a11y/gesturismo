const { json, readBody, requireAdmin, clean } = require('./_lib');
const { getSettings, updateSettings } = require('./_settings-db');

function normalizePhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  return digits;
}

function normalizeInstagram(value) {
  return clean(value, 64).replace(/^@/, '').replace(/[^a-zA-Z0-9._]/g, '');
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') return json(res, 200, await getSettings());
    if (req.method !== 'PATCH') return json(res, 405, { error: 'Método não permitido.' }, { Allow: 'GET, PATCH' });
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req), whatsapp = normalizePhone(body.whatsapp), instagramHandle = normalizeInstagram(body.instagramHandle);
    if (!/^55\d{10,11}$/.test(whatsapp)) return json(res, 400, { error: 'Informe um WhatsApp brasileiro válido com DDD.' });
    if (!/^[a-zA-Z0-9._]{1,64}$/.test(instagramHandle)) return json(res, 400, { error: 'Informe um arroba válido do Instagram.' });
    return json(res, 200, await updateSettings({ whatsapp, instagramHandle, showInstagram: Boolean(body.showInstagram) }));
  } catch (error) {
    return json(res, 500, { error: error.message || 'Não foi possível salvar as configurações.' });
  }
};
