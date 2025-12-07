import { AlertCircle, MessageCircleWarning, Scale } from "lucide-react";

export function PainPointsSection() {
  return (
    <section className="py-16 md:py-24 bg-warm-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            You Shouldn't Have To Navigate This Alone
          </h2>

          {/* Pain Points */}
          <div className="space-y-12">
            {/* Pain Point 1 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  "No one tells you about this stuff"
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  You've been noticing things—weaker flow, getting up at night, that feeling 
                  you haven't fully emptied—but is this normal aging or something serious? 
                  Google gives you cancer horror stories. Friends don't talk about it. 
                  You're left wondering if you're overreacting or ignoring something dangerous.
                </p>
              </div>
            </div>

            {/* Pain Point 2 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <MessageCircleWarning className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  "Doctors dismiss you or overwhelm you with jargon"
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you finally work up the nerve to see a doctor, they either brush it off 
                  ("you're too young") or hit you with PSA levels, Gleason scores, and treatment 
                  options you don't understand. You leave more confused than when you arrived, 
                  with no clear next steps.
                </p>
              </div>
            </div>

            {/* Pain Point 3 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <Scale className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  "Every decision feels like gambling with your life or your quality of life"
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you do get diagnosed, suddenly you're choosing between surgery (will I be 
                  incontinent? impotent?), radiation (what are the long-term effects?), or 
                  "watchful waiting" (am I just letting cancer grow?). There's conflicting 
                  advice everywhere and the consequences feel permanent.
                </p>
              </div>
            </div>
          </div>

          {/* Belief Deconstruction */}
          <div className="mt-16 p-8 rounded-2xl bg-card shadow-soft border border-border">
            <p className="text-foreground leading-relaxed text-center md:text-lg">
              <span className="font-semibold">Here's what nobody tells you:</span> The medical 
              system isn't designed to guide you—it's designed to treat you. Doctors have 
              12-minute appointments. They can't walk you through every decision. That's why 
              men feel lost, make rushed choices, or avoid seeking care altogether until it's 
              too late. <span className="text-accent font-semibold">You don't need more 
              information—you need a clear path forward.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
