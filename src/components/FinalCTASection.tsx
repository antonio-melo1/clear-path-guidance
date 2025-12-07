import { Button } from "@/components/ui/button";
import { Lock, Smartphone, Shield } from "lucide-react";

interface FinalCTASectionProps {
  onOpenModal: () => void;
}

export function FinalCTASection({ onOpenModal }: FinalCTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-navy">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Stop Navigating Prostate Health Alone
          </h2>
          
          {/* Subheadline */}
          <p className="text-lg text-primary-foreground/80 mb-10">
            Join hundreds of men who've taken control of their prostate health 
            with confidence and clarity.
          </p>

          {/* CTA Button */}
          <Button 
            variant="cta" 
            size="xl" 
            className="mb-6"
            onClick={onOpenModal}
          >
            Start Your Free Assessment Now
          </Button>

          <p className="text-sm text-primary-foreground/60 mb-12">
            No credit card required. Get instant guidance in 3 minutes.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Lock className="w-5 h-5" />
              <span className="text-sm font-medium">HIPAA Compliant & Secure</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm font-medium">Works on Any Device</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
