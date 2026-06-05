"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServicesCardStackSection from "@/components/portfolio/services-card-stack-section";

export default function ServicesTwoColumn() {
  return (
    <ServicesCardStackSection
      id="services"
      sectionClassName="relative border-b border-border/50 bg-background scroll-mt-24"
      header={
        <>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            Browse services
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-extrabold tracking-tight leading-tight text-balance">
            Pick the right track for your project
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base 2xl:text-lg text-foreground/60 leading-relaxed max-w-md 2xl:max-w-lg">
            Each service has its own process, tech stack, and portfolio
            examples — scroll the stack{" "}
            <span className="lg:hidden">below</span>
            <span className="hidden lg:inline">on the right</span> to explore
            each track.
          </p>
          <Link
            href="/services"
            className="mt-6 sm:mt-8 inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold hover:bg-accent/10 dark:hover:bg-white/10 transition-colors"
          >
            All services
            <ArrowRight className="size-4" />
          </Link>
        </>
      }
    />
  );
}
