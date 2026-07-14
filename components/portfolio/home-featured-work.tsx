"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  categories,
  disciplineLabels,
  portfolioItems,
  type Category,
} from "@/lib/portfolio-data";
import { TechBadgeList } from "@/components/portfolio/tech-badge";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import "./home-featured-work.css";

gsap.registerPlugin(ScrollTrigger);

const filterOptions: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  ...categories.map((c) => ({ value: c.value, label: c.label })),
];

const MAX_DISPLAY = 10;

function getAllFilterProjects() {
  const seen = new Set<string>();
  const rows: (typeof portfolioItems)[number][] = [];

  const addItem = (item: (typeof portfolioItems)[number]) => {
    if (seen.has(item.groupId) || rows.length >= MAX_DISPLAY) return;
    seen.add(item.groupId);
    rows.push(item);
  };

  portfolioItems.filter((p) => p.featured).forEach(addItem);
  portfolioItems.forEach(addItem);

  return rows;
}

function getPinOffset() {
  const header = document.querySelector("header");
  return header ? Math.ceil(header.getBoundingClientRect().height) : 64;
}

function ProjectCard({
  project,
  className = "",
}: {
  project: (typeof portfolioItems)[number];
  className?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-project-card
      className={`group featured-work-card flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/20 transition-[border-color] duration-300 ${className}`.trim()}
    >
      <div className="relative aspect-[16/11] bg-muted overflow-hidden">
        <Image
          src={project.image}
          alt={project.groupTitle}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 42vw"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold border border-border">
          {disciplineLabels[project.discipline]}
        </span>
      </div>
      <div className="p-5 flex flex-1 flex-col gap-3">
        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
          {project.groupTitle}
        </h3>
        <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed flex-1">
          {project.description}
        </p>
        <TechBadgeList
          items={project.tags.slice(0, 3)}
          size="sm"
          variant="muted"
        />
        <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
          Case study
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function FilterPills({
  filter,
  onChange,
  className = "",
}: {
  filter: Category;
  onChange: (value: Category) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {filterOptions.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            filter === opt.value
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-foreground/70 hover:bg-accent/10"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function HomeFeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const introDoneRef = useRef(false);
  const isInitialCardsRef = useRef(true);

  const [filter, setFilter] = useState<Category>("all");
  const reducedMotion = usePrefersReducedMotion();

  const display = useMemo(() => {
    if (filter === "all") {
      return getAllFilterProjects();
    }

    return portfolioItems
      .filter((p) => p.category.includes(filter))
      .slice(0, MAX_DISPLAY);
  }, [filter]);

  const displayKey = display.map((p) => p.slug).join(",");

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const filters = filtersRef.current;

    if (!section || !header || !filters || introDoneRef.current) return;

    let cancelled = false;

    const ctx = gsap.context(() => {
      const headerBits = header.querySelectorAll("[data-reveal]");
      const filterButtons = filters.querySelectorAll("button");

      gsap.set(headerBits, { opacity: 0, y: 20 });
      gsap.set(filterButtons, { opacity: 0, y: 20 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        })
        .to(headerBits, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
        })
        .to(
          filterButtons,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.25",
        );

      if (!cancelled) {
        introDoneRef.current = true;
      }
    }, section);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [reducedMotion]);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const pinZone = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!pinZone || !viewport || !track) return;

    let reelTrigger: ScrollTrigger | null = null;
    let reelTween: gsap.core.Tween | null = null;

    const killReel = () => {
      reelTrigger?.kill();
      reelTween?.kill();
      reelTrigger = null;
      reelTween = null;
    };

    const ctx = gsap.context(() => {
      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);

      const getEndDistance = (distance: number) => {
        const pinOffset = getPinOffset();
        const viewH = window.innerHeight - pinOffset;
        return Math.max(distance + viewH * 0.15, viewH * 0.55);
      };

      const buildReel = () => {
        killReel();

        gsap.set(track, { x: 0, clearProps: "transform" });
        gsap.set(track.querySelectorAll("[data-project-card]"), {
          clearProps:
            "transform,opacity,visibility,position,top,left,width,height",
        });

        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-project-card]",
          track,
        );
        if (!cards.length) {
          ScrollTrigger.refresh(true);
          return;
        }

        gsap.set(cards, { opacity: 1, y: 0 });

        if (isInitialCardsRef.current) {
          isInitialCardsRef.current = false;
          gsap.fromTo(
            cards,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.07,
              ease: "power2.out",
              overwrite: true,
            },
          );
        }

        const distance = getScrollDistance();
        if (distance < 40 || cards.length < 2) {
          ScrollTrigger.refresh(true);
          return;
        }

        const scrub = window.innerWidth < 1024 ? 0.9 : 0.75;
        const endDistance = getEndDistance(distance);

        reelTween = gsap.to(track, {
          x: -distance,
          ease: "none",
        });

        reelTrigger = ScrollTrigger.create({
          trigger: pinZone,
          start: () => `top top+=${getPinOffset()}`,
          end: () => `+=${endDistance}`,
          scrub,
          pin: pinZone,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: reelTween,
          onUpdate(self) {
            if (hintRef.current) {
              gsap.set(hintRef.current, {
                opacity: 0.45 * (1 - Math.min(self.progress / 0.15, 1)),
              });
            }
          },
        });

        ScrollTrigger.refresh(true);
      };

      const scheduleBuild = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(buildReel);
        });
      };

      scheduleBuild();

      const onResize = () => scheduleBuild();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        killReel();
      };
    }, pinZone);

    return () => {
      killReel();
      ctx.revert();
    };
  }, [displayKey, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative pt-12 md:pt-16 pb-0 border-b border-border/50 scroll-mt-24 bg-background"
    >
      <div className="site-container pb-6 md:pb-8">
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p
              data-reveal
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2"
            >
              Proof in the work
            </p>
            <h2
              data-reveal
              className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-extrabold tracking-tight text-balance"
            >
              Products clients hired us to ship
            </h2>
            <p
              data-reveal
              className="mt-4 text-foreground/60 leading-relaxed text-sm sm:text-base 2xl:text-lg"
            >
              Real case studies across mobile, web, design, and commerce — each
              with its own discipline and stack.
            </p>
          </div>
          <Link
            data-reveal
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            View full portfolio
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {reducedMotion ? (
        <div className="site-container pb-12 md:pb-16">
          <FilterPills
            filter={filter}
            onChange={setFilter}
            className="mb-8 md:mb-10"
          />
          <div className="featured-work-grid--static">
            {display.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <div ref={pinRef} className="featured-work-pin-zone bg-background">
          <div className="site-container pb-10 md:pb-12">
            <div ref={filtersRef} className="featured-work-filters">
              <FilterPills filter={filter} onChange={setFilter} />
            </div>
            <div ref={viewportRef} className="featured-work-viewport">
              <div ref={trackRef} className="featured-work-track">
                {display.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
            <p ref={hintRef} className="featured-work-scroll-hint">
              Scroll to explore
              <ArrowRight className="size-3.5" aria-hidden />
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
