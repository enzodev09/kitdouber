import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
          {/* TODO: Integrar o formulário de pagamento seguro do Mercado Pago aqui. */}
          <div className="text-sm text-slate-600">
            Área reservada para o widget/formulário de pagamento (cartão, Pix, etc.).
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step3_Payment;
