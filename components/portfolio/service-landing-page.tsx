import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  getProjectsForService,
  services,
  type ServiceDefinition,
} from "@/lib/services-data";
import { getServiceLandingContent } from "@/lib/service-landing-data";
import ServiceWorkGrid from "@/components/portfolio/service-work-grid";
import ServiceLandingFaq from "@/components/portfolio/service-landing-faq";
import ServiceCardsGrid from "@/components/portfolio/service-cards-grid";
import ServiceProcessRoadmap from "@/components/portfolio/service-process-roadmap";
import { TechBadge, TechBadgeList } from "@/components/portfolio/tech-badge";

interface ServiceLandingPageProps {
  service: ServiceDefinition;
}

export default function ServiceLandingPage({ service }: ServiceLandingPageProps) {
  const landing = getServiceLandingContent(service.slug);
  const projects = getProjectsForService(service);
  const Icon = service.icon;
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border/50 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/60 via-background to-background"
          aria-hidden
        />
        <div className="relative site-container">
          <Link
            href="/services"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            ← All services
          </Link>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-2 text-sm">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="font-medium">{service.title}</span>
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance">
                  {landing.headline}
                </h1>
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl">
                  {landing.subheadline}
                </p>
              </div>

              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                {landing.heroHighlights.map((item) => (
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
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                >
                  Start your project
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-8 py-4 text-sm font-semibold transition hover:bg-accent/10 dark:hover:bg-white/10"
                >
                  See related work
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  Free consultation
                </p>
                <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                  {service.summary}
                </p>
                <ul className="space-y-2.5">
                  {service.technologies.slice(0, 5).map((tech) => (
                    <li key={tech}>
                      <TechBadge
                        label={tech}
                        size="sm"
                        variant="plain"
                        className="rounded-none"
                      />
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Book a call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 border-b border-border/50">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              Why work with me
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {service.tagline}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {landing.benefits.map((benefit, index) => (
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

      {/* Overview + deliverables */}
      <section className="py-16 md:py-24 border-b border-border/50 bg-muted/30">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight">
                What this service covers
              </h2>
              {service.overview.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm md:text-base text-foreground/70 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Deliverables include</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.offerings.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 p-4 rounded-xl border border-border bg-card text-sm text-foreground/70 leading-relaxed"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 border-b border-border/50">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How we work together
            </h2>
          </div>
          <ServiceProcessRoadmap steps={service.process} />
          <TechBadgeList
            items={service.technologies}
            size="sm"
            className="mt-10 justify-center"
          />
        </div>
      </section>

      {/* Portfolio */}
      <section id="work" className="py-16 md:py-24 border-b border-border/50 scroll-mt-28">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
                Portfolio
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {service.title} projects
              </h2>
              <p className="mt-2 text-foreground/60 max-w-lg">
                Real work aligned with this service — click through to see more
                on the main portfolio.
              </p>
            </div>
            <Link
              href="/#work"
              className="text-sm font-semibold text-primary hover:underline shrink-0"
            >
              Full portfolio →
            </Link>
          </div>
            <ServiceWorkGrid projects={projects} />
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
              Common questions
            </h2>
          </div>
          <ServiceLandingFaq faqs={landing.faqs} />
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 md:py-24 border-b border-border/50">
        <div className="site-container">
          <div className="mb-10">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              More services
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Explore other services
            </h2>
          </div>
          <ServiceCardsGrid items={otherServices} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="site-container text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            Let&apos;s build your {service.title.toLowerCase()} project
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
            Tell me about your goals, timeline, and budget. I&apos;ll respond with
            a clear plan and honest next steps.
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
              href="/services"
              className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground underline-offset-4 hover:underline"
            >
              Compare all services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
