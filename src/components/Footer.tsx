import { Twitter, Facebook, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About Us", href: "#" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-lg">ProstatePath</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-md">
              Your personal guide through prostate health decisions. From symptoms 
              to screening to treatment, we help men navigate their health journey 
              with confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:support@prostatepath.com"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@prostatepath.com
              </a>
              <a
                href="tel:+15557767828"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                (555) PROSTATE
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} ProstatePath. All rights reserved. 
            <span className="block md:inline md:ml-2">
              Not medical advice. Consult a healthcare professional.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
