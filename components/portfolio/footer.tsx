export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-background mt-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* CTA Section */}
          <div className="md:col-span-1 space-y-6 animate-slide-in-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                Let&apos;s work together
              </h2>
            </div>
            <p className="text-foreground/70 text-lg leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s
              create something exceptional together.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div
              className="space-y-4 animate-slide-in-right"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
                Email
              </h3>
              <a
                href="mailto:haidelimdi@gmail.com"
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
              >
                haidelimdi@gmail.com
              </a>
            </div>

            <div
              className="space-y-4 animate-slide-in-right"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
                Phone
              </h3>
              <a
                href="tel:+919879613386"
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
              >
                +91 9879613386
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-16 md:mt-24 pt-8 md:pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-foreground/50">
            © 2026 Hiader Portfolio. All rights reserved.
          </p>
          <div className="flex gap-6 md:gap-8">
            {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
