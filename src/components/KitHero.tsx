import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
const KitHero = () => {
  return <section className="min-h-screen bg-kit-black relative overflow-hidden">
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
      
      <div className="container mx-auto px-4 py-8 lg:py-12 xl:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[70vh] lg:min-h-[60vh]">
          {/* Text Content */}
          <div className="text-white space-y-4 lg:space-y-8 animate-slide-in-left text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-white/90">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 fill-current text-yellow-400" />
                <span className="text-xs lg:text-sm font-medium text-white">Kit Completo para Motoristas</span>
              </div>
              
               <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.85]">
                 <span className="block text-white tracking-[-0.02em] mb-1 lg:mb-2">KIT</span>
                 <span className="block bg-gradient-to-r from-kit-blue-light via-white to-kit-blue-light bg-clip-text text-transparent tracking-[-0.01em] drop-shadow-lg">UBER</span>
               </h1>
               
               <p className="text-base sm:text-lg lg:text-2xl text-white/90 max-w-lg mx-auto lg:mx-0">Tudo que você precisa para ser o motorista mais preparado e profissional!</p>
            </div>

            <div className="space-y-3 lg:space-y-6">
               <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-4 text-gray-300 text-xs sm:text-sm">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
                   <span>6 produtos essenciais</span>
                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Qualidade premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Entrega rápida</span>
                </div>
              </div>

               <div className="flex flex-col gap-2 lg:gap-4">
                <Button className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white hover:from-orange-600 hover:via-red-600 hover:to-orange-700 px-4 lg:px-10 py-3 lg:py-5 rounded-xl font-bold text-sm lg:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group w-full sm:w-auto border-2 border-orange-400 hover:border-orange-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    
                    Comprar Agora
                    <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
                <Button variant="outline" onClick={() => {
                const productsSection = document.getElementById('kit-products');
                if (productsSection) {
                  productsSection.scrollIntoView({
                    behavior: 'smooth'
                  });
                }
              }} className="border-2 border-white text-white bg-black/20 backdrop-blur-sm px-4 lg:px-10 py-3 lg:py-5 rounded-xl font-bold text-sm lg:text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 transform w-full sm:w-auto">
                  Ver Produtos
                </Button>
              </div>

            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in-right order-first lg:order-last">
            <div className="relative max-w-md mx-auto lg:max-w-sm xl:max-w-md">
              <img src="/lovable-uploads/5f285537-bdd3-4a83-8fb5-3bf37b7133fd.png" alt="Kit Uber - Produtos reais: marmiteira elétrica, cooler 6L, aspirador portátil, perfume automotivo, panos de limpeza e câmera portátil" className="w-full h-auto rounded-2xl shadow-[var(--shadow-hover)] animate-float" />
              
              {/* Floating Badge */}
              <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 bg-white text-black px-3 py-2 lg:px-6 lg:py-3 rounded-full shadow-xl animate-pulse-slow border-2 border-gray-200">
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-black">6 em 1</div>
                  <div className="text-xs text-gray-600">Produtos</div>
                </div>
              </div>

              {/* Price Badge */}
              <div className="absolute -bottom-3 -left-3 lg:-bottom-6 lg:-left-6 bg-black text-white px-4 py-2 lg:px-8 lg:py-4 rounded-2xl shadow-xl border-2 border-white">
                <div className="text-center">
                  <div className="text-xs lg:text-sm text-gray-400 line-through">R$ 619,80</div>
                  <div className="text-xl lg:text-3xl font-bold text-white">R$ 367,00</div>
                  <div className="text-xs text-gray-300">ou até 3x sem juros</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>;
};
export default KitHero;