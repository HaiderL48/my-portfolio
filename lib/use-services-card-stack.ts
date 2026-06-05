"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STACK_GAP_DESKTOP = 28;
const SCALE_STEP = 0.03;
const ENTER_PHASE = 0.18;
const Z_TOP_BASE = 50;
const Z_BEHIND_BASE = 1;
const LG_BREAKPOINT = 1024;

function getStackGap() {
  const width = window.innerWidth;
  if (width < 640) return 16;
  if (width < LG_BREAKPOINT) return 22;
  return STACK_GAP_DESKTOP;
}

function getPeekOffset() {
  const vh = window.innerHeight;
  const width = window.innerWidth;

  if (width < 640) {
    return Math.min(Math.max(20, vh * 0.07), 44);
  }
  if (width >= LG_BREAKPOINT) {
    return Math.min(Math.max(28, vh * 0.08), 64);
  }
  return Math.min(Math.max(24, vh * 0.09), 72);
}

function getCardEnterOffset(cardEl: HTMLElement, stage: HTMLElement) {
  const cardHeight = cardEl.offsetHeight || 300;
  const stageHeight = stage.clientHeight || cardHeight;
  const width = window.innerWidth;
  const minOffset = width < 640 ? cardHeight + 36 : cardHeight + 64;
  const stageFactor = width < LG_BREAKPOINT ? 0.42 : 0.5;
  return Math.max(minOffset, stageHeight * stageFactor);
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
  const width = window.innerWidth;
  const base = width < LG_BREAKPOINT ? 0.92 : 0.85;
  const perCard = width < 640 ? 0.36 : width < LG_BREAKPOINT ? 0.4 : 0.42;
  return vh * (base + (cardCount - 1) * perCard);
}

function configureStackRoom(
  container: HTMLElement,
  stack: HTMLElement,
  firstCard: HTMLElement,
  cardCount: number,
) {
  const cardHeight = firstCard.offsetHeight || 300;
  const stackGap = getStackGap();
  const peekRoom = stackGap * Math.max(0, cardCount - 1);

  stack.style.minHeight = `${cardHeight}px`;
  container.style.paddingTop = `${peekRoom}px`;
  container.style.paddingBottom =
    window.innerWidth < LG_BREAKPOINT ? "16px" : "24px";
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

export function useServicesCardStack(
  sectionRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  stackStageRef: RefObject<HTMLElement | null>,
  cardsRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const stackStage = stackStageRef.current;
    const cards = cardsRef.current;

    if (!section || !stage || !stackStage || !cards) return;

    const cardEls = Array.from(
      cards.querySelectorAll<HTMLElement>(".services-card"),
    );
    const cardCount = cardEls.length;
    if (cardCount === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lgQuery = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);

    const ctx = gsap.context(() => {
      const setupInitialState = () => {
        const stackEl = cards.querySelector<HTMLElement>(".services-stack");
        stackEl?.classList.remove("services-stack--static");
        stackStage.style.paddingTop = "";
        stackStage.style.paddingBottom = "";

        if (stackEl) {
          configureStackRoom(stackStage, stackEl, cardEls[0], cardCount);
        }

        const enterOffset = getCardEnterOffset(cardEls[0], stackStage);
        const hiddenY = enterOffset * 2.5;

        gsap.set(cardEls[0], {
          visibility: "visible",
          opacity: 1,
          y: 0,
          scale: 1,
          zIndex: Z_TOP_BASE,
          pointerEvents: "auto",
        });
        gsap.set(cardEls.slice(1), hiddenCardState(hiddenY));

        return { ...measureCardTargets(stackStage, cards), enterOffset, hiddenY };
      };

      const showStaticStack = () => {
        const stackEl = cards.querySelector<HTMLElement>(".services-stack");
        stackEl?.classList.add("services-stack--static");
        stackStage.style.paddingTop = "0";
        stackStage.style.paddingBottom = "0";
        if (stackEl) stackEl.style.minHeight = "0";

        gsap.set(cards, { clearProps: "transform" });
        cardEls.forEach((card, index) => {
          gsap.set(card, {
            visibility: "visible",
            opacity: 1,
            y: 0,
            scale: 1,
            zIndex: index + 1,
            pointerEvents: "auto",
            clearProps: "transform",
          });
        });
      };

      const buildTimeline = () => {
        const { centerY, enterOffset, hiddenY } = setupInitialState();
        const stackGap = getStackGap();
        const stackSegment =
          cardCount > 1 ? (1 - ENTER_PHASE) / (cardCount - 1) : 0;
        const scrub = window.innerWidth < LG_BREAKPOINT ? 0.85 : 0.65;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollEnd(cardCount)}`,
            scrub,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(cards, { y: centerY, ease: "none", duration: ENTER_PHASE }, 0);

        for (let i = 1; i < cardCount; i++) {
          const at = ENTER_PHASE + (i - 1) * stackSegment;

          for (let k = i + 1; k < cardCount; k++) {
            tl.set(cardEls[k], hiddenCardState(hiddenY), at);
          }

          for (let j = 0; j < i; j++) {
            const depth = i - j;
            tl.to(
              cardEls[j],
              {
                visibility: "visible",
                y: -depth * stackGap,
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

      let timeline: gsap.core.Timeline | null = null;

      const enableAnimation = () => {
        if (prefersReducedMotion) {
          showStaticStack();
          return;
        }
        timeline = buildTimeline();
      };

      const disableAnimation = () => {
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        timeline = null;
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === section) st.kill();
        });
        cards.querySelector(".services-stack")?.classList.remove(
          "services-stack--static",
        );
        gsap.set([cards, ...cardEls], { clearProps: "all" });
      };

      const syncAnimation = () => {
        disableAnimation();
        enableAnimation();
        ScrollTrigger.refresh();
      };

      enableAnimation();
      requestAnimationFrame(() => ScrollTrigger.refresh());

      const onResize = () => syncAnimation();
      const onBreakpointChange = () => syncAnimation();

      window.addEventListener("resize", onResize);
      lgQuery.addEventListener("change", onBreakpointChange);

      return () => {
        window.removeEventListener("resize", onResize);
        lgQuery.removeEventListener("change", onBreakpointChange);
        disableAnimation();
      };
    }, section);

    return () => ctx.revert();
  }, [sectionRef, stageRef, stackStageRef, cardsRef]);
}
