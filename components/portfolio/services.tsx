"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServicesCardsStack from "@/components/portfolio/services-cards-stack";

export default function Services() {
  const introRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="services"
      className="border-b border-border/50 bg-muted/20 scroll-mt-24 pt-20 md:pt-28 pb-[200px]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full">
        <div
          ref={introRef}
          className="services-intro relative z-50 flex flex-col items-center text-center py-6 md:py-8"
        >
          <div className="max-w-2xl w-full">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              IT services
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-balance">
              Everything you need to launch and grow online
            </h2>
            <p className="mt-4 text-base text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Scroll through our service tracks — each has its own process, tech
              stack, and portfolio examples.
            </p>
          </div>
          <Link
            href="/services"
            className="mt-6 md:mt-8 inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent/10 dark:hover:bg-white/10 transition-colors"
          >
            All services
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ServicesCardsStack introRef={introRef} />
      </div>
    </section>
  );
}
