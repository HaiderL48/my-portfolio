"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getServiceBySlug, type ServiceSlug } from "@/lib/services-data";
import { getServiceStackScrollData } from "@/lib/service-stack-scroll-data";
import { TechBadge } from "@/components/portfolio/tech-badge";
import "./service-stack-scroll.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LG_BREAKPOINT = 1024;
const SCROLL_VH = 3.8;
const LAYER_GAP = 10;

interface ServiceStackScrollProps {
  slug: ServiceSlug;
}

interface StackLayout {
  totalHeight: number;
  topHeight: number;
  midHeights: number[];
  techHeight: number;
  bottomHeight: number;
  finalTops: {
    top: number;
    mids: number[];
    tech: number;
    bottom: number;
  };
  midSlotY: number;
  bookendBottomY: number;
}

function CornerMarks() {
  return (
    <>
      <span className="service-stack-corner service-stack-corner--tl" />
      <span className="service-stack-corner service-stack-corner--tr" />
      <span className="service-stack-corner service-stack-corner--bl" />
      <span className="service-stack-corner service-stack-corner--br" />
    </>
  );
}

function StackLayerCard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="service-stack-layer relative px-5 py-4 md:px-6 md:py-5">
      <CornerMarks />
      <p
        className="text-lg md:text-xl font-semibold tracking-tight text-[#111]"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        {title}
      </p>
      <p className="mt-1 line-clamp-2 text-xs md:text-sm text-[#666] leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

function measureStackLayout(
  stackGroup: HTMLElement,
  topLayer: HTMLElement,
  midLayers: HTMLElement[],
  techLayer: HTMLElement,
  bottomLayer: HTMLElement,
): StackLayout {
  stackGroup.classList.remove("service-stack-group--animated");
  stackGroup.classList.add("service-stack-group--flow");
  stackGroup.style.height = "auto";

  const layers = [topLayer, ...midLayers, techLayer, bottomLayer];
  gsap.set(layers, { clearProps: "all" });
  gsap.set(layers, { autoAlpha: 1 });

  const topHeight = topLayer.offsetHeight;
  const midHeights = midLayers.map((layer) => layer.offsetHeight);
  const techHeight = techLayer.offsetHeight;
  const bottomHeight = bottomLayer.offsetHeight;

  const mids: number[] = [];
  let cursor = topHeight + LAYER_GAP;
  for (const h of midHeights) {
    mids.push(cursor);
    cursor += h + LAYER_GAP;
  }
  const techTop = cursor;
  cursor += techHeight + LAYER_GAP;
  const bottomTop = cursor;
  const totalHeight = bottomTop + bottomHeight;

  const slotHeight = Math.max(...midHeights, techHeight, 0);
  const midSlotY = topHeight + LAYER_GAP;
  const bookendBottomY = midSlotY + slotHeight + LAYER_GAP;

  return {
    totalHeight,
    topHeight,
    midHeights,
    techHeight,
    bottomHeight,
    finalTops: {
      top: 0,
      mids,
      tech: techTop,
      bottom: bottomTop,
    },
    midSlotY,
    bookendBottomY,
  };
}

export default function ServiceStackScroll({ slug }: ServiceStackScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const service = useMemo(() => getServiceBySlug(slug), [slug]);
  const data = useMemo(
    () => (service ? getServiceStackScrollData(service) : null),
    [service],
  );

  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [slug]);

  useGSAP(
    () => {
      if (!service) return;

      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const lgQuery = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const beats = gsap.utils.toArray<HTMLElement>("[data-stack-beat]", pin);
      const stackGroup = pin.querySelector<HTMLElement>("[data-stack-group]");
      const topLayer = pin.querySelector<HTMLElement>("[data-layer-top]");
      const midLayers = gsap.utils.toArray<HTMLElement>(
        "[data-layer-mid]",
        pin,
      );
      const techLayer = pin.querySelector<HTMLElement>("[data-layer-tech]");
      const bottomLayer = pin.querySelector<HTMLElement>("[data-layer-bottom]");
      const iconPanel = pin.querySelector<HTMLElement>("[data-icon-panel]");
      const wires = pin.querySelector<SVGElement>("[data-stack-wires]");

      if (
        !stackGroup ||
        !topLayer ||
        !bottomLayer ||
        !techLayer ||
        !iconPanel
      ) {
        return;
      }

      const allLayers = [topLayer, ...midLayers, techLayer, bottomLayer];
      let layoutCache: StackLayout | null = null;

      const applyFlowLayout = () => {
        stackGroup.classList.remove("service-stack-group--animated");
        stackGroup.classList.add("service-stack-group--flow");
        stackGroup.style.height = "auto";
        gsap.set(allLayers, { clearProps: "top,zIndex" });
        gsap.set(allLayers, { autoAlpha: 1 });
      };

      const applyAnimatedLayout = (layout: StackLayout) => {
        stackGroup.classList.add("service-stack-group--animated");
        stackGroup.classList.remove("service-stack-group--flow");
        stackGroup.style.height = `${layout.totalHeight}px`;

        gsap.set(topLayer, {
          top: layout.finalTops.top,
          autoAlpha: 1,
          zIndex: 2,
        });
        gsap.set(bottomLayer, {
          top: layout.bookendBottomY,
          autoAlpha: 1,
          zIndex: 2,
        });
        gsap.set(midLayers, {
          top: layout.midSlotY,
          autoAlpha: 0,
          zIndex: 3,
        });
        gsap.set(techLayer, {
          top: layout.midSlotY,
          autoAlpha: 0,
          zIndex: 3,
        });
      };

      const showFinal = () => {
        section.style.height = "auto";
        applyFlowLayout();
        gsap.set(stackGroup, { clearProps: "transform" });
        gsap.set(iconPanel, { autoAlpha: 1, scale: 1 });
        gsap.set(beats, { autoAlpha: 0, y: 0 });
        gsap.set(beats[beats.length - 1], { autoAlpha: 1, y: 0 });
        if (wires) gsap.set(wires, { opacity: 0.2 });
      };

      const setBeatExclusive = (activeIndex: number) => {
        beats.forEach((beat, i) => {
          gsap.set(beat, {
            autoAlpha: i === activeIndex ? 1 : 0,
            y: i === activeIndex ? 0 : i < activeIndex ? -12 : 12,
            zIndex: i === activeIndex ? 2 : 1,
          });
        });
      };

      const setInitial = (layout: StackLayout) => {
        section.style.height = `${SCROLL_VH * 100}vh`;
        applyAnimatedLayout(layout);

        const bookendHeight = layout.bookendBottomY + layout.bottomHeight;
        stackGroup.style.height = `${bookendHeight}px`;

        const available = pin.clientHeight * 0.68;
        const fitScale = Math.min(1, available / bookendHeight);

        setBeatExclusive(0);
        gsap.set(stackGroup, {
          rotateX: 0,
          rotateY: 0,
          scale: fitScale,
          y: 0,
          transformOrigin: "50% 40%",
        });
        gsap.set(iconPanel, { autoAlpha: 0, scale: 0.92 });
        if (wires) gsap.set(wires, { opacity: 0 });

        return { fitScale, fullFitScale: Math.min(1, available / layout.totalHeight) };
      };

      let timeline: gsap.core.Timeline | null = null;
      let lastBeatIndex = -1;

      const updateBeatForProgress = (progress: number) => {
        let index = 0;
        if (progress >= 0.6) index = 2;
        else if (progress >= 0.18) index = 1;

        if (index === lastBeatIndex) return;
        lastBeatIndex = index;
        setBeatExclusive(index);
      };

      const buildTimeline = () => {
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        lastBeatIndex = -1;

        const layout = measureStackLayout(
          stackGroup,
          topLayer,
          midLayers,
          techLayer,
          bottomLayer,
        );
        layoutCache = layout;
        const { fitScale, fullFitScale } = setInitial(layout);

        timeline = gsap.timeline({
          scrollTrigger: {
            id: `service-stack-${slug}`,
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * SCROLL_VH}`,
            pin: pin,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onLeave: () => {
              gsap.set(stackGroup, { clearProps: "transform" });
            },
            onEnterBack: () => {
              if (layoutCache) setInitial(layoutCache);
            },
            onUpdate: (self) => {
              updateBeatForProgress(self.progress);
            },
          },
        });

        timeline
          .to(
            stackGroup,
            {
              rotateX: 48,
              rotateY: -18,
              scale: fitScale * 0.94,
              duration: 0.32,
              ease: "power2.inOut",
            },
            0.12,
          )
          .to(wires, { opacity: 0.4, duration: 0.22 }, 0.18);

        const midWindow = 0.1;
        midLayers.forEach((layer, i) => {
          const start = 0.28 + i * midWindow;
          const end = start + midWindow * 0.75;

          timeline!.to(
            layer,
            { autoAlpha: 1, duration: midWindow * 0.25, ease: "power1.out" },
            start,
          );

          if (i < midLayers.length - 1) {
            timeline!.to(
              layer,
              { autoAlpha: 0, duration: midWindow * 0.2, ease: "power1.in" },
              end,
            );
          } else {
            timeline!.to(
              layer,
              { autoAlpha: 0, duration: midWindow * 0.15, ease: "power1.in" },
              0.62,
            );
          }
        });

        timeline
          .to(
            iconPanel,
            { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power2.out" },
            0.5,
          )
          .to(
            stackGroup,
            {
              rotateX: 0,
              rotateY: 0,
              scale: fullFitScale,
              height: layout.totalHeight,
              duration: 0.34,
              ease: "power2.inOut",
            },
            0.66,
          );

        midLayers.forEach((layer, i) => {
          timeline!.set(layer, { autoAlpha: 0 }, 0.64);
          timeline!.to(
            layer,
            {
              top: layout.finalTops.mids[i],
              autoAlpha: 1,
              duration: 0.06,
              ease: "power2.out",
            },
            0.68 + i * 0.05,
          );
        });

        timeline
          .set(techLayer, { autoAlpha: 0 }, 0.64)
          .to(
            techLayer,
            {
              top: layout.finalTops.tech,
              autoAlpha: 1,
              duration: 0.06,
              ease: "power2.out",
            },
            0.68 + midLayers.length * 0.05,
          )
          .to(
            bottomLayer,
            {
              top: layout.finalTops.bottom,
              duration: 0.1,
              ease: "power2.inOut",
            },
            0.68,
          )
          .to(wires, { opacity: 0.18, duration: 0.18 }, 0.78);

        const st = timeline.scrollTrigger;
        if (st) updateBeatForProgress(st.progress);
      };

      const sync = () => {
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        timeline = null;
        lastBeatIndex = -1;

        if (!lgQuery.matches || prefersReducedMotion) {
          showFinal();
          return;
        }

        buildTimeline();
        ScrollTrigger.refresh();
      };

      sync();

      const onResize = () => sync();
      lgQuery.addEventListener("change", onResize);
      window.addEventListener("resize", onResize);

      return () => {
        lgQuery.removeEventListener("change", onResize);
        window.removeEventListener("resize", onResize);
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
      };
    },
    { scope: sectionRef, dependencies: [slug] },
  );

  if (!service || !data) return null;

  const Icon = service.icon;

  return (
    <section
      ref={sectionRef}
      className="service-stack-section relative isolate border-b border-border/50 bg-[#f5f5f3]"
      aria-label={data.sectionTitle}
    >
      <div
        ref={pinRef}
        className="relative min-h-[100svh] w-full overflow-hidden lg:h-[100svh]"
      >
        <div className="absolute left-4 top-6 z-20 md:left-8 lg:left-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#999]">
            {data.sectionLabel}
          </p>
          <h2
            className="mt-2 max-w-md text-2xl font-semibold text-[#111] md:text-3xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {data.sectionTitle}
          </h2>
        </div>

        <div className="site-container flex h-full flex-col pb-10 pt-28 lg:flex-row lg:items-center lg:gap-10 lg:pt-24">
          <div className="service-stack-beats relative z-10 h-[38%] shrink-0 overflow-hidden lg:h-auto lg:min-h-[320px] lg:w-[42%]">
            {data.beats.map((beat, i) => (
              <article
                key={beat.label}
                data-stack-beat
                className={`absolute inset-x-0 top-0 max-w-lg rounded-sm px-5 py-5 md:px-6 md:py-6 ${
                  i === 0 || i === 2
                    ? "bg-[#111] text-white"
                    : "border border-dashed border-[#ccc] bg-white/80 text-[#111]"
                }`}
              >
                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
                    i === 1 ? "text-[#888]" : "text-white/55"
                  }`}
                >
                  {beat.label}
                </p>
                <h3
                  className="mt-3 text-xl font-semibold leading-snug md:text-2xl"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {beat.title}
                </h3>
                <p
                  className={`mt-3 line-clamp-4 text-sm leading-relaxed ${
                    i === 1 ? "text-[#666]" : "text-white/75"
                  }`}
                >
                  {beat.body}
                </p>
              </article>
            ))}
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center lg:justify-end">
            <div className="service-stack-scene relative w-full max-w-[560px]">
              <svg
                data-stack-wires
                className="pointer-events-none absolute -inset-6 h-[calc(100%+48px)] w-[calc(100%+48px)] opacity-0"
                viewBox="0 0 560 480"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M40 40 L40 440 M520 40 L520 440 M40 40 L520 40 M40 440 L520 440"
                  stroke="#c8c8c4"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <path
                  d="M40 40 L520 440 M520 40 L40 440"
                  stroke="#d8d8d4"
                  strokeWidth="0.75"
                  strokeDasharray="3 8"
                />
              </svg>

              <div className="relative pr-0 md:pr-24">
                <div
                  data-stack-group
                  className="service-stack-group service-stack-group--flow w-full"
                >
                  <div data-layer-top className="service-stack-layer-item">
                    <StackLayerCard
                      title={data.stackTop.title}
                      subtitle={data.stackTop.subtitle}
                    />
                  </div>

                  {data.stackMiddle.map((layer, i) => (
                    <div
                      key={`${layer.title}-${i}`}
                      data-layer-mid
                      className="service-stack-layer-item"
                    >
                      <StackLayerCard
                        title={layer.title}
                        subtitle={layer.subtitle}
                      />
                    </div>
                  ))}

                  <div data-layer-tech className="service-stack-layer-item">
                    <div className="service-stack-layer relative px-3 py-3 md:px-4">
                      <CornerMarks />
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {data.technologies.map((tech) => (
                          <TechBadge
                            key={tech}
                            label={tech}
                            size="sm"
                            variant="plain"
                            className="rounded-md border border-[#ddd] bg-white px-2 py-1 text-[10px]"
                          />
                        ))}
                        {data.moreTechCount > 0 && (
                          <span className="rounded-md border border-dashed border-[#ccc] px-2 py-1 text-[10px] font-medium text-[#888]">
                            + {data.moreTechCount} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div data-layer-bottom className="service-stack-layer-item">
                    <StackLayerCard
                      title={data.stackBottom.title}
                      subtitle={data.stackBottom.subtitle}
                    />
                  </div>
                </div>

                <div
                  data-icon-panel
                  className="pointer-events-none absolute right-0 top-[28%] w-[30%] max-w-[140px] opacity-0 max-md:hidden"
                >
                  <div className="service-stack-layer flex aspect-square items-center justify-center">
                    <CornerMarks />
                    <div className="flex size-14 items-center justify-center rounded-full border border-[#ddd] bg-white text-[#111] md:size-16">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 px-4 text-center lg:hidden">
          <p className="text-[11px] text-[#999]">
            Scroll to explore how this service fits your stack
          </p>
        </div>
      </div>
    </section>
  );
}
