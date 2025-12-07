import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "Is this a replacement for seeing a doctor?",
      answer: "No. ProstatePath is a decision support tool that helps you make the most of your doctor visits. We help you know WHEN to see a doctor, WHAT to ask, and HOW to evaluate recommendations. We never diagnose or prescribe—we guide and educate.",
    },
    {
      question: "What if I'm not tech-savvy?",
      answer: "ProstatePath is designed to be simple and intuitive. If you can use email, you can use our platform. Plus, our Concierge tier includes 1:1 coaching calls where we walk you through everything.",
    },
    {
      question: "How do I know your information is accurate?",
      answer: "Our decision engine is built on peer-reviewed medical literature, clinical practice guidelines from organizations like the American Urological Association, and real-world patient outcomes data. Our medical advisory board includes practicing urologists and oncologists who review all content.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. Cancel anytime with one click. No contracts, no hassles. Plus, we offer a 30-day money-back guarantee.",
    },
    {
      question: "Will this work if I've already been diagnosed?",
      answer: "Absolutely. Many of our Premium and Concierge members are navigating treatment decisions or managing active surveillance. The decision support is valuable at every stage.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about ProstatePath
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left text-foreground font-semibold hover:text-accent hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
