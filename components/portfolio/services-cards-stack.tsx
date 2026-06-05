"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/services-data";
import "./services-cards-stack.css";

gsap.registerPlugin(ScrollTrigger);

const PIN_START_BASE = 80;
const PIN_START_STEP = 10;
const STACK_END = "bottom 550";
const GAP_AFTER_INTRO = 56;

type ServicesCardsStackProps = {
  introRef: RefObject<HTMLDivElement | null>;
};

export default function ServicesCardsStack({
  introRef,
}: ServicesCardsStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const root = rootRef.current;
    const intro = introRef.current;
    if (!wrapper || !root || !intro) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const introHeight = intro.offsetHeight;
      const stackLine = PIN_START_BASE + introHeight + GAP_AFTER_INTRO;

      ScrollTrigger.create({
        trigger: intro,
        start: `top ${PIN_START_BASE}`,
        endTrigger: wrapper,
        end: STACK_END,
        pin: intro,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      const cardWrappers = gsap.utils.toArray<HTMLElement>(
        ".services-card-wrapper",
        wrapper,
      );
      const cards = gsap.utils.toArray<HTMLElement>(".services-card", wrapper);
      const count = cards.length;

      cardWrappers.forEach((cardWrapper, i) => {
        const card = cards[i];
        if (!card) return;

        let scale = 1;
        let rotation = 0;
        if (i !== count - 1) {
          scale = 0.9 + 0.025 * i;
          rotation = -10;
        }

        gsap.to(card, {
          scale,
          rotationX: rotation,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: cardWrapper,
            start: `top ${stackLine + PIN_START_STEP * i}`,
            end: STACK_END,
            endTrigger: wrapper,
            scrub: true,
            pin: cardWrapper,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    const t = window.setTimeout(refresh, 200);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [introRef]);

  return (
    <div ref={rootRef}>
      <div ref={wrapperRef} className="services-stack-wrapper">
        <div className="services-stack-cards w-full">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.slug} className="services-card-wrapper">
                <div className="services-card">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block w-full rounded-2xl md:rounded-3xl border border-border bg-card shadow-lg overflow-hidden p-8 md:p-10 lg:p-12 hover:border-primary/25 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-8">
                      <div className="flex-1 min-w-0">
                        <div className="mb-5 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <Icon size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
                          {service.title}
                        </h3>
                        <p className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-3xl">
                          {service.summary}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-2 text-sm md:text-base font-semibold text-primary sm:pt-2">
                        Learn more
                        <ArrowRight className="size-4 md:size-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-medium text-foreground/45">
                      {service.tagline}
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
