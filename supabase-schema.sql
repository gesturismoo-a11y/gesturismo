create extension if not exists pgcrypto;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  code varchar(32) not null unique,
  customer_name varchar(160) not null,
  phone varchar(32) not null,
  email varchar(254),
  traveler_names text,
  destination_key varchar(64) not null,
  destination varchar(120) not null,
  travel_date date not null,
  pickup varchar(300) not null,
  adults smallint not null check (adults between 1 and 6),
  children smallint not null default 0 check (children between 0 and 5),
  travelers smallint generated always as (adults + children) stored,
  total_cents integer not null check (total_cents > 0),
  status varchar(32) not null default 'awaiting_charge'
    check (status in ('awaiting_charge','charge_ready','partial','paid','refunded','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (adults + children between 1 and 6)
);

create table if not exists public.charges (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  public_token uuid not null default gen_random_uuid() unique,
  amount_cents integer not null check (amount_cents > 0),
  paid_before_cents integer not null default 0 check (paid_before_cents >= 0),
  balance_after_cents integer not null check (balance_after_cents >= 0),
  pix_code text not null check (char_length(pix_code) between 5 and 4096),
  qr_image text not null check (
    qr_image ~ '^data:image/(png|jpeg|webp);base64,' and
    octet_length(qr_image) <= 1400000
  ),
  note varchar(300),
  status varchar(24) not null default 'awaiting'
    check (status in ('awaiting','confirmed','replaced','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  charge_id uuid not null unique references public.charges(id) on delete cascade,
  amount_cents integer not null check (amount_cents > 0),
  confirmed_at timestamptz not null default now(),
  confirmed_by uuid references auth.users(id)
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email varchar(254) not null unique,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists reservations_created_at_idx
  on public.reservations (created_at desc);
create index if not exists reservations_customer_name_idx
  on public.reservations (lower(customer_name));
create index if not exists reservations_destination_idx
  on public.reservations (destination_key, travel_date);
create index if not exists charges_reservation_idx
  on public.charges (reservation_id, created_at desc);
create index if not exists payments_reservation_idx
  on public.payments (reservation_id, confirmed_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists reservations_set_updated_at on public.reservations;
create trigger reservations_set_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();

drop trigger if exists charges_set_updated_at on public.charges;
create trigger charges_set_updated_at
before update on public.charges
for each row execute function public.set_updated_at();

alter table public.reservations enable row level security;
alter table public.charges enable row level security;
alter table public.payments enable row level security;
alter table public.admins enable row level security;

revoke all on table public.reservations from anon, authenticated;
revoke all on table public.charges from anon, authenticated;
revoke all on table public.payments from anon, authenticated;
revoke all on table public.admins from anon, authenticated;
