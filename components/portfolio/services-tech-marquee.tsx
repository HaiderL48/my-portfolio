"use client";

import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  techMarqueeItems,
  techMarqueeRowOne,
  techMarqueeRowTwo,
  type MarqueeItem,
} from "@/lib/tech-marquee-items";
import { getScrollTop, subscribeScroll } from "@/lib/lenis-scroll";

const PILL_ESTIMATE_PX = 132;
const GAP_PX = 16;
const AUTOPLAY_SPEED = 1;
const DIRECTION_BLEND_DURATION = 0.35;

type ScrollDirection = 1 | -1;

function buildSeamlessLoopItems(
  items: MarqueeItem[],
  containerWidth: number,
): MarqueeItem[] {
  if (items.length === 0) return [];

  const singlePassWidth =
    items.length * PILL_ESTIMATE_PX + Math.max(0, items.length - 1) * GAP_PX;
  const passesNeeded = Math.max(
    2,
    Math.ceil((containerWidth * 1.15) / Math.max(singlePassWidth, 1)),
  );

  const segment: MarqueeItem[] = [];
  for (let i = 0; i < passesNeeded; i += 1) {
    segment.push(...items);
  }

  return [...segment, ...segment];
}

function MarqueePill({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) {
  return (
    <div
      className="services-tech-marquee-pill flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-card/90 backdrop-blur px-4 py-2.5 shadow-sm"
      title={label}
    >
      <span className="flex size-6 md:size-7 items-center justify-center text-lg md:text-xl [&>svg]:size-full">
        {icon}
      </span>
      <span className="text-xs md:text-sm font-semibold text-foreground/80 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  baseDirection = "left",
  duration = 72,
  scrollDirection = 1,
  staticLayout = false,
}: {
  items: MarqueeItem[];
  baseDirection?: "left" | "right";
  duration?: number;
  scrollDirection?: ScrollDirection;
  staticLayout?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollDirectionRef = useRef<ScrollDirection>(scrollDirection);
  const [loopItems, setLoopItems] = useState<MarqueeItem[]>(() =>
    buildSeamlessLoopItems(items, 1280),
  );

  useLayoutEffect(() => {
    if (staticLayout) {
      setLoopItems(items);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const updateLoopItems = () => {
      setLoopItems(buildSeamlessLoopItems(items, container.offsetWidth));
    };

    updateLoopItems();

    const observer = new ResizeObserver(updateLoopItems);
    observer.observe(container);
    return () => observer.disconnect();
  }, [items, staticLayout]);

  useLayoutEffect(() => {
    if (staticLayout) return;

    const track = trackRef.current;
    if (!track || loopItems.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const startMarquee = () => {
      const segmentWidth = track.scrollWidth / 2;
      if (segmentWidth <= 0) return;

      gsap.killTweensOf(track);

      gsap.set(track, {
        x: baseDirection === "left" ? 0 : -segmentWidth,
      });

      tweenRef.current = gsap.to(track, {
        x: baseDirection === "left" ? -segmentWidth : 0,
        ease: "none",
        duration,
        repeat: -1,
      });

      tweenRef.current.timeScale(
        scrollDirectionRef.current * AUTOPLAY_SPEED,
      );
    };

    startMarquee();

    const onResize = () => startMarquee();
    window.addEventListener("resize", onResize);

    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
      gsap.killTweensOf(track);
      window.removeEventListener("resize", onResize);
    };
  }, [baseDirection, duration, loopItems, staticLayout]);

  useEffect(() => {
    scrollDirectionRef.current = scrollDirection;

    if (staticLayout) return;

    const tween = tweenRef.current;
    if (!tween) return;

    gsap.to(tween, {
      timeScale: scrollDirection * AUTOPLAY_SPEED,
      duration: DIRECTION_BLEND_DURATION,
      ease: "power2.out",
      overwrite: true,
    });
  }, [scrollDirection, staticLayout]);

  if (staticLayout) {
    return (
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-4">
        {loopItems.map((item) => (
          <MarqueePill key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="marquee-container overflow-hidden py-1">
      <div
        className="marquee-track flex items-center gap-3 md:gap-4 px-2"
        ref={trackRef}
      >
        {loopItems.map((item, index) => (
          <MarqueePill
            key={`${item.label}-${index}`}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default function ServicesTechMarquee() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(1);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    lastScrollRef.current = getScrollTop();

    return subscribeScroll(() => {
      const current = getScrollTop();
      const delta = current - lastScrollRef.current;

      if (Math.abs(delta) >= 1) {
        setScrollDirection(delta > 0 ? 1 : -1);
      }

      lastScrollRef.current = current;
    });
  }, []);

  return (
    <section
      aria-label="Technologies and tools"
      className="relative border-b border-border/50 bg-muted/25 py-10 md:py-12 overflow-hidden"
    >
      <div className="site-container mb-6 md:mb-8">
        <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-foreground/50">
          Technologies & tools I work with
        </p>
      </div>

      {reducedMotion ? (
        <MarqueeRow items={techMarqueeItems} staticLayout />
      ) : (
        <div className="space-y-3 md:space-y-4">
          <MarqueeRow
            items={techMarqueeRowOne}
            baseDirection="left"
            duration={72}
            scrollDirection={scrollDirection}
          />
          <MarqueeRow
            items={techMarqueeRowTwo}
            baseDirection="right"
            duration={80}
            scrollDirection={scrollDirection}
          />
        </div>
      )}

      <div className="site-container mt-6 md:mt-8">
        <p className="text-center text-xs text-foreground/45 max-w-lg mx-auto leading-relaxed">
          From design files to production deploys — the same stack powers web,
          mobile, commerce, and cloud projects.
        </p>
      </div>
    </section>
  );
}
