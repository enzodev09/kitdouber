import KitHero from "@/components/KitHero";
import KitProducts from "@/components/KitProducts";
import KitBenefits from "@/components/KitBenefits";
import KitCTA from "@/components/KitCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-kit-black">
      <KitHero />
      <KitProducts />
      <KitBenefits />
      <KitCTA />
    </div>
  );
};

export default Index;
