import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Step1_PersonalDetails, { PersonalDetails } from "@/components/checkout/Step1_PersonalDetails";
import Step2_Shipping, { ShippingDetails } from "@/components/checkout/Step2_Shipping";
import Step3_Payment from "@/components/checkout/Step3_Payment";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CheckoutForm = PersonalDetails & ShippingDetails & {
  // future payment fields can be added here
};

const initialForm: CheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  number: "",
  zip: "",
  selectedOptionId: undefined,
};

const SHIPPING_PRICE_MAP: Record<string, number> = {
  economy: 0,
  standard: 19.9,
  express: 34.9,
};

const CheckoutPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<CheckoutForm>(initialForm);

  const subtotal = 399; // preço do kit
  const shippingPrice = form.selectedOptionId ? (SHIPPING_PRICE_MAP[form.selectedOptionId] ?? 0) : 0;

  const canNext = useMemo(() => {
    if (step === 1) return !!(form.fullName && form.email && form.phone);
    if (step === 2) return !!(form.address && form.number && form.zip && form.selectedOptionId);
    return true;
  }, [step, form]);

  const next = () => setStep((s) => (s === 3 ? 3 : (s + 1)) as 1 | 2 | 3);
  const back = () => setStep((s) => (s === 1 ? 1 : (s - 1)) as 1 | 2 | 3);

  const updateForm = (patch: Partial<CheckoutForm>) => setForm((prev) => ({ ...prev, ...patch }));

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="container mx-auto px-4 py-8 lg:py-14">
        <div className="mb-6">
          <Badge variant="secondary" className="bg-blue-600 text-white">Checkout Seguro</Badge>
          <h1 className="text-3xl lg:text-4xl font-extrabold mt-3">Finalizar compra</h1>
          {/* Step progress */}
          <div className="mt-4 flex items-center gap-4">
            {[1,2,3].map((n) => {
              const isActive = n === step;
              const isDone = n < step;
              return (
                <div key={n} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${isActive ? 'bg-blue-600 text-white border-blue-600' : isDone ? 'bg-green-500 text-white border-green-500' : 'bg-white text-slate-700 border-gray-300'}`}>
                    {n}
                  </div>
                  <span className={`text-sm ${isActive ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>Etapa {n}</span>
                  {n < 3 && <div className="w-8 h-0.5 bg-gray-200 mx-2" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                {step === 1 && (
                  <Step1_PersonalDetails
                    data={{ fullName: form.fullName, email: form.email, phone: form.phone }}
                    onChange={updateForm}
                  />
                )}
                {step === 2 && (
                  <Step2_Shipping
                    data={{ address: form.address, number: form.number, zip: form.zip, selectedOptionId: form.selectedOptionId }}
                    onChange={updateForm}
                  />
                )}
                {step === 3 && (
                  <Step3_Payment
                    summary={{ subtotal, shippingPrice }}
                  />
                )}
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <Button variant="outline" className="border-gray-300 text-slate-800" onClick={back} disabled={step === 1}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
              </Button>
              <Button onClick={next} disabled={!canNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                {step === 3 ? "Finalizar" : "Avançar"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Resumo lateral */}
          <div>
            <Card className="bg-white border border-gray-200 shadow-sm sticky top-4">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Resumo</h2>
                <div className="flex items-center gap-3">
                  <img src="/lovable-uploads/5f285537-bdd3-4a83-8fb5-3bf37b7133fd.png" alt="Kit Uber" className="w-16 h-16 object-contain" />
                  <div>
                    <div className="font-semibold text-slate-900">Kit Uber Completo</div>
                    <div className="text-sm text-slate-600">1 unidade</div>
                  </div>
                </div>
                <div className="text-sm space-y-1 text-slate-800">
                  <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Frete</span><span>{shippingPrice === 0 ? "Grátis" : `R$ ${shippingPrice.toFixed(2)}`}</span></div>
                  <div className="flex justify-between font-bold text-slate-900"><span>Total</span><span>R$ {(subtotal + shippingPrice).toFixed(2)}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
