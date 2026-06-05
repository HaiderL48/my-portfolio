"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/services-data";
import { servicesHubLanding } from "@/lib/services-hub-data";
import ServicesCardStackSection from "@/components/portfolio/services-card-stack-section";
import ServicesTechMarquee from "@/components/portfolio/services-tech-marquee";
import ServiceProcessRoadmap from "@/components/portfolio/service-process-roadmap";
import ServiceLandingFaq from "@/components/portfolio/service-landing-faq";
import "./services-hub-animated.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ServicesHubAnimated() {
  const hub = servicesHubLanding;
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const hero = heroRef.current;
      if (!root || !hero) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!prefersReducedMotion) {
        const orbs = hero.querySelectorAll<HTMLElement>(".services-hub-orb");
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            x: i % 2 === 0 ? 24 : -20,
            y: i === 1 ? -18 : 14,
            duration: 4 + i * 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        gsap.from(hero.querySelectorAll("[data-hero-item]"), {
          opacity: 0,
          y: 32,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.06,
        });
      }

      const revealSections = root.querySelectorAll<HTMLElement>(
        "[data-reveal-section]",
      );
      revealSections.forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>("[data-reveal-item]");
        const targets = items.length ? items : [section];

        if (prefersReducedMotion) return;

        gsap.from(targets, {
          opacity: 0,
          y: 36,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });
      });

      const processLine = root.querySelector<HTMLElement>(
        ".services-hub-process-line",
      );
      if (processLine && !prefersReducedMotion) {
        gsap.to(processLine, {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: processLine.parentElement,
            start: "top 75%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden"
      >
        <div
          className="services-hub-grid pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
        />
        <div
          className="services-hub-orb services-hub-orb--primary -top-24 -left-16 md:-left-8"
          aria-hidden
        />
        <div
          className="services-hub-orb services-hub-orb--muted top-1/3 -right-20 md:right-0"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/50 via-background/80 to-background"
          aria-hidden
        />

        <div className="relative site-container text-center">
          <Link
            href="/"
            data-hero-item
            className="inline-block text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            ← Back to home
          </Link>

          <div className="mt-10 lg:mt-12 mx-auto max-w-4xl space-y-8 flex flex-col items-center">
            <div
              data-hero-item
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur px-4 py-2 text-sm"
            >
              <Sparkles className="size-4 text-primary" />
              <span className="font-medium">{services.length} specialized tracks</span>
            </div>

            <div className="space-y-5">
              <p
                data-hero-item
                className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60"
              >
                Services
              </p>
              <h1
                data-hero-item
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
              >
                {hub.headline}
                <br />
                {hub.headlineLine2}
              </h1>
              <p
                data-hero-item
                className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto"
              >
                {hub.subheadline}
              </p>
            </div>

            <ul
              data-hero-item
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center"
            >
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

            <div
              data-hero-item
              className="flex flex-col sm:flex-row gap-4 pt-2 justify-center"
            >
              <a
                href="#explore-services"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
              >
                Explore services
                <ArrowRight className="size-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-8 py-4 text-sm font-semibold transition hover:bg-accent/10 dark:hover:bg-white/10"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServicesTechMarquee />

      {/* Scroll-stack showcase */}
      <ServicesCardStackSection
        id="explore-services"
        sectionClassName="relative border-b border-border/50 bg-muted/20 scroll-mt-28"
        header={
          <>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              Scroll to explore
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-balance">
              Six services, one scroll journey
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/60 leading-relaxed max-w-md">
              Each card stacks into view as you scroll — web, commerce, mobile,
              design, CMS, and cloud. Tap any card for the full landing page.
            </p>
            <p className="mt-6 hidden lg:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/45">
              <span className="inline-block h-8 w-px bg-border" aria-hidden />
              Keep scrolling
            </p>
          </>
        }
      />

      {/* Benefits */}
      <section
        data-reveal-section
        className="py-16 md:py-24 border-b border-border/50"
      >
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p
              data-reveal-item
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2"
            >
              Why me
            </p>
            <h2
              data-reveal-item
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            >
              A single studio for your digital roadmap
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hub.benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                data-reveal-item
                className="services-hub-benefit p-6 rounded-2xl border border-border bg-card"
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

      {/* Process */}
      <section
        data-reveal-section
        className="py-16 md:py-24 border-b border-border/50 bg-muted/30"
      >
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p
              data-reveal-item
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2"
            >
              Process
            </p>
            <h2
              data-reveal-item
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            >
              How we work together
            </h2>
            <p
              data-reveal-item
              className="mt-4 text-foreground/60 leading-relaxed"
            >
              The same clear phases apply across every service — tailored in
              scope, not in transparency.
            </p>
          </div>
          <div data-reveal-item className="relative">
            <div
              className="services-hub-process-line hidden md:block absolute top-[3.75rem] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40"
              aria-hidden
            />
            <ServiceProcessRoadmap steps={hub.process} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        data-reveal-section
        className="py-16 md:py-24 border-b border-border/50"
      >
        <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-10">
            <p
              data-reveal-item
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2"
            >
              FAQ
            </p>
            <h2 data-reveal-item className="text-3xl font-extrabold tracking-tight">
              Questions about working together
            </h2>
          </div>
          <div data-reveal-item>
            <ServiceLandingFaq faqs={hub.faqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        data-reveal-section
        className="py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden relative"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 20% 50%, white 0%, transparent 45%), radial-gradient(circle at 80% 30%, white 0%, transparent 40%)",
          }}
        />
        <div className="relative site-container text-center">
          <h2
            data-reveal-item
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance"
          >
            Not sure which service you need?
          </h2>
          <p
            data-reveal-item
            className="mt-4 text-primary-foreground/80 max-w-xl mx-auto leading-relaxed"
          >
            Describe your project and I will recommend the right mix of web,
            commerce, mobile, design, CMS, or cloud work.
          </p>
          <div
            data-reveal-item
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-foreground text-primary px-8 py-4 text-sm font-semibold shadow-lg transition hover:opacity-90"
            >
              Get in Touch
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/#work"
              className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground underline-offset-4 hover:underline"
            >
              View portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
