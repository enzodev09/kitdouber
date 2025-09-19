// @ts-nocheck
// Supabase Edge Function: process-payment
// Creates a Mercado Pago preference and returns its id and init_point.
// Requires secret: MERCADO_PAGO_ACCESS_TOKEN

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type CreatePaymentRequest = {
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
  shipping?: {
    address?: string;
    number?: string;
    zip?: string;
    selectedOptionId?: string;
  };
  items?: Array<{
    title: string;
    quantity: number;
    unit_price: number;
    currency_id?: string;
  }>;
  totals?: {
    subtotal: number;
    shippingPrice: number;
  };
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const MP_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!MP_TOKEN) {
      return new Response(JSON.stringify({ error: "Missing MERCADO_PAGO_ACCESS_TOKEN" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const body = (await req.json()) as CreatePaymentRequest;
    const origin = req.headers.get("origin") ?? undefined;

    const orderId = crypto.randomUUID();

    // Compose items — fall back to single item if not sent
    const items = (body.items && body.items.length > 0)
      ? body.items.map((it) => ({
          title: it.title,
          quantity: it.quantity,
          unit_price: it.unit_price,
          currency_id: it.currency_id ?? "BRL",
        }))
      : [
          {
            title: "Kit Douber",
            quantity: 1,
            unit_price: 399,
            currency_id: "BRL",
          },
        ];

    const back_urls = origin
      ? {
          success: `${origin}/checkout?status=success&order=${orderId}`,
          failure: `${origin}/checkout?status=failure&order=${orderId}`,
          pending: `${origin}/checkout?status=pending&order=${orderId}`,
        }
      : undefined;

    const preferencePayload = {
      items,
      external_reference: orderId,
      back_urls,
      auto_return: "approved" as const,
      // Additional optional fields could be set here (payer, shipments, notification_url)
    };

    const resp = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferencePayload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Mercado Pago error", resp.status, text);
      return new Response(JSON.stringify({ error: "Mercado Pago API error", status: resp.status }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const pref = await resp.json();
    const response = {
      orderId,
      preferenceId: pref.id as string,
      initPoint: (pref.init_point || pref.sandbox_init_point) as string | undefined,
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 200,
    });
  } catch (err) {
    console.error("process-payment error", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
