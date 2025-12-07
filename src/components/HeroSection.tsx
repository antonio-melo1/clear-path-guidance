import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Stethoscope } from "lucide-react";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-soft-blue via-background to-background -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Trusted by thousands of men
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up animation-delay-100 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Navigate Your Prostate Health Journey{" "}
            <span className="text-gradient">With Confidence</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up animation-delay-200 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Finally—a clear path from symptoms to screening to treatment decisions. 
            Get expert guidance at every step, prepare for doctor visits, and make 
            informed choices without feeling overwhelmed or alone.
          </p>

          {/* Benefit Bullets */}
          <div className="animate-fade-up animation-delay-300 grid md:grid-cols-3 gap-6 mb-10 text-left">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-soft">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Know When to Act</h3>
                <p className="text-sm text-muted-foreground">
                  Instant symptom assessment tells you if it's urgent, normal aging, or something to monitor
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-soft">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Prepare for Doctors</h3>
                <p className="text-sm text-muted-foreground">
                  Generate personalized questions and talking points so you're never dismissed
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-soft">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Compare Treatments</h3>
                <p className="text-sm text-muted-foreground">
                  Evidence-based decision support shows what's right for YOU
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="animate-fade-up animation-delay-400 flex flex-col items-center gap-4">
            <Button variant="hero" size="xl" onClick={onOpenModal}>
              Get Your Free Symptom Assessment
            </Button>
            <p className="text-sm text-muted-foreground">
              Takes 3 minutes. Get instant guidance. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
