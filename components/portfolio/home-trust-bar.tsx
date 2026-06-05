"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeHero } from "@/lib/home-content";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeTrustBar() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const counters = section.querySelectorAll<HTMLElement>(
        "[data-stat-counter]",
      );
      if (!counters.length) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let hasRun = false;

      const runCounters = () => {
        if (hasRun) return;
        hasRun = true;

        counters.forEach((el, i) => {
          const end = Number(el.dataset.end);
          const suffix = el.dataset.suffix ?? "";
          if (Number.isNaN(end)) return;

          if (prefersReducedMotion) {
            el.textContent = `${end}${suffix}`;
            return;
          }

          const state = { val: 0 };
          gsap.to(state, {
            val: end,
            duration: 1.6,
            delay: i * 0.12,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(state.val)}${suffix}`;
            },
          });
        });
      };

      const trigger = ScrollTrigger.create({
        id: "home-trust-bar-counters",
        trigger: section,
        start: "top 85%",
        once: true,
        onEnter: runCounters,
      });

      if (trigger.progress > 0) {
        runCounters();
      }

      return () => {
        trigger.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="border-b border-border/50 bg-muted/40"
    >
      <div className="site-container py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <ul className="lg:col-span-7 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-3">
            {homeHero.valuePoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-foreground/75"
              >
                <CheckCircle2 className="size-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
          <div className="lg:col-span-5 grid grid-cols-3 gap-4">
            {homeHero.stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-right">
                <p
                  className="text-2xl md:text-3xl font-semibold tracking-tight text-primary tabular-nums"
                  data-stat-counter
                  data-end={stat.end}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
