/**
 * Archived full-viewport services scroll-stack.
 * Not mounted on the homepage — kept for future reuse.
 * Active section: components/portfolio/services-two-column.tsx
 */
"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesCardsStack from "@/components/portfolio/services-cards-stack";

gsap.registerPlugin(ScrollTrigger);

const STACK_GAP = 28;
const SCALE_STEP = 0.03;
const ENTER_PHASE = 0.18;
const Z_TOP_BASE = 50;
const Z_BEHIND_BASE = 1;

function getPeekOffset() {
  const vh = window.innerHeight;
  const width = window.innerWidth;

  if (width < 640) {
    return Math.min(Math.max(20, vh * 0.07), 44);
  }
  if (width >= 1024) {
    return Math.min(Math.max(32, vh * 0.1), 80);
  }
  return Math.min(Math.max(24, vh * 0.09), 72);
}

function getCardEnterOffset(cardEl: HTMLElement, stage: HTMLElement) {
  const cardHeight = cardEl.offsetHeight || 300;
  const stageHeight = stage.clientHeight;
  return Math.max(cardHeight + 64, stageHeight * 0.5);
}

function measureCardTargets(stage: HTMLElement, cards: HTMLElement) {
  const peek = getPeekOffset();
  gsap.set(cards, { y: peek });

  const stageRect = stage.getBoundingClientRect();
  const cardsRect = cards.getBoundingClientRect();
  const stageCenter = stageRect.top + stageRect.height / 2;
  const cardsCenter = cardsRect.top + cardsRect.height / 2;

  return {
    peek,
    centerY: peek + (stageCenter - cardsCenter),
  };
}

function getScrollEnd(cardCount: number) {
  const vh = window.innerHeight;
  return vh * (0.85 + (cardCount - 1) * 0.42);
}

function configureStackRoom(
  container: HTMLElement,
  stack: HTMLElement,
  firstCard: HTMLElement,
  cardCount: number,
) {
  const cardHeight = firstCard.offsetHeight || 300;
  const peekRoom = STACK_GAP * Math.max(0, cardCount - 1);

  stack.style.minHeight = `${cardHeight}px`;
  container.style.paddingTop = `${peekRoom}px`;
  container.style.paddingBottom = "24px";
  container.style.overflow = "visible";
}

function hiddenCardState(hiddenY: number) {
  return {
    visibility: "hidden" as const,
    y: hiddenY,
    scale: 1,
    opacity: 1,
    zIndex: 0,
    pointerEvents: "none" as const,
  };
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const intro = introRef.current;
    const cards = cardsRef.current;

    if (!section || !stage || !intro || !cards) return;

    const cardEls = Array.from(
      cards.querySelectorAll<HTMLElement>(".services-card"),
    );
    const cardCount = cardEls.length;
    if (cardCount === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const setupInitialState = () => {
        const stackEl = cards.querySelector<HTMLElement>(".services-stack");
        if (stackEl) {
          configureStackRoom(cards, stackEl, cardEls[0], cardCount);
        }

        const enterOffset = getCardEnterOffset(cardEls[0], stage);
        const hiddenY = enterOffset * 2.5;

        gsap.set(intro, { opacity: 1, y: 0, pointerEvents: "auto" });
        gsap.set(cardEls[0], {
          visibility: "visible",
          opacity: 1,
          y: 0,
          scale: 1,
          zIndex: Z_TOP_BASE,
          pointerEvents: "auto",
        });
        gsap.set(cardEls.slice(1), hiddenCardState(hiddenY));

        return { ...measureCardTargets(stage, cards), enterOffset, hiddenY };
      };

      if (prefersReducedMotion) {
        const { centerY } = setupInitialState();
        gsap.set(cards, { y: centerY });
        gsap.set(intro, { opacity: 0, pointerEvents: "none" });
        cardEls.forEach((card, index) => {
          gsap.set(card, {
            visibility: "visible",
            opacity: 1,
            y: 0,
            scale: 1,
            zIndex: index + 1,
            pointerEvents: "auto",
          });
        });
        return;
      }

      const buildTimeline = () => {
        const { centerY, enterOffset, hiddenY } = setupInitialState();
        const stackSegment =
          cardCount > 1 ? (1 - ENTER_PHASE) / (cardCount - 1) : 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollEnd(cardCount)}`,
            scrub: 0.65,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          intro,
          {
            opacity: 0,
            y: -28,
            pointerEvents: "none",
            ease: "none",
            duration: ENTER_PHASE,
          },
          0,
        ).to(
          cards,
          { y: centerY, ease: "none", duration: ENTER_PHASE },
          0,
        );

        for (let i = 1; i < cardCount; i++) {
          const at = ENTER_PHASE + (i - 1) * stackSegment;

          // Only the incoming card is shown below — all others wait off-screen
          for (let k = i + 1; k < cardCount; k++) {
            tl.set(cardEls[k], hiddenCardState(hiddenY), at);
          }

          for (let j = 0; j < i; j++) {
            const depth = i - j;
            tl.to(
              cardEls[j],
              {
                visibility: "visible",
                y: -depth * STACK_GAP,
                scale: Math.max(0.84, 1 - depth * SCALE_STEP),
                opacity: 1,
                zIndex: Z_BEHIND_BASE + j,
                pointerEvents: "none",
                ease: "none",
                duration: stackSegment,
              },
              at,
            );
          }

          tl.set(
            cardEls[i],
            {
              visibility: "visible",
              y: enterOffset,
              scale: 1,
              opacity: 1,
              zIndex: Z_TOP_BASE + i,
              pointerEvents: "none",
            },
            at,
          ).to(
            cardEls[i],
            {
              y: 0,
              scale: 1,
              opacity: 1,
              zIndex: Z_TOP_BASE + i,
              pointerEvents: "auto",
              ease: "none",
              duration: stackSegment,
            },
            at,
          );
        }

        return tl;
      };

      buildTimeline();

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative border-b border-border/50 bg-muted/20 scroll-mt-24"
    >
      <div className="site-container w-full">
        <div
          ref={stageRef}
          className="services-stage relative h-dvh min-h-dvh overflow-x-clip overflow-y-visible flex flex-col pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12"
        >
          <div
            ref={introRef}
            className="services-intro flex flex-1 min-h-0 flex-col items-center justify-center text-center px-1 sm:px-0 will-change-transform,opacity"
          >
            <div className="max-w-2xl w-full">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
                IT services
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-balance">
                Everything you need to launch and grow online
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/60 max-w-xl mx-auto leading-relaxed">
                Scroll through our service tracks — each has its own process, tech
                stack, and portfolio examples.
              </p>
            </div>
            <Link
              href="/services"
              className="mt-5 sm:mt-6 md:mt-8 inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold hover:bg-accent/10 dark:hover:bg-white/10 transition-colors"
            >
              All services
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <ServicesCardsStack ref={cardsRef} />
        </div>
      </div>
    </section>
  );
}
