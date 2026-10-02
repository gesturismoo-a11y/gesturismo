const { Pool } = require('pg');

let pool;
let ensured = false;
function getPool() {
  const rawConnectionString = process.env.SUPABASE_POSTGRES_URL || process.env.SUPABASE_POSTGRES_URL_NON_POOLING;
  if (!rawConnectionString) throw new Error('A conexão de configurações não está disponível.');
  const parsed = new URL(rawConnectionString);
  parsed.searchParams.delete('sslmode');
  parsed.searchParams.delete('sslcert');
  parsed.searchParams.delete('sslkey');
  parsed.searchParams.delete('sslrootcert');
  if (!pool) pool = new Pool({ connectionString: parsed.toString(), ssl: { rejectUnauthorized: false }, max: 1, idleTimeoutMillis: 10000 });
  return pool;
}

async function ensureSettings() {
  if (ensured) return;
  const client = getPool();
  await client.query(`
    create table if not exists public.site_settings (
      id smallint primary key default 1 check (id = 1),
      whatsapp varchar(15) not null default '5511987785390',
      instagram_handle varchar(64) not null default 'gess_turismo',
      show_instagram boolean not null default true,
      updated_at timestamptz not null default now()
    )
  `);
  await client.query(`alter table public.site_settings enable row level security`);
  await client.query(`revoke all on table public.site_settings from anon, authenticated`);
  await client.query(`insert into public.site_settings (id) values (1) on conflict (id) do nothing`);
  ensured = true;
}

async function getSettings() {
  await ensureSettings();
  const result = await getPool().query('select whatsapp, instagram_handle, show_instagram, updated_at from public.site_settings where id = 1');
  const row = result.rows[0];
  return { whatsapp: row.whatsapp, instagramHandle: row.instagram_handle, showInstagram: row.show_instagram, updatedAt: row.updated_at };
}

async function updateSettings({ whatsapp, instagramHandle, showInstagram }) {
  await ensureSettings();
  const result = await getPool().query(
    `update public.site_settings set whatsapp = $1, instagram_handle = $2, show_instagram = $3, updated_at = now() where id = 1 returning whatsapp, instagram_handle, show_instagram, updated_at`,
    [whatsapp, instagramHandle, showInstagram]
  );
  const row = result.rows[0];
  return { whatsapp: row.whatsapp, instagramHandle: row.instagram_handle, showInstagram: row.show_instagram, updatedAt: row.updated_at };
}

async function pingDatabase() {
  const started = Date.now();
  await getPool().query('select 1');
  return Date.now() - started;
}

module.exports = { getSettings, updateSettings, pingDatabase };
