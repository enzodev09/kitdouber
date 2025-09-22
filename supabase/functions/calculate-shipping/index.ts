// @ts-nocheck
// Supabase Edge Function: calculate-shipping
// Looks up shipping quotes using Melhor Envio token, falling back to mock options
// Requires secret: MELHOR_ENVIO_API_TOKEN (optional for mock)

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type CalcReq = {
  zip: string; // destination CEP
};

type ShippingOption = {
  id: string;
  label: string;
  price: number;
  eta: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const mock: ShippingOption[] = [
  { id: "standard", label: "Padrão", price: 19.9, eta: "3-5 dias úteis" },
  { id: "express", label: "Expresso", price: 34.9, eta: "1-2 dias úteis" },
];

const env = (Deno.env.get("MELHOR_ENVIO_ENV") ?? "sandbox").toLowerCase();
const API_BASE = env === "prod"
  ? "https://api.melhorenvio.com.br/api/v2"
  : "https://sandbox.melhorenvio.com.br/api/v2";

const parsePrice = (q: any): number => {
  const candidates = [q.final_price, q.price, q.custom_price, q.total, q.cost];
  for (const c of candidates) {
    if (typeof c === "number" && Number.isFinite(c)) return c;
    if (typeof c === "string") {
      const n = parseFloat(c.replace(",", "."));
      if (Number.isFinite(n)) return n;
    }
  }
  return 0;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const body = (await req.json()) as CalcReq;
    const { zip } = body || {};
    if (!zip) {
      return new Response(JSON.stringify({ error: "zip is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const token = Deno.env.get("MELHOR_ENVIO_API_TOKEN");
    if (!token) {
      // No token configured: return mock to keep UX flowing
      return new Response(JSON.stringify({ options: mock }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      });
    }

    // Minimal example call — adjust weight/dimensions to your product
    // Reference: https://docs.melhorenvio.com.br/
    const calcPayload = {
      from: { postal_code: Deno.env.get("ORIGIN_ZIP") ?? "04925-000" },
      to: { postal_code: zip },
      products: [
        { id: "kit", width: 35, height: 30, length: 35, weight: 1.0, insurance_value: 399, quantity: 1 },
      ],
      options: { receipt: false, own_hand: false, reverse: false, non_commercial: true },
      // services: [] => all available
    };

    const url = `${API_BASE}/me/shipment/calculate`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(calcPayload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Melhor Envio error", resp.status, text);
      return new Response(JSON.stringify({ options: mock, warning: "fallback-mock" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      });
    }

    const quotes = await resp.json();
    // Map quotes to our minimal UI structure
    const list = Array.isArray(quotes) ? quotes : [];
    const options: ShippingOption[] = list.slice(0, 8).map((q: any) => {
      const company = q.company?.name ?? q.company_name ?? "";
      const service = q.name ?? q.service?.name ?? q.service_name ?? "Serviço";
      const eta = q.delivery_range?.min && q.delivery_range?.max
        ? `${q.delivery_range.min}-${q.delivery_range.max} dias úteis`
        : q.delivery_time?.days
        ? `${q.delivery_time.days} dias úteis`
        : "-";
      return {
        id: String(q.id ?? q.service?.id ?? `${company}-${service}`),
        label: [company, service].filter(Boolean).join(" • "),
        price: parsePrice(q),
        eta,
      };
    }).filter((o) => Number.isFinite(o.price));

    return new Response(JSON.stringify({ options: options.length ? options : mock }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });
  } catch (err) {
    console.error("calculate-shipping error", err);
    return new Response(JSON.stringify({ options: mock, warning: "exception-mock" }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });
  }
});
