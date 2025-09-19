import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export type PaymentSummary = {
  subtotal: number;
  shippingPrice: number;
};

type Props = {
  summary: PaymentSummary;
};

const currency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Step3_Payment = ({ summary }: Props) => {
  const total = summary.subtotal + summary.shippingPrice;
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
      if (!baseUrl || !anonKey) throw new Error("Supabase env vars ausentes");

      const resp = await fetch(`${baseUrl}/functions/v1/process-payment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${anonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            { title: "Kit Douber", quantity: 1, unit_price: summary.subtotal, currency_id: "BRL" },
          ],
          totals: { subtotal: summary.subtotal, shippingPrice: summary.shippingPrice },
        }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const json = (await resp.json()) as { initPoint?: string; preferenceId?: string };
      if (json.initPoint) {
        // Simple redirect flow; later we can mount the Brick wallet
        window.location.href = json.initPoint;
        return;
      }
      throw new Error("Resposta inválida do servidor de pagamento");
    } catch (err: any) {
      console.error("Pagamento falhou", err);
      toast({ title: "Falha no pagamento", description: err?.message ?? "Tente novamente em instantes.", variant: "destructive" as any });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Pagamento</h2>
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6 space-y-3 text-slate-900">
          <h3 className="text-lg font-semibold">Resumo do pedido</h3>
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>{currency(summary.subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span>Frete</span><span>{summary.shippingPrice === 0 ? "Grátis" : currency(summary.shippingPrice)}</span></div>
          <Separator className="bg-gray-200" />
          <div className="flex justify-between font-bold text-base text-slate-900"><span>Total</span><span>{currency(total)}</span></div>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6 space-y-3 text-slate-900">
          <h3 className="text-lg font-semibold">Pagamento seguro</h3>
          <div className="text-sm text-slate-600">Você será redirecionado ao ambiente seguro do Mercado Pago para concluir o pagamento.</div>
          <Button onClick={handlePay} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
            {loading ? "Processando..." : "Pagar com Mercado Pago"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step3_Payment;
