import { 
  ClipboardCheck, 
  MessageSquareText, 
  BarChart3, 
  FileText, 
  Activity, 
  Shield, 
  Users, 
  FlaskConical,
  CheckCircle2
} from "lucide-react";

export function ProductSection() {
  const features = [
    { icon: ClipboardCheck, text: "Intelligent symptom assessment and risk stratification" },
    { icon: MessageSquareText, text: '"What questions to ask your doctor" generator for appointments' },
    { icon: BarChart3, text: "Treatment comparison engine (surgery vs. radiation vs. active surveillance)" },
    { icon: FileText, text: "Medical record analyzer—upload records, get plain-English translation" },
    { icon: Activity, text: "PSA tracker with trend analysis and alerts" },
    { icon: Shield, text: "Insurance navigation templates and pre-approval assistance" },
    { icon: Users, text: "Access to community forum organized by decision point" },
    { icon: FlaskConical, text: "Clinical trial matching based on your diagnosis and location" },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Product Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              Introducing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              ProstatePath
            </h2>
            <p className="text-xl text-accent font-medium mb-6">
              Your personal guide through every prostate health decision
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ProstatePath is a software platform that guides men through every decision point 
              in prostate health. From "should I get screened?" to "which treatment option is 
              right for me?" our decision engine synthesizes medical literature, clinical guidelines, 
              and patient outcomes data to give you personalized recommendations.
            </p>
          </div>

          {/* How It Works */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
                1
              </div>
              <div className="pl-8 pt-2">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Answer questions about your symptoms
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our intelligent assessment asks the right questions to understand your specific 
                  situation—symptoms, family history, medications, priorities.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
                2
              </div>
              <div className="pl-8 pt-2">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Get personalized guidance and next steps
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Receive clear recommendations: "See a doctor within 2 weeks" or "This is likely 
                  normal aging—monitor for 3 months." Plus questions to ask your doctor.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
                3
              </div>
              <div className="pl-8 pt-2">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Make informed decisions with confidence
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Compare options side-by-side with real data on effectiveness, side effects, 
                  and recovery. Understand what each path really means for YOUR life.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-foreground mb-10">
              What's Included
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-soft border border-border/50"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Founder Message */}
          <div className="p-8 rounded-2xl bg-soft-blue border border-border">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-navy flex items-center justify-center text-primary-foreground text-2xl font-bold">
                JD
              </div>
              <div>
                <blockquote className="text-foreground leading-relaxed mb-4 italic">
                  "After watching my father navigate prostate cancer alone—confused by medical 
                  jargon, overwhelmed by choices, dismissed by doctors who didn't have time to 
                  explain—I knew there had to be a better way. ProstatePath is what I wish he'd 
                  had: clear guidance, evidence-based recommendations, and the tools to advocate 
                  for himself. No man should have to face this alone."
                </blockquote>
                <p className="text-muted-foreground font-medium">
                  — John Davis, ProstatePath Creator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
