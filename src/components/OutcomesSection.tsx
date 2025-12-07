import { Clock, UserCheck, Heart } from "lucide-react";

export function OutcomesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-outcome">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Imagine Making Prostate Health Decisions
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-center text-accent mb-16">
            With Complete Clarity
          </p>

          {/* Outcomes */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Outcome 1 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                You catch problems early—before they become emergencies
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You're tracking subtle changes with objective data. When something shifts 
                from "normal aging" to "time to see a doctor," you know exactly when to act.
              </p>
            </div>

            {/* Outcome 2 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                You walk into appointments prepared and confident
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Instead of fumbling through vague descriptions, you have your symptom history 
                organized and personalized questions prepared.
              </p>
            </div>

            {/* Outcome 3 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                You make treatment decisions you can live with—literally
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                When facing big choices, you compare options with real data on side effects, 
                success rates, and quality-of-life impacts.
              </p>
            </div>
          </div>

          {/* New Paradigm */}
          <div className="text-center p-8 rounded-2xl bg-navy text-primary-foreground">
            <p className="text-lg md:text-xl font-medium mb-4">
              There's a new way to handle prostate health:
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-accent">
              Guided Decision Intelligence
            </h3>
            <p className="mt-6 text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Instead of stumbling through disconnected doctor visits and confusing test results, 
              you have a system—software that walks you through every decision point from symptoms 
              through treatment and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
