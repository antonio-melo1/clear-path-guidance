import { Button } from "@/components/ui/button";
import { Check, Shield } from "lucide-react";

interface PricingSectionProps {
  onOpenModal: () => void;
}

export function PricingSection({ onOpenModal }: PricingSectionProps) {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Start your journey",
      features: [
        "Basic symptom assessment",
        "Screening guidance",
        "Limited doctor prep questions",
      ],
      cta: "Start Free Assessment",
      variant: "outline" as const,
      popular: false,
    },
    {
      name: "Premium",
      price: "$29",
      period: "/month",
      description: "Complete decision support",
      features: [
        "Everything in Free, plus:",
        "Full decision support platform",
        "Medical record analysis",
        "Treatment comparisons",
        "PSA tracking & alerts",
        "Community forum access",
      ],
      cta: "Start 14-Day Free Trial",
      variant: "cta" as const,
      popular: true,
    },
    {
      name: "Concierge",
      price: "$99",
      period: "/month",
      description: "White-glove support",
      features: [
        "Everything in Premium, plus:",
        "1:1 health coach calls (2/month)",
        "Second opinion coordination",
        "Insurance appeal assistance",
        "Priority support",
      ],
      cta: "Schedule Consultation",
      variant: "outline" as const,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Path Forward
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the plan that fits your needs. All plans include our core symptom 
              assessment and guidance tools.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-navy text-primary-foreground shadow-card ring-2 ring-accent scale-105"
                    : "bg-card border border-border shadow-soft"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl font-bold ${plan.popular ? "" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-accent" : "text-accent"}`} />
                      <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.variant}
                  className={`w-full ${plan.popular ? "" : ""}`}
                  onClick={onOpenModal}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Money-Back Guarantee */}
          <div className="flex items-center justify-center gap-3 p-6 rounded-xl bg-accent/10 border border-accent/20">
            <Shield className="w-8 h-8 text-accent" />
            <p className="text-foreground font-medium">
              <span className="font-bold">30-Day 100% Money-Back Guarantee</span>
              —If ProstatePath doesn't give you clarity and confidence, we'll refund every penny.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
