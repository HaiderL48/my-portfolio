"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProjectDetailMotionProps {
  children: ReactNode;
}

export default function ProjectDetailMotion({
  children,
}: ProjectDetailMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const hero = root.querySelector<HTMLElement>("[data-project-hero]");
      if (hero) {
        const heroItems = hero.querySelectorAll<HTMLElement>(
          "[data-hero-item]",
        );
        gsap.from(heroItems, {
          opacity: 0,
          y: 28,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.08,
        });
      }

      const sections = root.querySelectorAll<HTMLElement>(
        "[data-project-section]",
      );
      sections.forEach((section) => {
        const targets = section.querySelectorAll<HTMLElement>(
          "[data-reveal]",
        );
        const batch = targets.length ? targets : [section];

        gsap.from(batch, {
          opacity: 0,
          y: 36,
          duration: 0.75,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });
      });

      const cards = root.querySelectorAll<HTMLElement>("[data-reveal-card]");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 24,
          scale: 0.98,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return <div ref={rootRef}>{children}</div>;
}
