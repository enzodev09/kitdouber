import { useEffect, useRef, useState } from "react";
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
  const [method, setMethod] = useState<"pix" | "card">("pix");
  const [mpReady, setMpReady] = useState(false);
  const paymentControllerRef = useRef<any | null>(null);

  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY as string | undefined;
  const baseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  // Initialize Mercado Pago SDK (Checkout Bricks)
  useEffect(() => {
    if (!publicKey) return;
    let cancelled = false;
    const tryInit = () => {
      const MP = (window as any).MercadoPago;
      if (MP && !cancelled) {
        // Create a bricks builder instance and mark ready
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const mp = new MP(publicKey, { locale: "pt-BR" });
          setMpReady(true);
        } catch (e) {
          console.error("Falha ao inicializar Mercado Pago SDK:", e);
        }
        return;
      }
      if (!cancelled) setTimeout(tryInit, 200);
    };
    tryInit();
    return () => {
      cancelled = true;
    };
  }, [publicKey]);

  // Mount or remount the Payment Brick when method/total changes
  useEffect(() => {
    if (!mpReady || !publicKey) return;
    const MP = (window as any).MercadoPago;
    if (!MP) return;
    const mp = new MP(publicKey, { locale: "pt-BR" });
    const bricksBuilder = mp.bricks();

    // Clear previous instance if any
    try {
      paymentControllerRef.current?.unmount?.();
    } catch (_) {
      // no-op
    }
    const container = document.getElementById("paymentBrick_container");
    if (container) container.innerHTML = "";

    const allowCreditCard = method === "card";
    const allowPix = method === "pix";

    const settings = {
      initialization: {
        amount: Number(total.toFixed(2)),
        // payer email can be prefilled if available in future
      },
      customization: {
        paymentMethods: {
          creditCard: allowCreditCard ? "all" : "none",
          bankTransfer: allowPix ? "all" : "none", // enables Pix
          // disable boleto/ticket by default
          ticket: "none",
        },
        visual: {
          style: {
            theme: "default",
          },
        },
      },
      callbacks: {
        onReady: () => {
          // brick loaded
        },
        onSubmit: async ({ formData }: any) => {
          // Called when the user submits the Brick form
          try {
            setLoading(true);
            if (!baseUrl || !anonKey) throw new Error("Configuração do Supabase ausente");
            const resp = await fetch(`${baseUrl}/functions/v1/process-payment`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${anonKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                paymentMethod: method, // "pix" | "card"
                items: [
                  { title: "Kit Douber", quantity: 1, unit_price: summary.subtotal, currency_id: "BRL" },
                ],
                totals: { subtotal: summary.subtotal, shippingPrice: summary.shippingPrice },
                bricksFormData: formData,
              }),
            });
            const data = await resp.json();
            if (!resp.ok) {
              throw new Error((data && (data.error || data.message)) || `Falha HTTP ${resp.status}`);
            }
            // Expect backend to return at least { id, status }
            const status = (data && (data.status || data.status_detail)) || "processado";
            toast({ title: "Pagamento enviado", description: `Status: ${status}` });
            return;
          } catch (err: any) {
            console.error("Erro ao processar pagamento:", err);
            toast({ title: "Falha no pagamento", description: err?.message ?? "Tente novamente.", variant: "destructive" as any });
            throw err; // let the Brick know something went wrong
          } finally {
            setLoading(false);
          }
        },
        onError: (error: any) => {
          console.error("Erro no Payment Brick:", error);
          toast({ title: "Erro no formulário de pagamento", description: "Verifique os dados e tente novamente.", variant: "destructive" as any });
        },
      },
    } as any;

    bricksBuilder
      .create("payment", "paymentBrick_container", settings)
      .then((controller: any) => {
        paymentControllerRef.current = controller;
      })
      .catch((e: any) => {
        console.error("Falha ao criar Payment Brick:", e);
        toast({ title: "Pagamento indisponível", description: "Não foi possível carregar o componente de pagamento.", variant: "destructive" as any });
      });

    return () => {
      try {
        paymentControllerRef.current?.unmount?.();
      } catch (_) {}
    };
  }, [mpReady, publicKey, method, total]);

  const handlePay = async () => {
    // The button remains for UX, but submission is handled by the Brick itself.
    // We'll trigger the Brick submit programmatically if supported, else instruct the user.
    try {
      if (!paymentControllerRef.current) {
        toast({ title: "Carregando pagamento", description: "Aguarde o componente carregar e tente novamente." });
        return;
      }
      if (typeof paymentControllerRef.current.submit === "function") {
        paymentControllerRef.current.submit();
      } else {
        // Fallback: Do nothing; users can submit within the Brick UI.
        toast({ title: "Preencha os dados de pagamento", description: "Finalize dentro do formulário acima." });
      }
    } catch (e) {
      console.error(e);
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
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="pay-method" checked={method === "pix"} onChange={() => setMethod("pix")} /> Pix
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="pay-method" checked={method === "card"} onChange={() => setMethod("card")} /> Cartão
            </label>
          </div>
          {!publicKey && (
            <div className="text-sm text-red-600">Chave pública do Mercado Pago ausente. Defina VITE_MP_PUBLIC_KEY.</div>
          )}
          <div id="paymentBrick_container" className="mt-2" />
          <div className="text-xs text-slate-500">Pagamento processado pelo Mercado Pago. Seus dados estão seguros.</div>
          <Button onClick={handlePay} disabled={loading || !mpReady} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
            {loading ? "Processando..." : method === "pix" ? "Pagar com Pix" : "Pagar com Cartão"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step3_Payment;
