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
  { id: "economy", label: "Econômico", price: 0, eta: "6-8 dias úteis" },
  { id: "standard", label: "Padrão", price: 19.9, eta: "3-5 dias úteis" },
  { id: "express", label: "Expresso", price: 34.9, eta: "1-2 dias úteis" },
];

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

    // Minimal example call — you'll likely adapt to your seller/shipper id and package info
    // Reference: https://docs.melhorevio.com.br/
    const calcPayload = {
      // Set your origin zip in a secret or hard-code for now
      from: { postal_code: Deno.env.get("ORIGIN_ZIP") ?? "01001-000" },
      to: { postal_code: zip },
      // Example package — update with real weight/dimensions later
      packages: [
        { height: 10, width: 20, length: 25, weight: 1 },
      ],
      services: [], // empty means all services the account can use
    };

    const url = "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate";
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
    const options: ShippingOption[] = (Array.isArray(quotes) ? quotes : []).slice(0, 5).map((q: any) => ({
      id: String(q.id ?? q.service ?? crypto.randomUUID()),
      label: String(q.name ?? q.company?.name ?? "Serviço"),
      price: Number(q.price ?? q.custom_price ?? 0),
      eta: String(q.delivery_time?.days ? `${q.delivery_time.days} dias úteis` : "-"),
    }));

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
