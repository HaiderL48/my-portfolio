"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  categories,
  portfolioItems,
} from "@/lib/portfolio-data";
import WorksHeroGridMarquee from "@/components/portfolio/works-hero-grid-marquee";
import WorksSteppedGridSection from "@/components/portfolio/works-stepped-grid-section";
import WorksProjectCard from "@/components/portfolio/works-project-card";
import "./works-page.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function SpotlightCard({
  project,
}: {
  project: (typeof portfolioItems)[number];
}) {
  return (
    <WorksProjectCard
      project={project}
      className="works-spotlight-card rounded-2xl border border-border bg-card"
      showFeaturedLabel
    />
  );
}

export default function WorksPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const featuredProjects = useMemo(
    () => portfolioItems.filter((p) => p.featured),
    [],
  );
  const disciplineCount = useMemo(
    () => new Set(portfolioItems.map((p) => p.discipline)).size,
    [],
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      const hero = heroRef.current;
      if (!root || !hero) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!prefersReducedMotion) {
        const orbs = hero.querySelectorAll<HTMLElement>(".works-hero-orb");
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            x: i % 2 === 0 ? 18 : -14,
            y: i === 0 ? 12 : -10,
            duration: 4 + i * 0.6,
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
          delay: 0.05,
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
          y: 32,
          duration: 0.75,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 84%",
            once: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      <section
        ref={heroRef}
        className="works-hero relative border-b border-border/50 bg-background"
      >
        <WorksHeroGridMarquee />
        <div className="works-hero-orb works-hero-orb--primary" aria-hidden />
        <div className="works-hero-orb works-hero-orb--muted" aria-hidden />

        <div className="relative z-10 site-container flex min-h-[inherit] flex-col items-center justify-center py-28 md:py-36 text-center">
          <div className="max-w-4xl mx-auto">
            <p
              data-hero-item
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-4"
            >
              Portfolio
            </p>
            <h1
              data-hero-item
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance leading-[1.02]"
            >
              Work that ships
              <span className="block text-foreground/45">and scales</span>
            </h1>
            <p
              data-hero-item
              className="mt-5 mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-foreground/70"
            >
              Apps, storefronts, dashboards, and design systems — each with a
              full case study behind the preview.
            </p>

            <div
              data-hero-item
              className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10"
            >
              <div>
                <p className="text-3xl md:text-4xl font-extrabold tabular-nums">
                  {portfolioItems.length}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50 mt-1">
                  Projects
                </p>
              </div>
              <div className="works-stat-divider hidden sm:block" />
              <div>
                <p className="text-3xl md:text-4xl font-extrabold tabular-nums">
                  {disciplineCount}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50 mt-1">
                  Disciplines
                </p>
              </div>
              <div className="works-stat-divider hidden sm:block" />
              <div>
                <p className="text-3xl md:text-4xl font-extrabold tabular-nums">
                  {categories.length}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50 mt-1">
                  Categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-reveal-section
        className="border-b border-border/50 bg-muted/25 py-12 md:py-16"
      >
        <div className="site-container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
            <div data-reveal-item>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-foreground/50 mb-2">
                Spotlight
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Featured case studies
              </h2>
            </div>
            <p
              data-reveal-item
              className="text-sm text-foreground/60 max-w-sm leading-relaxed"
            >
              Swipe through standout launches — mobile, commerce, and full-stack
              builds with measurable outcomes.
            </p>
          </div>

          <div className="works-spotlight-track">
            {featuredProjects.map((project) => (
              <SpotlightCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <WorksSteppedGridSection />

      <section
        data-reveal-section
        className="py-16 md:py-20 bg-muted/30"
      >
        <div className="site-container text-center">
          <div data-reveal-item>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Want results like these?
            </h2>
            <p className="mt-3 text-foreground/60 max-w-lg mx-auto leading-relaxed">
              Tell me about your product — I&apos;ll map the right stack and
              timeline.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition"
            >
              Start your project
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
