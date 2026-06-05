"use client";

import { useEffect, useMemo, useRef } from "react";

const TYPE_MS = 52;
const DELETE_MS = 28;
const PAUSE_TYPED = 2400;
const PAUSE_DELETED = 400;

function sleep(ms: number, signal: { cancelled: boolean; timeouts: number[] }) {
  return new Promise<void>((resolve) => {
    const id = window.setTimeout(() => {
      if (!signal.cancelled) resolve();
    }, ms);
    signal.timeouts.push(id);
  });
}

export default function HeroRotatingText({
  phrases,
  label,
  centered = false,
}: {
  phrases: string[];
  label?: string;
  centered?: boolean;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const signalRef = useRef({ cancelled: false, timeouts: [] as number[] });

  const longestPhrase = useMemo(
    () => phrases.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [phrases],
  );

  const lineClass =
    "inline-flex items-center gap-1 whitespace-nowrap text-sm sm:text-base";

  useEffect(() => {
    const el = textRef.current;
    if (!el || phrases.length === 0) return;

    const signal = signalRef.current;
    signal.cancelled = false;
    signal.timeouts = [];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      el.textContent = phrases[0];
      return () => {
        signal.cancelled = true;
        signal.timeouts.forEach((id) => window.clearTimeout(id));
      };
    }

    let phraseIndex = 0;

    const run = async () => {
      while (!signal.cancelled) {
        const phrase = phrases[phraseIndex];

        for (let i = 0; i <= phrase.length; i++) {
          if (signal.cancelled) return;
          el.textContent = phrase.slice(0, i);
          await sleep(TYPE_MS, signal);
        }

        await sleep(PAUSE_TYPED, signal);

        for (let i = phrase.length; i >= 0; i--) {
          if (signal.cancelled) return;
          el.textContent = phrase.slice(0, i);
          await sleep(DELETE_MS, signal);
        }

        await sleep(PAUSE_DELETED, signal);
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    };

    run();

    return () => {
      signal.cancelled = true;
      signal.timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [phrases]);

  return (
    <div
      className={`hero-typewriter w-fit max-w-full shrink-0 ${centered ? "mx-auto" : "mx-auto lg:mx-0"}`}
    >
      {label && (
        <p
          className={`text-[11px] font-medium text-foreground/45 mb-2 ${centered ? "text-center" : "text-left"}`}
        >
          {label}
        </p>
      )}

      {/* Width locked to longest phrase; cursor stays inline after typed text */}
      <div
        className="inline-grid grid-cols-1 grid-rows-1 rounded-lg border border-border bg-card/90 px-3 shadow-sm backdrop-blur-sm h-10 sm:h-11 items-center max-w-full"
        aria-live="polite"
      >
        <span
          className={`${lineClass} invisible col-start-1 row-start-1`}
          aria-hidden
        >
          <span className="font-mono">&gt;</span>
          <span className="font-medium">{longestPhrase}</span>
          <span className="inline-block h-4 w-[2px] shrink-0" />
        </span>

        <span className={`${lineClass} col-start-1 row-start-1 justify-start`}>
          <span className="text-primary font-mono shrink-0">&gt;</span>
          <span ref={textRef} className="font-medium text-foreground" />
          <span
            className="inline-block h-4 w-[2px] shrink-0 bg-primary animate-pulse"
            aria-hidden
          />
        </span>
      </div>
    </div>
  );
}
