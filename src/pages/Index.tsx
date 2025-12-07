import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PainPointsSection } from "@/components/PainPointsSection";
import { OutcomesSection } from "@/components/OutcomesSection";
import { ProductSection } from "@/components/ProductSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";
import ProstatePahQuiz from "@/components/ProstatePahQuiz";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";

const Index = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation onOpenModal={() => setQuizOpen(true)} />
      
      <main>
        <HeroSection onOpenModal={() => setQuizOpen(true)} />
        <PainPointsSection />
        <OutcomesSection />
        <ProductSection />
        <PricingSection onOpenModal={() => setQuizOpen(true)} />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection onOpenModal={() => setQuizOpen(true)} />
      </main>

      <Footer />

      <ProstatePahQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <MobileStickyCTA onOpenModal={() => setQuizOpen(true)} />
      
      {/* Spacer for mobile sticky CTA */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default Index;
