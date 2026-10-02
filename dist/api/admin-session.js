const { json, readBody, createSession, sessionCookie, clearCookie, safeEqual, validSession } = require('./_lib');

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') return json(res, 200, { authenticated: validSession(req) });
    if (req.method === 'DELETE') return json(res, 200, { ok: true }, { 'Set-Cookie': clearCookie() });
    if (req.method !== 'POST') return json(res, 405, { error: 'Método não permitido.' }, { Allow: 'GET, POST, DELETE' });
    const body = await readBody(req);
    const configured = process.env.ADMIN_PASSWORD;
    if (!configured) return json(res, 503, { error: 'A senha administrativa ainda não foi configurada na Vercel.' });
    if (!safeEqual(body.password, configured)) return json(res, 401, { error: 'Senha incorreta.' });
    return json(res, 200, { ok: true }, { 'Set-Cookie': sessionCookie(createSession()) });
  } catch (error) {
    return json(res, 500, { error: error.message || 'Não foi possível entrar.' });
  }
};
