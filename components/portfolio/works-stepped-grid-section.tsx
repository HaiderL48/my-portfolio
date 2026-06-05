"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { portfolioItems, type PortfolioItem } from "@/lib/portfolio-data";

const GRID_COLS = 6;
const SLIDE_SIZE = 12;
const MARQUEE_DURATION = 58;
const DRAG_THRESHOLD_PX = 6;

function wrapMarqueeX(x: number, segmentWidth: number): number {
  if (segmentWidth <= 0) return x;

  let wrapped = x % segmentWidth;
  if (wrapped > 0) wrapped -= segmentWidth;

  return wrapped;
}

type SteppedRowConfig = {
  offsetCols: number;
  projects: PortfolioItem[];
};

function chunkProjects(
  items: PortfolioItem[],
  size: number,
): PortfolioItem[][] {
  const chunks: PortfolioItem[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function buildSteppedRows(projects: PortfolioItem[]): SteppedRowConfig[] {
  if (projects.length === 0) return [];

  const rows: SteppedRowConfig[] = [
    {
      offsetCols: 1,
      projects: projects[0] ? [projects[0]] : [],
    },
  ];

  const rowTwo = projects.slice(1, 6);
  if (rowTwo.length > 0) {
    rows.push({
      offsetCols: 0,
      projects: rowTwo,
    });
  }

  const rowThree = projects.slice(6, 11);
  if (rowThree.length > 0) {
    rows.push({
      offsetCols: 1,
      projects: rowThree,
    });
  }

  if (projects[11]) {
    rows.push({
      offsetCols: 4,
      projects: [projects[11]],
    });
  }

  return rows;
}

function ProjectCell({ project }: { project: PortfolioItem }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      className="works-stepped-cell works-stepped-project group flex items-center justify-center bg-background p-5 md:p-6 hover:bg-accent/5 dark:hover:bg-white/5 transition-colors"
      title={project.groupTitle}
    >
      <div className="relative h-full w-full max-h-[85%] max-w-[88%]">
        <Image
          src={project.image}
          alt={project.groupTitle}
          fill
          draggable={false}
          className="pointer-events-none object-contain object-center transition-transform duration-500 group-hover:scale-[1.04] select-none"
          sizes="(max-width: 768px) 78vw, 480px"
        />
      </div>
      <span className="sr-only">{project.groupTitle}</span>
    </Link>
  );
}

function SteppedRow({
  offsetCols,
  children,
}: {
  offsetCols: number;
  children: ReactNode;
}) {
  return (
    <div
      className="works-stepped-row"
      style={{ "--row-offset": offsetCols } as CSSProperties}
    >
      <div className="works-stepped-row-inner">{children}</div>
    </div>
  );
}

function SteppedGridPanel({
  projects,
  panelId,
}: {
  projects: PortfolioItem[];
  panelId: string;
}) {
  const rows = buildSteppedRows(projects);

  return (
    <div
      className="works-stepped-cluster mx-auto w-full"
      style={{ "--grid-cols": GRID_COLS } as CSSProperties}
      role="list"
    >
      {rows.map((row, rowIndex) => (
        <SteppedRow key={`${panelId}-row-${rowIndex}`} offsetCols={row.offsetCols}>
          {row.projects.map((project) => (
            <ProjectCell key={`${panelId}-${project.slug}`} project={project} />
          ))}
        </SteppedRow>
      ))}
    </div>
  );
}

export default function WorksSteppedGridSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const segmentWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startTranslate: number;
    dragging: boolean;
  } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const slides = useMemo(() => chunkProjects(portfolioItems, SLIDE_SIZE), []);
  const marqueeSlides = useMemo(
    () => (slides.length > 1 ? [...slides, ...slides] : slides),
    [slides],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || reducedMotion || slides.length <= 1) return;

    const startMarquee = () => {
      const segmentWidth = track.scrollWidth / 2;
      if (segmentWidth <= 0) return;

      segmentWidthRef.current = segmentWidth;

      const currentX = wrapMarqueeX(
        gsap.getProperty(track, "x") as number,
        segmentWidth,
      );

      gsap.killTweensOf(track);
      gsap.set(track, { x: currentX });

      tweenRef.current = gsap.to(track, {
        x: `-=${segmentWidth}`,
        ease: "none",
        duration: MARQUEE_DURATION,
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((value) =>
            wrapMarqueeX(parseFloat(value), segmentWidth),
          ),
        },
      });

      if (isDraggingRef.current) {
        tweenRef.current.pause();
      }
    };

    const resumeMarquee = () => {
      if (!isDraggingRef.current) {
        tweenRef.current?.play();
      }
    };

    const suppressClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      viewport.removeEventListener("click", suppressClick, true);
    };

    const clearWindowPointerListeners = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endPointerInteraction);
      window.removeEventListener("pointercancel", endPointerInteraction);
    };

    const finishDrag = (pointerId: number, dragged: boolean) => {
      if (viewport.hasPointerCapture(pointerId)) {
        viewport.releasePointerCapture(pointerId);
      }

      viewport.classList.remove("is-dragging");
      clearWindowPointerListeners();
      isDraggingRef.current = false;

      if (dragged) {
        viewport.addEventListener("click", suppressClick, true);
        startMarquee();
      } else {
        resumeMarquee();
      }

      dragStateRef.current = null;
    };

    const cancelPendingDrag = () => {
      if (isDraggingRef.current) return;

      clearWindowPointerListeners();
      dragStateRef.current = null;
      resumeMarquee();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || dragStateRef.current) return;

      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startTranslate: gsap.getProperty(track, "x") as number,
        dragging: false,
      };

      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", endPointerInteraction);
      window.addEventListener("pointercancel", endPointerInteraction);
    };

    const onPointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState || event.pointerId !== dragState.pointerId) return;

      if (event.buttons === 0) {
        finishDrag(event.pointerId, dragState.dragging);
        return;
      }

      const deltaX = event.clientX - dragState.startX;

      if (!dragState.dragging) {
        if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;

        dragState.dragging = true;
        isDraggingRef.current = true;
        dragState.startTranslate = gsap.getProperty(track, "x") as number;
        dragState.startX = event.clientX;
        tweenRef.current?.pause();
        viewport.setPointerCapture(event.pointerId);
        viewport.classList.add("is-dragging");
      }

      event.preventDefault();

      gsap.set(track, {
        x: wrapMarqueeX(
          dragState.startTranslate + (event.clientX - dragState.startX),
          segmentWidthRef.current,
        ),
      });
    };

    const endPointerInteraction = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState || event.pointerId !== dragState.pointerId) return;

      finishDrag(event.pointerId, dragState.dragging);
    };

    const onDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    startMarquee();

    viewport.addEventListener("pointerdown", onPointerDown, { capture: true });
    viewport.addEventListener("pointerleave", cancelPendingDrag);
    track.addEventListener("dragstart", onDragStart);

    const observer = new ResizeObserver(startMarquee);
    observer.observe(viewport);
    observer.observe(track);

    return () => {
      observer.disconnect();
      clearWindowPointerListeners();
      viewport.removeEventListener("pointerdown", onPointerDown, { capture: true });
      viewport.removeEventListener("pointerleave", cancelPendingDrag);
      track.removeEventListener("dragstart", onDragStart);
      viewport.removeEventListener("click", suppressClick, true);
      viewport.classList.remove("is-dragging");
      dragStateRef.current = null;
      isDraggingRef.current = false;
      tweenRef.current?.kill();
      tweenRef.current = null;
      gsap.killTweensOf(track);
    };
  }, [marqueeSlides.length, reducedMotion, slides.length]);

  return (
    <section
      data-reveal-section
      className="works-stepped-section border-b border-border/50 py-14 md:py-20"
      aria-label="Portfolio grid"
    >
      <div className="site-container">
        <div ref={viewportRef} className="works-stepped-viewport marquee-container">
          <div ref={trackRef} className="works-stepped-track">
            {(reducedMotion ? slides.slice(0, 1) : marqueeSlides).map(
              (slideProjects, index) => (
                <div
                  key={`slide-${index}`}
                  className="works-stepped-slide"
                  aria-hidden={
                    !reducedMotion &&
                    index >= slides.length &&
                    slides.length > 1
                  }
                >
                  <SteppedGridPanel
                    projects={slideProjects}
                    panelId={`panel-${index}`}
                  />
                </div>
              ),
            )}
          </div>
        </div>

        {slides.length > 1 && !reducedMotion ? (
          <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
            Drag to explore · click any tile to open a project
          </p>
        ) : null}

        <p
          data-reveal-item
          className="mt-4 text-center text-xs text-foreground/50"
        >
          {portfolioItems.length} case studies — click any tile to open the full
          project story.
        </p>
      </div>
    </section>
  );
}
