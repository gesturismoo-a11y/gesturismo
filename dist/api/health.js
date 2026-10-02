const { json, requireAdmin } = require('./_lib');
const { pingDatabase } = require('./_settings-db');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Método não permitido.' });
  if (!requireAdmin(req, res)) return;
  try {
    const databaseMs = await pingDatabase();
    return json(res, 200, { online: true, database: true, databaseMs, checkedAt: new Date().toISOString() });
  } catch (error) {
    return json(res, 503, { online: true, database: false, error: error.message, checkedAt: new Date().toISOString() });
  }
};
