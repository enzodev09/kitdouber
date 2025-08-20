import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import vacuumIcon from "@/assets/vacuum-icon.png";
import clothIcon from "@/assets/cloth-icon.png";
import freshenerIcon from "@/assets/freshener-icon.png";
import lunchboxIcon from "@/assets/lunchbox-icon.png";
import coffeeIcon from "@/assets/coffee-icon.png";
import blueElectricWarmerIcon from "@/assets/blue-electric-warmer-icon.png";
const products = [{
  id: 1,
  name: "Aspirador Portátil",
  description: "Aspirador de pó sem fio, perfeito para limpeza rápida do carro. Bateria de longa duração e sucção poderosa.",
  icon: vacuumIcon,
  features: ["Sem fio", "Bateria 2h", "Filtro HEPA"],
  color: "from-blue-500 to-blue-600"
}, {
  id: 2,
  name: "Panos de Algodão",
  description: "Kit com 5 panos de microfibra premium para limpeza interna e externa. Super absorventes e duráveis.",
  icon: clothIcon,
  features: ["5 unidades", "Microfibra", "Lavável"],
  color: "from-indigo-500 to-indigo-600"
}, {
  id: 3,
  name: "Cheirinho Automotivo",
  description: "Aromatizador de ambiente com fragrância exclusiva de longa duração. Fixação fácil no ar condicionado.",
  icon: freshenerIcon,
  features: ["60 dias", "Fragrância exclusiva", "Fácil fixação"],
  color: "from-purple-500 to-purple-600"
}, {
  id: 4,
  name: "Marmiteira Elétrica",
  description: "Aquece sua comida direto no carro via entrada 12V. Perfeita para almoços durante longas jornadas.",
  icon: blueElectricWarmerIcon,
  features: ["12V", "Aquecimento rápido", "Tampa hermética"],
  color: "from-indigo-500 to-indigo-600"
}, {
  id: 5,
  name: "Cooler 6L",
  description: "Cooler térmico de 6 litros, perfeito para manter bebidas e lanches frescos durante longas jornadas.",
  icon: coffeeIcon,
  features: ["6 litros", "Isolamento térmico", "Alça resistente"],
  color: "from-red-500 to-red-600"
}];
const KitProducts = () => {
  return <section id="kit-products" className="py-12 lg:py-20 bg-kit-black relative overflow-hidden">
      {/* Blue LED Background Effects */}
      <div className="absolute inset-0">
        {/* Blue LED glows */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-kit-blue-light/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-kit-blue/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kit-blue-light/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        
        {/* Blue LED subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-kit-black via-kit-blue-darker/30 to-kit-black"></div>
        
        {/* Blue grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(100,149,237,0.4) 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }}></div>
        
        {/* Blue LED edge lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-kit-blue-light/5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-kit-blue-light/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 lg:mb-16 animate-slide-up">
          <Badge variant="secondary" className="mb-4 bg-white text-black text-xs lg:text-sm">
            5 Produtos Essenciais
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            O que tem no seu
            <span className="block text-white">Kit Uber</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Cada produto foi cuidadosamente selecionado para tornar sua experiência como motorista mais profissional e confortável.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => <Card key={product.id} className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all duration-300 group overflow-hidden" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <CardContent className="p-0">
                {/* Product Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 lg:p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="bg-white p-2 lg:p-3 rounded-xl backdrop-blur-sm">
                      <img src={product.icon} alt={product.name} className="w-8 h-8 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge variant="secondary" className="bg-white text-black text-xs">
                      Premium
                    </Badge>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-4 lg:p-6 space-y-3 lg:space-y-4">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white">Características:</h4>
                    <div className="flex flex-wrap gap-1 lg:gap-2">
                      {product.features.map((feature, idx) => <Badge key={idx} variant="outline" className="text-xs bg-white/20 text-gray-300 border-white/30 hover:bg-white hover:text-black transition-colors">
                          {feature}
                        </Badge>)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 lg:mt-16 animate-slide-up">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
              Tudo isso por apenas <span className="text-white">R$ 167,00</span>
            </h3>
            
            {/* Detailed Price Breakdown */}
            <div className="mb-6">
              <p className="text-sm lg:text-base text-gray-300 mb-4">💰 Comprando separado você paga R$ 271,59:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto mb-4">
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20">
                  <span>• Aspirador Portátil Premium</span>
                  <span className="font-bold">R$ 89,90</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20">
                  <span>• Marmiteira Elétrica 12V</span>
                  <span className="font-bold">R$ 79,90</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20">
                  <span>• Aromatizador Automotivo</span>
                  <span className="font-bold">R$ 15,99</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20">
                  <span>• Kit Organização + Pano</span>
                  <span className="font-bold">R$ 35,90</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20 md:col-span-2">
                  <span>• Cooler Térmico 6L</span>
                  <span className="font-bold">R$ 49,90</span>
                </div>
              </div>
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-300">Total Separado:</span>
                  <span className="text-red-400 line-through">R$ 271,59</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold mt-1">
                  <span className="text-white">Kit Completo:</span>
                  <span className="text-green-400">R$ 167,00</span>
                </div>
              </div>
            </div>
            
              <div className="flex justify-center gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">38%</div>
                  <div className="text-xs lg:text-sm text-gray-300">de desconto</div>
                </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">3x</div>
                <div className="text-xs lg:text-sm text-gray-300">sem juros</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">✓</div>
                <div className="text-xs lg:text-sm text-gray-300">qualidade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default KitProducts;