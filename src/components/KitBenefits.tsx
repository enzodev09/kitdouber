import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Clock, Truck, Users } from "lucide-react";
const priceComparison = [{
  item: "Aspirador Portátil",
  individual: "R$ 89,90",
  kit: "Incluso"
}, {
  item: "Marmiteira Elétrica",
  individual: "R$ 129,90",
  kit: "Inclusa"
}, {
  item: "Aromatizador Premium",
  individual: "R$ 45,90",
  kit: "Incluso"
}, {
  item: "Pano Microfibra",
  individual: "R$ 24,90",
  kit: "Incluso"
}, {
  item: "Organizador",
  individual: "R$ 39,90",
  kit: "Incluso"
}];
const testimonials = [{
  name: "Carlos Silva",
  rating: 5,
  comment: "Esse aspirador é uma beleza só de não gastar mais dinheiro com aquelas máquinas de aspirar no posto de gasolina já valeu a pena.",
  city: "São Paulo - SP"
}, {
  name: "Maria Santos",
  rating: 5,
  comment: "Economizei mais dinheiro e tempo são coisas que todo motorista tem necessidade.",
  city: "Rio de Janeiro - RJ"
}, {
  name: "João Oliveira",
  rating: 5,
  comment: "Antes comia na rua agora com essa marmita 12v minha esposa faz a comida para mim e eu esquento no carro, compensa demais.",
  city: "Belo Horizonte - MG"
}];
const KitBenefits = () => {
  return <section className="py-12 lg:py-20 bg-kit-black relative overflow-hidden">
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
        {/* Price Comparison Section */}
        <div className="mb-16 lg:mb-20">
          

          {/* Visual Comparison Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Individual Purchase */}
            

            {/* Kit Purchase */}
            
          </div>

          {/* Big Savings Banner */}
          <div className="relative bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-6 lg:p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/90 to-blue-500/90"></div>
            <div className="relative z-10">
              <div className="text-black text-lg lg:text-xl font-bold mb-2">
                🎉 VOCÊ ECONOMIZA
              </div>
              <div className="text-black text-5xl lg:text-6xl font-bold mb-3">R$ 94,59</div>
              <div className="text-black text-base lg:text-lg font-semibold mb-2">Isso é mais de 36% de desconto!</div>
              <div className="text-black/80 text-sm lg:text-base">
                Todos os produtos que você precisa por um preço que cabe no seu bolso
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-white" />
              <Badge variant="secondary" className="bg-white text-black">
                +10.000 motoristas satisfeitos
              </Badge>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              O que nossos clientes dizem
            </h3>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 text-lg font-semibold text-white">4.9/5</span>
            </div>
            <p className="text-gray-300">Baseado em mais de 3.000 avaliações</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="border-0 bg-white/20 backdrop-blur-sm" style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-white mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="pt-4">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-300">{testimonial.city}</div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">+10k</div>
            <div className="text-xs lg:text-sm text-gray-300">Motoristas atendidos</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">4.9★</div>
            <div className="text-xs lg:text-sm text-gray-300">Avaliação média</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">Entrega rápida</div>
            <div className="text-xs lg:text-sm text-gray-300">Grátis SE</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">100%</div>
            <div className="text-xs lg:text-sm text-gray-300">Garantia</div>
          </div>
        </div>
      </div>
    </section>;
};
export default KitBenefits;