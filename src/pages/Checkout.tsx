import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CreditCard, QrCode, ArrowLeft, ArrowRight } from "lucide-react";

type PaymentMethod = "pix" | "card";

const Checkout = () => {
  const [payment, setPayment] = useState<PaymentMethod>("pix");

  return (
    <div className="min-h-screen bg-kit-black text-white">
      <div className="container mx-auto px-4 py-8 lg:py-14">
        <div className="mb-6">
          <Badge variant="secondary" className="bg-white text-black">Checkout Seguro</Badge>
          <h1 className="text-3xl lg:text-4xl font-extrabold mt-3">Finalizar compra</h1>
          <p className="text-gray-300">Preencha seus dados e escolha a forma de pagamento.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Coluna esquerda: dados do cliente e envio */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Dados pessoais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input id="nome" placeholder="Seu nome" className="bg-black/30 border-white/20 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="voce@email.com" className="bg-black/30 border-white/20 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(xx) xxxxx-xxxx" className="bg-black/30 border-white/20 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" className="bg-black/30 border-white/20 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Endereço de entrega</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" placeholder="00000-000" className="bg-black/30 border-white/20 text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="rua">Rua</Label>
                    <Input id="rua" placeholder="Nome da rua" className="bg-black/30 border-white/20 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="numero">Número</Label>
                    <Input id="numero" placeholder="123" className="bg-black/30 border-white/20 text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input id="complemento" placeholder="Apto, bloco, etc." className="bg-black/30 border-white/20 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input id="bairro" placeholder="Bairro" className="bg-black/30 border-white/20 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" placeholder="Cidade" className="bg-black/30 border-white/20 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" placeholder="UF" className="bg-black/30 border-white/20 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Pagamento</h2>
                <RadioGroup defaultValue={payment} onValueChange={(v) => setPayment(v as PaymentMethod)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Label htmlFor="pix" className="cursor-pointer">
                    <div className={`flex items-center gap-3 bg-black/30 border ${payment === "pix" ? "border-green-400" : "border-white/20"} rounded-xl p-4`}>
                      <RadioGroupItem value="pix" id="pix" />
                      <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-green-400" />
                        <span className="font-semibold">Pix (recomendado)</span>
                      </div>
                    </div>
                  </Label>
                  <Label htmlFor="card" className="cursor-pointer">
                    <div className={`flex items-center gap-3 bg-black/30 border ${payment === "card" ? "border-blue-400" : "border-white/20"} rounded-xl p-4`}>
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold">Cartão de crédito</span>
                      </div>
                    </div>
                  </Label>
                </RadioGroup>

                {payment === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber">Número do cartão</Label>
                      <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="bg-black/30 border-white/20 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nome impresso</Label>
                      <Input id="cardName" placeholder="Como no cartão" className="bg-black/30 border-white/20 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input id="cardCvv" placeholder="123" className="bg-black/30 border-white/20 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="cardExp">Validade</Label>
                      <Input id="cardExp" placeholder="MM/AA" className="bg-black/30 border-white/20 text-white" />
                    </div>
                  </div>
                )}

                {payment === "pix" && (
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
                    Geraremos um QR Code Pix no próximo passo.
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" className="border-white/40 text-white" onClick={() => history.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white font-bold">
                    Continuar <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna direita: resumo do pedido */}
          <div>
            <Card className="bg-white/5 border-white/10 sticky top-4">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Resumo do pedido</h2>
                <div className="flex items-center gap-3">
                  <img src="/lovable-uploads/5f285537-bdd3-4a83-8fb5-3bf37b7133fd.png" alt="Kit Uber" className="w-16 h-16 object-contain" />
                  <div>
                    <div className="font-semibold">Kit Uber Completo</div>
                    <div className="text-sm text-gray-300">Entrega rápida</div>
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>R$ 399,00</span></div>
                  <div className="flex justify-between"><span>Frete</span><span>Grátis</span></div>
                  <div className="flex justify-between font-bold text-white"><span>Total</span><span>R$ 399,00</span></div>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white font-extrabold">
                  Finalizar agora
                </Button>
                <p className="text-xs text-gray-400 text-center">🔒 Compra 100% segura • SSL • Dados protegidos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
