"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const CELL_PX = 46;
const COLS = 28;
const ROWS = 14;
const PANEL_WIDTH = COLS * CELL_PX;
const PANEL_HEIGHT = ROWS * CELL_PX;
const MARQUEE_DURATION = 42;

function GridPanel({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="works-grid-marquee-panel shrink-0"
      style={{ width: PANEL_WIDTH, height: PANEL_HEIGHT }}
      aria-hidden={duplicate}
    />
  );
}

export default function WorksHeroGridMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.set(track, { x: 0 });

    tweenRef.current = gsap.to(track, {
      x: -PANEL_WIDTH,
      ease: "none",
      duration: MARQUEE_DURATION,
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
      gsap.killTweensOf(track);
    };
  }, []);

  return (
    <div className="works-grid-marquee" aria-hidden>
      <div className="works-grid-marquee-track flex w-max" ref={trackRef}>
        <GridPanel />
        <GridPanel duplicate />
      </div>
    </div>
  );
}
