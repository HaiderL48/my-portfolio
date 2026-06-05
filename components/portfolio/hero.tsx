"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { homeHero } from "@/lib/home-content";
import HeroBackground from "@/components/portfolio/hero-background";
import HeroRotatingText from "@/components/portfolio/hero-rotating-text";
import HeroTechMarquee from "@/components/portfolio/hero-tech-marquee";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex flex-col justify-center border-b border-border/50 overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20"
    >
      <HeroBackground />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <p className="hero-fade text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-foreground/50">
          {homeHero.badge}
        </p>

        <div className="hero-fade mt-5 space-y-4 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.15] tracking-tight text-balance">
            {homeHero.headline}
            <span className="block text-foreground/65 font-normal text-xl sm:text-2xl md:text-[1.75rem] mt-2">
              {homeHero.headlineSuffix}
            </span>
          </h1>

          <HeroRotatingText
            phrases={homeHero.rotatingServices}
            centered
          />

          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed max-w-xl mx-auto">
            {homeHero.subheadline}
          </p>
        </div>

        <div className="hero-fade mt-8 flex flex-col sm:flex-row gap-3 justify-center w-full">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-md transition hover:bg-primary/90"
          >
            Start a project
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-medium text-foreground/75 transition hover:bg-muted/80"
          >
            View work
          </Link>
        </div>

        <HeroTechMarquee />
      </div>

      <a
        href="#services"
        className="hero-fade absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0.5 text-foreground/40 hover:text-primary transition-colors"
        aria-label="Scroll to services"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest">
          Explore
        </span>
        <ChevronDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
