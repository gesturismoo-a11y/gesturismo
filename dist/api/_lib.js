const crypto = require('crypto');

const COOKIE_NAME = 'gess_admin';
const SESSION_SECONDS = 8 * 60 * 60;

function json(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
  res.end(JSON.stringify(body));
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 1_700_000) reject(new Error('Payload muito grande.'));
    });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch { reject(new Error('Conteúdo inválido.')); }
    });
    req.on('error', reject);
  });
}

function env() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error('A conexão segura com o banco ainda não está configurada.');
  return { url: url.replace(/\/$/, ''), key };
}

async function db(path, options = {}) {
  const { url, key } = env();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) {
    const error = new Error(data?.message || data?.hint || 'Não foi possível acessar o banco.');
    error.status = response.status;
    throw error;
  }
  return data;
}

function sessionSecret() {
  const { key } = env();
  return crypto.createHash('sha256').update(`${key}|gess-admin-session-v1`).digest();
}

function sign(value) {
  return crypto.createHmac('sha256', sessionSecret()).update(value).digest('base64url');
}

function createSession() {
  const payload = `${Date.now() + SESSION_SECONDS * 1000}.${crypto.randomBytes(18).toString('base64url')}`;
  return `${payload}.${sign(payload)}`;
}

function parseCookies(req) {
  return Object.fromEntries(String(req.headers.cookie || '').split(';').map(item => item.trim()).filter(Boolean).map(item => {
    const index = item.indexOf('=');
    return [decodeURIComponent(item.slice(0, index)), decodeURIComponent(item.slice(index + 1))];
  }));
}

function validSession(req) {
  const token = parseCookies(req)[COOKIE_NAME];
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || Number(parts[0]) < Date.now()) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expected = sign(payload);
  if (expected.length !== parts[2].length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parts[2]));
}

function requireAdmin(req, res) {
  if (validSession(req)) return true;
  json(res, 401, { error: 'Sessão expirada. Entre novamente.' });
  return false;
}

function sessionCookie(token) {
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
}

function clearCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ''));
  const right = Buffer.from(String(b || ''));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function clean(value, max = 300) {
  return String(value ?? '').trim().slice(0, max);
}

module.exports = { json, readBody, db, createSession, sessionCookie, clearCookie, safeEqual, validSession, requireAdmin, clean };
