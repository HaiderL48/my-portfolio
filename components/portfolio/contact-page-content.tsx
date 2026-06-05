import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { contactContent } from "@/lib/site-data";
import ContactForm from "@/components/portfolio/contact-form";

export default function ContactPageContent() {
  return (
    <>
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 border-b border-border/50">
        <div className="site-container">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {contactContent.headline}
          </h1>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl leading-relaxed">
            {contactContent.subheadline}
          </p>
          <p className="mt-2 text-sm text-primary font-medium">
            {contactContent.responseSla}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
              <h2 className="font-semibold">Direct contact</h2>
              <a
                href={`mailto:${contactContent.email}`}
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
              >
                <Mail className="size-4 text-primary" />
                {contactContent.email}
              </a>
              <a
                href="tel:+919879613386"
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
              >
                <Phone className="size-4 text-primary" />
                +91 9879613386
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold mb-4">Connect</h2>
              <div className="flex flex-wrap gap-3">
                {contactContent.social.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-full border border-border bg-background font-medium hover:bg-accent/10 transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-xs text-foreground/50">
                Update social URLs in{" "}
                <code className="text-foreground/70">lib/site-data.ts</code>
              </p>
            </div>

            <Link
              href="/services"
              className="text-sm font-medium text-primary hover:underline"
            >
              Not sure which service fits? Browse services →
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
