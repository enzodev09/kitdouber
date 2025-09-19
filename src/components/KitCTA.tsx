import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Shield, Truck, CreditCard, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const KitCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-8 lg:py-20 bg-kit-black relative overflow-hidden">
      {/* Blue LED Background Effects */}
      <div className="absolute inset-0">
        {/* Blue LED glows */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-kit-blue-light/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-kit-blue/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kit-blue-light/10 rounded-full blur-[100px] animate-pulse-slow"></div>

        {/* Blue LED subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-kit-black via-kit-blue-darker/30 to-kit-black"></div>

        {/* Blue grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(100,149,237,0.4) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Blue LED edge lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-kit-blue-light/5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-kit-blue-light/5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <div className="mb-6 lg:mb-12 animate-slide-up">
            <Badge
              variant="secondary"
              className="mb-4 lg:mb-6 text-white text-xs lg:text-sm px-4 py-2 bg-orange-600"
            >
              🔥 ÚLTIMA CHANCE - OFERTA LIMITADA
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 lg:mb-6">
              <span className="block text-kit-blue-light">Kit Uber Completo</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-4 lg:mb-8 max-w-3xl mx-auto font-semibold">
              Garante já o seu e ganhe tempo e aumente seus ganhos hoje mesmo!
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 mb-6 lg:mb-12">
            {/* Left: Main Pricing Card */}
            <Card className="bg-gradient-to-br from-white to-gray-50 border-0 animate-slide-up shadow-2xl overflow-hidden">
              <CardContent className="p-6 lg:p-10">
                <div className="text-center space-y-4 lg:space-y-6">
                  {/* Kit Image */}
                  <div className="flex justify-center mb-3">
                    <img
                      src="/lovable-uploads/5f285537-bdd3-4a83-8fb5-3bf37b7133fd.png"
                      alt="Kit Uber Completo"
                      className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
                    />
                  </div>

                  {/* Flash Sale Badge */}
                  <div className="text-white text-sm font-bold py-2 px-4 rounded-full mx-auto w-fit bg-red-600">
                    🔥 FLASH SALE - 41% OFF
                  </div>

                  {/* Price Comparison */}
                  <div className="space-y-3">
                    <div className="text-5xl lg:text-6xl font-bold text-black leading-none">R$ 399,00</div>

                    {/* Individual vs Kit Pricing */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="border-t border-gray-300 pt-2 mt-3">
                          <div className="flex justify-between items-center text-base">
                            <span className="font-bold text-gray-800">Total Separado:</span>
                            <span className="font-bold text-red-600 line-through">R$ 619,80</span>
                          </div>
                          <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-green-700">Kit Completo:</span>
                            <span className="font-bold text-green-700">R$ 399,00</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-100 text-green-800 text-lg font-bold py-3 px-4 rounded-lg text-center">
                        🎉 Você economiza R$ 252,80!
                      </div>
                    </div>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-2 gap-4 py-6">
                    <div className="flex items-center gap-3 text-base">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Truck className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold">Entrega Rápida</span>
                    </div>
                    <div className="flex items-center gap-3 text-base">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold">Garantia Total</span>
                    </div>
                    <div className="flex items-center gap-3 text-base">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold">Entrega Rápida</span>
                    </div>
                    <div className="flex items-center gap-3 text-base">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold">Pix ou Cartão</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="space-y-4">
                    <Button
                      onClick={() => navigate("/checkout")}
                      className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white hover:from-orange-600 hover:via-red-600 hover:to-orange-700 w-full text-lg sm:text-xl font-extrabold py-4 sm:py-6 px-4 rounded-2xl group shadow-2xl transform hover:scale-[1.02] active:scale-95 transition-all duration-200 border-2 border-orange-400 hover:border-orange-300"
                    >
                      <div className="flex items-center justify-center gap-2 w-full">
                        <span className="text-lg sm:text-xl">🔥</span>
                        <span className="sm:hidden">COMPRAR AGORA</span>
                        <span className="hidden sm:inline">COMPRAR AGORA - R$ 399,00</span>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Button>

                    {/* Payment Methods */}
                    <div className="space-y-3">
                      <div className="text-sm text-gray-700 font-semibold">
                        Pague em até 3x no cartão ou à vista no Pix
                      </div>
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {/* Hipercard */}
                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm flex items-center">
                          <svg width="40" height="24" viewBox="0 0 32 20" className="fill-current text-red-600">
                            <rect width="32" height="20" rx="4" fill="#E31837" />
                            <text x="16" y="13" textAnchor="middle" className="text-[8px] font-bold fill-white">
                              HIPER
                            </text>
                          </svg>
                        </div>

                        {/* Elo */}
                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm flex items-center">
                          <img src="/lovable-uploads/ce6b8df4-a09f-4e04-84de-e49c83701dea.png" alt="Elo" className="h-6 w-auto" />
                        </div>

                        {/* Visa */}
                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm flex items-center">
                          <svg width="40" height="24" viewBox="0 0 32 20">
                            <rect width="32" height="20" rx="4" fill="#1A1F71" />
                            <text x="16" y="13" textAnchor="middle" className="text-[8px] font-bold fill-white italic">
                              VISA
                            </text>
                          </svg>
                        </div>

                        {/* Mastercard */}
                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm flex items-center">
                          <svg width="40" height="24" viewBox="0 0 32 20">
                            <rect width="32" height="20" rx="4" fill="white" />
                            <circle cx="12" cy="10" r="6" fill="#EB001B" />
                            <circle cx="20" cy="10" r="6" fill="#FF5F00" />
                            <path d="M16 6a6 6 0 0 0 0 8 6 6 0 0 0 0-8z" fill="#FF5F00" />
                          </svg>
                        </div>

                        {/* Pix */}
                        <div className="bg-white border border-gray-200 rounded-lg px-3 py-3 shadow-sm flex items-center">
                          <img src="/lovable-uploads/820b7512-4575-4eaf-be91-2c289e030d7d.png" alt="Pix" className="h-6 w-auto" />
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 font-medium">🔒 Compra 100% segura • SSL • Dados protegidos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right: Urgency & Trust */}
            <div className="space-y-6">
              {/* Urgency Counter */}
              <Card className="bg-gradient-to-br from-red-500 to-orange-500 text-white border-0 animate-slide-up shadow-xl">
                <CardContent className="p-6 lg:p-8 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Clock className="w-8 h-8 text-white animate-pulse" />
                    <span className="text-xl font-bold">ATENÇÃO!</span>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold mb-3">Oferta Limitada</div>
                  <div className="text-lg font-semibold mb-2">aproveite essa promoção!</div>
                  <div className="text-sm opacity-90">Não perca essa oportunidade única!</div>
                </CardContent>
              </Card>

              {/* What's Included */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-up">
                <CardContent className="p-6 lg:p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Kit Completo por apenas:</h3>
                  <div className="text-center text-white">
                    <div className="text-3xl lg:text-4xl font-bold mb-2">R$ 399,00</div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-up">
                <CardContent className="p-6 lg:p-8 text-center">
                  <h4 className="text-xl font-bold text-white mb-4">Motoristas já aprovaram!</h4>
                  <div className="grid grid-cols-3 gap-4 text-white">
                    <div>
                      <div className="text-2xl font-bold">4.9★</div>
                      <div className="text-sm text-gray-300">Avaliação</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm text-gray-300">Recomendam</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">até 8 dias</div>
                      <div className="text-sm text-gray-300">Sudeste grátis</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Urgency */}
          <div className="text-center text-white animate-slide-up mb-6 lg:mb-8"></div>

          {/* Additional CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 justify-center animate-slide-up mb-6 lg:mb-12">
            <Button
              variant="outline"
              onClick={() => navigate("/checkout")}
              className="border-2 border-white text-white bg-black/20 backdrop-blur-sm px-4 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-xs lg:text-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Comprar agora
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 border-2 border-green-400 hover:border-green-300 px-4 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-xs lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 animate-pulse"></div>
              <div className="relative flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5 animate-bounce" />
                <span>Falar no WhatsApp</span>
                <div className="ml-1 text-xs bg-green-300 text-green-800 px-2 py-1 rounded-full font-extrabold animate-pulse">
                  ONLINE
                </div>
              </div>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8 text-center text-gray-300 animate-slide-up">
            <div>
              <div className="text-xl lg:text-2xl font-bold text-white">até 8 dias</div>
              <div className="text-xs lg:text-sm">Sudeste grátis</div>
            </div>
            <div>
              <div className="text-xl lg:text-2xl font-bold text-white">4.9★</div>
              <div className="text-xs lg:text-sm">Nota média</div>
            </div>
            <div>
              <div className="text-xl lg:text-2xl font-bold text-white">98%</div>
              <div className="text-xs lg:text-sm">Recomendam</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default KitCTA;