# Supabase: schema & migrations

This folder contains SQL to create the `orders` table used by the checkout flow.

## Apply the migration

Option A — Supabase SQL Editor (fastest)
- Open your project at app.supabase.com
- SQL Editor > New query
- Paste the contents of `migrations/2025-09-18_create_orders.sql`
- Run

Option B — Supabase CLI (recommended for CI)
- Requires Supabase CLI installed and linked to the project

```powershell
# From the repository root
# Ensure you are logged in and linked (replace with your project ref)
supabase login
supabase link --project-ref <your-project-ref>

# Apply the migration
supabase db push
```

Notes
- The table has RLS enabled; Edge Functions using the Service Role key bypass RLS.
- Add a SELECT policy later only if end-users should read their own orders.

## Edge Functions

Functions added:
- `calculate-shipping`: Calls Melhor Envio (when token set) and returns shipping options; has mock fallback.
- `process-payment`: Creates a Mercado Pago checkout preference and returns `initPoint` for redirect.

Deploy steps (PowerShell):

```powershell
# Login and link once
supabase login
supabase link --project-ref <your-project-ref>

# Set required secrets (these live on Supabase)
supabase secrets set MERCADO_PAGO_ACCESS_TOKEN="<mp-access-token>"
supabase secrets set MELHOR_ENVIO_API_TOKEN="<melhor-envio-token>"
# Optional: origin ZIP for Melhor Envio calculations
supabase secrets set ORIGIN_ZIP="01001-000"

# Deploy functions
supabase functions deploy calculate-shipping
supabase functions deploy process-payment

# Test from your frontend (uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
# POST {baseUrl}/functions/v1/calculate-shipping { zip }
# POST {baseUrl}/functions/v1/process-payment { items, totals }
```

Security
- Do NOT expose private API keys in the frontend. Only Supabase secrets inside Edge Functions.
- The frontend calls functions with the anon key; the functions use secrets to access external providers.
