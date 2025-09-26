import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const products = [
  // Primeiro: Câmera e Marmiteira para aparecerem "em cima"
  {
    id: 6,
    name: "Câmera automotiva Full HD",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/D_NQ_NP_759698-MLB90984395204_082025-O.webp",
    description: "Mais segurança nas suas corridas. Se previna de falsas denúncias, acidentes ou problemas com passageiros. Tenha provas concretas e dirija com tranquilidade.",
  },
  {
    id: 4,
    name: "Marmiteira Elétrica 12V",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/014553A000001-marmita-eletrica-1-5l-bivolt-60w-ar0902-startools--1-.jpg.webp",
    description: "Cansado de comida fria e gastos extras na rua? Tenha uma refeição quente e caseira a qualquer momento, otimizando seu tempo e economizando nas suas longas jornadas.",
  },
  // Demais produtos
  {
    id: 1,
    name: "Aspirador Portátil Premium",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/aspirador_portatil_sem_fio_automotivo_recarregavel_premium_1571969801_877f_600x600.jpg",
    description: "Mantenha seu carro impecável sem complicação. Livre-se rapidamente de migalhas, poeira e sujeiras. Ofereça uma experiência premium e evite notas baixas ou reclamações por um veículo sujo.",
  },
  {
    id: 2,
    name: "Pano Microfibra",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/4e6fdd70de529374c1bfad627e491858.webp",
    description: "Acabe com poeira e manchas em segundos. Pano de microfibra que não risca nem solta fiapos, ideal para painel, vidros e bancos. Deixa o carro sempre apresentável e evita reclamações dos passageiros.",
  },
  {
    id: 3,
    name: "Aromatizador Automotivo",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/aromatizante_automotivo_perfume_carro_novo_suave_60ml_8670_1_78f63ee9f9a596a6d2ac6e2c1ba691e4.webp",
    description: "Elimine odores indesejáveis e garanta uma atmosfera sempre fresca. Evite reclamações de passageiros por cheiros desagradáveis e proporcione uma viagem muito mais agradável para todos.",
  },
  {
    id: 5,
    name: "Cooler Térmico 6L",
    image:
      "https://oxnkdfaiwbnbbmrjlkei.supabase.co/storage/v1/object/public/imagens/imagens%20hive%20of%20clicks/da31a4fa0ef97065f0c5fb750df5c46a.webp",
    description: "Bebidas quentes no calor? Nunca mais! Mantenha suas bebidas geladas e alimentos frescos durante todo o dia. Evite paradas desnecessárias e desfrute de conforto em qualquer corrida.",
  },
];
const KitProducts = () => {
  return (
    <section id="kit-products" className="py-12 lg:py-20 bg-kit-black relative overflow-hidden">
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
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(100,149,237,0.4) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}
        ></div>

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
            <div key={product.id} className="group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Outer gradient border frame */}
              <div className="relative rounded-2xl p-px bg-gradient-to-br from-white/20 via-white/5 to-white/10 hover:from-white/30 hover:via-white/10 hover:to-white/20 transition-colors duration-300">
                {/* Subtle top light */}
                <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Inner card */}
                <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-2xl">
                {/* Product Image */}
                  <div className="aspect-square bg-gray-900/40 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </div>
                {/* Product Title */}
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-white transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[12px] text-white/90 mt-1">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 lg:mt-16 animate-slide-up">
          <div className="relative overflow-hidden rounded-2xl max-w-4xl mx-auto border border-white/15 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
            {/* subtle glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[240px] rounded-full bg-white/10 blur-3xl" />

            <div className="p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-extrabold text-white mb-2 tracking-tight">
                Tudo isso por apenas <span className="text-white">R$ 399,00</span>
              </h3>

              {/* Detailed Price Breakdown */}
              <div className="mb-6">
                <p className="text-sm lg:text-base text-gray-300 mb-4">💰 Comprando separado você paga R$ 619,80:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto mb-5">
                  <div className="flex items-center rounded-xl text-sm px-4 py-3 bg-gradient-to-r from-white/12 to-white/6 border border-white/20 shadow-sm">
                    <span className="text-white/90">• Aspirador Portátil Premium</span>
                  </div>
                  <div className="flex items-center rounded-xl text-sm px-4 py-3 bg-gradient-to-r from-white/12 to-white/6 border border-white/20 shadow-sm">
                    <span className="text-white/90">• Marmiteira Elétrica 12V</span>
                  </div>
                  <div className="flex items-center rounded-xl text-sm px-4 py-3 bg-gradient-to-r from-white/12 to-white/6 border border-white/20 shadow-sm">
                    <span className="text-white/90">• Aromatizador Automotivo</span>
                  </div>
                  <div className="flex items-center rounded-xl text-sm px-4 py-3 bg-gradient-to-r from-white/12 to-white/6 border border-white/20 shadow-sm">
                    <span className="text-white/90">• Pano Microfibra</span>
                  </div>
                  <div className="flex items-center rounded-xl text-sm px-4 py-3 bg-gradient-to-r from-white/12 to-white/6 border border-white/20 shadow-sm">
                    <span className="text-white/90">• Cooler Térmico 6L</span>
                  </div>
                  <div className="flex items-center rounded-xl text-sm px-4 py-3 bg-gradient-to-r from-white/12 to-white/6 border border-white/20 shadow-sm md:col-span-2">
                    <span className="text-white/90">• Câmera automotiva Full HD</span>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="px-4 py-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-gray-300">Total Separado:</span>
                      <span className="text-red-400 line-through">R$ 619,80</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-extrabold mt-1">
                      <span className="text-white">Kit Completo:</span>
                      <span className="text-green-400">R$ 399,00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-black text-white">41%</div>
                  <div className="text-xs lg:text-sm text-gray-300">de desconto</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-black text-white">✓</div>
                  <div className="text-xs lg:text-sm text-gray-300">qualidade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default KitProducts;