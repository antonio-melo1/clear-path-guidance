import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I was ignoring symptoms for 3 years because I didn't know if they were serious. ProstatePath's assessment told me to see a doctor within 2 weeks. Turned out I had early-stage cancer—caught it in time because I finally had guidance.",
      name: "Michael",
      age: 52,
      initials: "M",
    },
    {
      quote: "My doctor wanted me to have surgery immediately. ProstatePath helped me understand I was a candidate for active surveillance. Two years later, still cancer-free and didn't need the surgery. It gave me the confidence to ask the right questions.",
      name: "David",
      age: 58,
      initials: "D",
    },
    {
      quote: "The 'questions to ask your doctor' feature changed everything. Instead of nodding along confused, I came prepared. My doctor actually seemed impressed and took more time to explain things. Finally felt like a partner in my care.",
      name: "James",
      age: 47,
      initials: "J",
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-warm-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Men Who Took Control of Their Prostate Health
            </h2>
            <p className="text-muted-foreground">
              Real stories from real users who found clarity with ProstatePath
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-soft border border-border relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">Age {testimonial.age}</p>
                  </div>
                </div>

                <blockquote className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
