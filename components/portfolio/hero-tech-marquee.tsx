"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { techMarqueeItems } from "@/lib/tech-marquee-items";

export default function HeroTechMarquee() {
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
        duration: 32,
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

  const items = [...techMarqueeItems, ...techMarqueeItems];

  return (
    <div className="hero-fade w-full mt-14 md:mt-16">
      <p className="text-center text-[10px] sm:text-xs font-medium uppercase tracking-[0.28em] text-foreground/45 mb-6">
        Technologies & tools we work with
      </p>
      <div className="marquee-container w-full">
        <div className="marquee-track flex items-center gap-8 md:gap-10 px-2" ref={trackRef}>
          {items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex shrink-0 flex-col items-center gap-1.5"
              title={item.label}
            >
              <span className="flex size-7 md:size-8 items-center justify-center text-xl md:text-2xl [&>svg]:size-full">
                {item.icon}
              </span>
              <span className="text-[9px] font-medium uppercase tracking-wider text-foreground/45 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
