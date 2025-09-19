-- Migration: Create orders table for checkout flow
-- Date: 2025-09-18

-- Enable extensions commonly used on Supabase (safe if already enabled)
create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Customer
  full_name text not null,
  email text not null,
  phone text,

  -- Shipping address
  address_line text,
  address_number text,
  address_city text,
  address_state text,
  address_zip text,

  -- Shipping selection snapshot
  shipping_service text,
  shipping_company text,
  shipping_eta_days int,
  shipping_amount numeric(10,2) not null default 0,
  shipping_quote_id text,

  -- Amounts
  currency text not null default 'BRL',
  subtotal_amount numeric(10,2) not null default 0,
  total_amount numeric(10,2) not null default 0,

  -- Payment
  payment_provider text not null default 'mercado_pago',
  payment_status text not null default 'pending' check (
    payment_status in ('pending','paid','failed','refunded','cancelled')
  ),
  payment_preference_id text,
  payment_external_id text,

  -- Items snapshot (for future multi-item support)
  items jsonb,

  -- Misc
  notes text
);

comment on table public.orders is 'Customer orders created from the checkout flow';

-- Helpful indexes
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_payment_status_idx on public.orders (payment_status);
create index if not exists orders_payment_external_id_idx on public.orders (payment_external_id);

-- RLS: keep enabled; Edge Functions (service role) bypass RLS by design
alter table public.orders enable row level security;

-- Optional: add read policy later if you want customers to fetch their order by email/id
-- Example (only if you add authenticated users with email claim):
-- create policy "Select own order by email" on public.orders
--   for select using (email = (current_setting('request.jwt.claims', true)::jsonb ->> 'email'));
