import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const products = [
  // Primeiro: Câmera e Marmiteira para aparecerem "em cima"
  {
    id: 6,
    name: "Câmera automotiva Full HD",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/D_NQ_NP_759698-MLB90984395204_082025-O.webp",
    description: "Registre suas viagens com vídeo nítido em Full HD.",
  },
  {
    id: 4,
    name: "Marmiteira Elétrica 12V",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/014553A000001-marmita-eletrica-1-5l-bivolt-60w-ar0902-startools--1-.jpg.webp",
    description: "Aqueça suas refeições no carro com praticidade.",
  },
  // Demais produtos
  {
    id: 1,
    name: "Aspirador Portátil Premium",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/aspirador_portatil_sem_fio_automotivo_recarregavel_premium_1571969801_877f_600x600.jpg",
    description: "Potência e agilidade para limpeza rápida do carro.",
  },
  {
    id: 2,
    name: "Kit Organização + Pano",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/4e6fdd70de529374c1bfad627e491858.webp",
    description: "Organize o porta-malas e limpe com microfibra.",
  },
  {
    id: 3,
    name: "Aromatizador Automotivo",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/aromatizante_automotivo_perfume_carro_novo_suave_60ml_8670_1_78f63ee9f9a596a6d2ac6e2c1ba691e4.webp",
    description: "Perfuma e neutraliza odores por mais tempo.",
  },
  {
    id: 5,
    name: "Cooler Térmico 6L",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/da31a4fa0ef97065f0c5fb750df5c46a.webp",
    description: "Mantém bebidas e lanches na temperatura ideal.",
  },
];
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
            6 Produtos Essenciais
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            O que tem no seu
            <span className="block text-white">Kit Uber</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Cada produto foi cuidadosamente selecionado para tornar sua experiência como motorista mais profissional e confortável.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105">
                {/* Product Image */}
                <div className="aspect-square bg-gray-900/40 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                </div>
                
                {/* Product Title */}
                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-gray-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-gray-300 mt-1">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 lg:mt-16 animate-slide-up">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
              Tudo isso por apenas <span className="text-white">R$ 399,00</span>
            </h3>
            
            {/* Detailed Price Breakdown */}
            <div className="mb-6">
              <p className="text-sm lg:text-base text-gray-300 mb-4">💰 Comprando separado você paga R$ 619,80:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto mb-4">
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20">
                  <span>• Aspirador Portátil Premium</span>
                  <span className="font-bold">R$ 159,90</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20">
                  <span>• Marmiteira Elétrica 12V</span>
                  <span className="font-bold">R$ 149,90</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20">
                  <span>• Aromatizador Automotivo</span>
                  <span className="font-bold">R$ 39,90</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20">
                  <span>• Kit Organização + Pano</span>
                  <span className="font-bold">R$ 89,90</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20">
                  <span>• Cooler Térmico 6L</span>
                  <span className="font-bold">R$ 109,90</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 text-white px-3 py-2 rounded text-sm border border-white/20 md:col-span-2">
                  <span>• Câmera automotiva Full HD</span>
                  <span className="font-bold">R$ 69,90</span>
                </div>
              </div>
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-300">Total Separado:</span>
                  <span className="text-red-400 line-through">R$ 619,80</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold mt-1">
                  <span className="text-white">Kit Completo:</span>
                  <span className="text-green-400">R$ 399,00</span>
                </div>
              </div>
            </div>
            
              <div className="flex justify-center gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">41%</div>
                  <div className="text-xs lg:text-sm text-gray-300">de desconto</div>
                </div>
              {/* Removed installments info as requested */}
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