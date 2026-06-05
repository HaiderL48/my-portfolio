import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/services-data";
import { servicesHubLanding } from "@/lib/services-hub-data";
import ServiceCardsGrid from "@/components/portfolio/service-cards-grid";
import ServiceProcessRoadmap from "@/components/portfolio/service-process-roadmap";
import ServiceLandingFaq from "@/components/portfolio/service-landing-faq";

export default function ServicesHubLanding() {
  const hub = servicesHubLanding;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border/50 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/60 via-background to-background"
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <Link
            href="/"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            ← Back to home
          </Link>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-8">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60">
                Services
              </p>

              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance">
                  {hub.headline}
                </h1>
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl">
                  {hub.subheadline}
                </p>
              </div>

              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                {hub.heroHighlights.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#all-services"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                >
                  Browse all services
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-8 py-4 text-sm font-semibold transition hover:bg-accent/10 dark:hover:bg-white/10"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground/60 mb-4">
                  Services offered
                </p>
                <ul className="space-y-3">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-accent/10 dark:hover:bg-white/10"
                        >
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon size={16} strokeWidth={1.75} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">
                              {service.title}
                            </span>
                            <span className="block text-xs text-foreground/50 line-clamp-1">
                              {service.tagline}
                            </span>
                          </span>
                          <ArrowRight className="size-4 shrink-0 text-foreground/40 group-hover:text-primary transition-colors" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why work together */}
      <section className="py-16 md:py-20 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              Why me
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              A single studio for your digital roadmap
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hub.benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="p-6 rounded-2xl border border-border bg-card hover:bg-accent/10 dark:hover:bg-white/10 transition-colors duration-300"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary text-sm font-bold mb-4">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All services grid */}
      <section
        id="all-services"
        className="py-16 md:py-24 border-b border-border/50 scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-12 max-w-2xl">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              All services
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Choose your path — each with its own landing page
            </h2>
            <p className="mt-4 text-foreground/60 leading-relaxed">
              Open any card for full details: deliverables, process roadmap,
              FAQs, and related portfolio projects.
            </p>
          </div>
          <ServiceCardsGrid items={services} />
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How we work together
            </h2>
            <p className="mt-4 text-foreground/60 leading-relaxed">
              The same clear phases apply across every service — tailored in
              scope, not in transparency.
            </p>
          </div>
          <ServiceProcessRoadmap steps={hub.process} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-10">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              FAQ
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Questions about working together
            </h2>
          </div>
          <ServiceLandingFaq faqs={hub.faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            Not sure which service you need?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
            Describe your project and I will recommend the right mix of web,
            commerce, mobile, design, CMS, or cloud work.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-foreground text-primary px-8 py-4 text-sm font-semibold shadow-lg transition hover:opacity-90"
            >
              Get in Touch
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/#work"
              className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground underline-offset-4 hover:underline"
            >
              View portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
