"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { techMarqueeItems } from "@/lib/tech-marquee-items";

export default function TechMarquee({ className = "" }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      const width = track.scrollWidth / 2;
      gsap.killTweensOf(track);
      gsap.set(track, { x: 0 });
      gsap.to(track, {
        x: -width,
        ease: "none",
        duration: 28,
        repeat: -1,
      });
    };

    animate();
    window.addEventListener("resize", animate);
    return () => {
      gsap.killTweensOf(track);
      window.removeEventListener("resize", animate);
    };
  }, []);

  return (
    <section
      className={`py-12 md:py-16 border-b border-border/50 overflow-hidden ${className}`}
    >
      <div className="site-container mb-8 text-center">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
          Tools & tech
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Stacks clients recognize
        </h2>
      </div>
      <div className="marquee-container overflow-hidden">
        <div className="marquee w-sm sm:w-xl md:w-2xl lg:w-4xl mx-auto">
          <div className="marquee-track flex gap-5" ref={trackRef}>
            {[...techMarqueeItems, ...techMarqueeItems].map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-accent-foreground dark:bg-accent min-w-[72px]"
                title={item.label}
              >
                <span className="text-2xl md:text-3xl">{item.icon}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/70">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
