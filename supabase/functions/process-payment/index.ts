// @ts-nocheck
// Supabase Edge Function: process-payment
// Creates a Mercado Pago payment (Pix or Card) using Checkout Bricks data (no redirect)
// Requires secret: MERCADO_PAGO_ACCESS_TOKEN (supports MERCADO_PAGO_ACESSO_TOKEN fallback)

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type CreatePaymentRequest = any;

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

    const MP_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN") ?? Deno.env.get("MERCADO_PAGO_ACESSO_TOKEN");
    if (!MP_TOKEN) {
      return new Response(JSON.stringify({ error: "Missing MERCADO_PAGO_ACCESS_TOKEN" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const body = (await req.json()) as CreatePaymentRequest;
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return new Response(JSON.stringify({ error: "invalid amount" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const mode = (body.mode ?? body.paymentMethod ?? "pix").toLowerCase();
    const payerEmail = body.customer?.email;

    // Build payload for /v1/payments
    let paymentPayload: any = {
      transaction_amount: amount,
      description: "Kit Douber",
      payer: { email: payerEmail },
    };

    if (mode === "card") {
      const f = body.cardFormData ?? {};
      paymentPayload = {
        ...paymentPayload,
        token: f.token,
        installments: f.installments ?? 1,
        payment_method_id: f.payment_method_id,
        issuer_id: f.issuer_id,
        payer: {
          email: payerEmail,
          identification: f.payer?.identification,
        },
      };
    } else if (mode === "pix") {
      paymentPayload = { ...paymentPayload, payment_method_id: "pix" };
    } else {
      return new Response(JSON.stringify({ error: "invalid mode" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const resp = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
    });

    const json = await resp.json();
    if (!resp.ok || !json?.id) {
      console.error("Mercado Pago payment error", resp.status, json);
      return new Response(JSON.stringify({ error: "mp_payment_error", status: resp.status, detail: json }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ id: json.id, status: json.status, detail: json }), {
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
