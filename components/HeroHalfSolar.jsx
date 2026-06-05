"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  Search,
  PenLine,
  Code2,
  CheckCircle,
  Rocket,
  Headphones,
  Infinity,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

const BG = "#f5f5f3";
const SUN_BELOW = 20;

const BASE_ORBIT_RS = [200, 380, 580, 760];

const ORBIT_STYLES = [
  { stroke: "#c8c8c4", strokeWidth: 1, dasharray: "5 6" },
  { stroke: "#c8c8c4", strokeWidth: 1, dasharray: "5 6" },
  { stroke: "#d4d4d0", strokeWidth: 0.9, dasharray: "4 7" },
  { stroke: "#e0e0dc", strokeWidth: 0.6, dasharray: "3 10" },
];

const PLANETS = [
  {
    name: "DISCOVER",
    orbitIndex: 0,
    speed: 0.003,
    startAngle: 2.2,
    variant: "black",
    icon: Search,
    tooltipTitle: "DISCOVER",
    tooltipSub: "Understanding your goals & audience",
  },
  {
    name: "DESIGN",
    orbitIndex: 0,
    speed: 0.003,
    startAngle: 0.94,
    variant: "black",
    icon: PenLine,
    tooltipTitle: "DESIGN",
    tooltipSub: "Wireframes, UI & brand alignment",
  },
  {
    name: "DEVELOP",
    orbitIndex: 1,
    speed: 0.002,
    startAngle: 2.44,
    variant: "white",
    icon: Code2,
    tooltipTitle: "DEVELOP",
    tooltipSub: "Clean code, fast & scalable builds",
  },
  {
    name: "TEST",
    orbitIndex: 1,
    speed: 0.002,
    startAngle: 0.7,
    variant: "white",
    icon: CheckCircle,
    tooltipTitle: "TEST",
    tooltipSub: "QA, cross-device & performance checks",
  },
  {
    name: "LAUNCH",
    orbitIndex: 2,
    speed: 0.0013,
    startAngle: 2.6,
    variant: "black",
    icon: Rocket,
    tooltipTitle: "LAUNCH",
    tooltipSub: "Deployment, domains & go-live",
  },
  {
    name: "SUPPORT",
    orbitIndex: 2,
    speed: 0.0013,
    startAngle: 0.54,
    variant: "white",
    icon: Headphones,
    tooltipTitle: "SUPPORT",
    tooltipSub: "Retainers, updates & ongoing care",
  },
];

function getResponsiveConfig(width, height) {
  const isMobile = width < 640;
  const isTablet = width < 1024;
  const isSmallDesktop = width < 1366;
  const isShort = height < 820;

  return {
    planetPad: isMobile ? 10 : isTablet ? 18 : isSmallDesktop ? 22 : 30,
    orbitTopPad: isMobile ? 16 : isShort ? 32 : isTablet ? 44 : 56,
    planetBlack: isMobile ? 40 : isTablet ? 50 : 58,
    planetWhite: isMobile ? 44 : isTablet ? 54 : 62,
    iconSize: isMobile ? 16 : isTablet ? 17 : 20,
    showLabels: width >= 360,
    labelSize: isMobile ? 7 : 8,
    scaleBoost: isMobile ? 1.02 : isTablet ? 1.06 : isSmallDesktop ? 1.08 : 1.04,
  };
}

function getSystemScale(width, height, orbitZoneTop, config) {
  if (!width || !height) return 1;

  const maxR = BASE_ORBIT_RS[BASE_ORBIT_RS.length - 1];
  const scaleX = (width / 2 - config.planetPad) / maxR;
  const scaleY =
    (height + SUN_BELOW - orbitZoneTop - config.orbitTopPad) / maxR;

  const fit = Math.min(scaleX, scaleY);
  const boosted = fit * config.scaleBoost;

  return Math.max(0.38, Math.min(boosted, scaleX));
}

function getSunSizes(scale, width) {
  const base = width < 640 ? 200 : width < 1024 ? 220 : 240;
  const glow = Math.round(base * Math.max(scale, 0.55));
  return {
    glow,
    inner: Math.round(glow * 0.8),
    icon: Math.round(glow * 0.3),
  };
}

function arcPath(cx, cy, r) {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
}

function planetXY(cx, cy, r, angle) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy - r * Math.sin(angle),
  };
}

function PlanetTooltip({ title, subtitle, visible }) {
  return (
    <div
      className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-50 max-w-[200px] -translate-x-1/2 rounded-lg border border-[#e0e0e0] bg-white px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.10)] transition-opacity duration-150 after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-white sm:max-w-none sm:whitespace-nowrap sm:px-3.5"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <p className="text-[11px] font-bold text-[#111] sm:text-xs">{title}</p>
      <p className="mt-0.5 text-[10px] text-[#888] sm:text-[11px]">
        {subtitle}
      </p>
    </div>
  );
}

function SunHalfCenter({ innerSize, iconSize, top }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const root = ref.current;
      const path = root?.querySelector("path");
      const pulseRing = root?.querySelector("[data-sun-pulse-ring]");
      if (!path) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const length = path.getTotalLength();
      const dash = length * 0.32;
      const gap = length * 0.08;
      const segment = dash + gap;
      const loopDuration = 2.2;

      path.style.strokeDasharray = `${dash} ${gap}`;
      path.style.strokeDashoffset = "0";
      path.style.willChange = "stroke-dashoffset";

      if (prefersReducedMotion) return;

      let offset = 0;

      const tick = () => {
        offset -= (segment / loopDuration) * (gsap.ticker.deltaRatio() / 60);
        if (offset <= -segment) offset += segment;
        path.style.strokeDashoffset = `${offset}`;
      };

      gsap.ticker.add(tick);

      if (pulseRing) {
        gsap.fromTo(
          pulseRing,
          { scale: 1, opacity: 0.45 },
          {
            scale: 1.5,
            opacity: 0,
            duration: 2.8,
            ease: "power1.out",
            repeat: -1,
          },
        );
      }

      return () => {
        gsap.ticker.remove(tick);
        path.style.willChange = "";
      };
    },
    { scope: ref, dependencies: [innerSize, iconSize] },
  );

  return (
    <div
      ref={ref}
      className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-white"
      style={{
        width: innerSize,
        height: innerSize,
        top,
        border: "1px solid #e8e8e4",
      }}
      aria-hidden
    >
      <div
        data-sun-pulse-ring
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(255, 200, 120, 0.35)",
          transformOrigin: "50% 50%",
        }}
      />
      <Infinity
        className="relative z-[1] text-[#111]"
        size={iconSize}
        strokeWidth={1.75}
      />
    </div>
  );
}

export default function HeroHalfSolar() {
  const sectionRef = useRef(null);
  const topZoneRef = useRef(null);
  const planetRefs = useRef([]);
  const innerRefs = useRef([]);
  const anglesRef = useRef(PLANETS.map((p) => p.startAngle));
  const pausedRef = useRef(PLANETS.map(() => false));
  const layoutRef = useRef({
    cx: 0,
    cy: 0,
    w: 0,
    h: 0,
    scale: 1,
    orbitRs: BASE_ORBIT_RS,
    sun: getSunSizes(1, 1200),
    orbitZoneTop: 300,
    config: getResponsiveConfig(1200, 800),
  });

  const [layout, setLayout] = useState({
    cx: 0,
    cy: 0,
    w: 0,
    h: 0,
    scale: 1,
    orbitRs: BASE_ORBIT_RS,
    sun: getSunSizes(1, 1200),
    orbitZoneTop: 300,
    config: getResponsiveConfig(1200, 800),
  });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const getPlanetHalf = (variant, config) =>
    (variant === "black" ? config.planetBlack : config.planetWhite) / 2;

  const measure = () => {
    const section = sectionRef.current;
    if (!section) return null;

    const w = section.clientWidth;
    const h = window.innerHeight;
    const config = getResponsiveConfig(w, h);
    const measuredTop = topZoneRef.current?.offsetHeight ?? 0;
    const orbitZoneTop = Math.max(
      measuredTop + 12,
      h * (w < 640 ? 0.36 : w < 1024 ? 0.33 : 0.3),
    );
    const scale = getSystemScale(w, h, orbitZoneTop, config);
    const next = {
      w,
      h,
      cx: w / 2,
      cy: h + SUN_BELOW,
      scale,
      config,
      orbitZoneTop,
      orbitRs: BASE_ORBIT_RS.map((r) => r * scale),
      sun: getSunSizes(scale, w),
    };

    layoutRef.current = next;
    setLayout(next);
    positionAllPlanets(next);
    return next;
  };

  const positionPlanet = (idx, layoutState) => {
    const el = planetRefs.current[idx];
    if (!el) return;

    const { cx, cy, config } = layoutState;
    const planet = PLANETS[idx];
    const angle = anglesRef.current[idx];
    const orbitR =
      layoutState.orbitRs?.[planet.orbitIndex] ??
      BASE_ORBIT_RS[planet.orbitIndex];
    const { x, y } = planetXY(cx, cy, orbitR, angle);
    const half = getPlanetHalf(planet.variant, config);

    el.style.left = `${cx}px`;
    el.style.top = `${cy}px`;
    el.style.transform = `translate(${x - cx - half}px, ${y - cy - half}px)`;
  };

  const positionAllPlanets = (layoutState) => {
    for (let i = 0; i < PLANETS.length; i++) {
      positionPlanet(i, layoutState);
    }
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      measure();

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const tick = () => {
        const layoutState = layoutRef.current;
        if (!layoutState.cx) return;

        for (let i = 0; i < PLANETS.length; i++) {
          if (pausedRef.current[i]) continue;

          anglesRef.current[i] -= PLANETS[i].speed;
          if (anglesRef.current[i] < 0) {
            anglesRef.current[i] = Math.PI;
          }

          positionPlanet(i, layoutState);
        }
      };

      gsap.ticker.add(tick);

      const resizeObserver = new ResizeObserver(() => measure());
      resizeObserver.observe(section);
      if (topZoneRef.current) resizeObserver.observe(topZoneRef.current);

      const onResize = () => measure();
      window.addEventListener("resize", onResize);

      return () => {
        gsap.ticker.remove(tick);
        resizeObserver.disconnect();
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: sectionRef },
  );

  useLayoutEffect(() => {
    measure();
    const raf = requestAnimationFrame(() => measure());
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleEnter = (idx) => {
    pausedRef.current[idx] = true;
    setHoveredIdx(idx);
    const inner = innerRefs.current[idx];
    if (inner) {
      gsap.to(inner, { scale: 1.15, duration: 0.2, ease: "power2.out" });
    }
  };

  const handleLeave = (idx) => {
    pausedRef.current[idx] = false;
    setHoveredIdx((current) => (current === idx ? null : current));
    const inner = innerRefs.current[idx];
    if (inner) {
      gsap.to(inner, { scale: 1, duration: 0.2 });
    }
  };

  const serif = 'Georgia, "Times New Roman", serif';
  const { config, sun } = layout;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[100svh] w-full overflow-x-hidden overflow-y-hidden"
      style={{ background: BG }}
    >
      {/* TOP ZONE */}
      <div
        ref={topZoneRef}
        className="relative z-20 flex flex-col items-center px-4 pt-20 text-center sm:pt-24 md:pt-[54px]"
      >
        <p
          className="uppercase tracking-[0.35em] text-[#aaa] sm:tracking-[0.45em]"
          style={{ fontSize: "clamp(8px, 2vw, 10px)" }}
        >
          HOW WE WORK
        </p>

        <h1
          className="mt-3 whitespace-nowrap font-bold text-[#111] sm:mt-[18px]"
          style={{
            fontFamily: serif,
            fontSize: "clamp(22px, 5.5vw, 42px)",
          }}
        >
          We design and build
        </h1>

        <p
          className="mt-3 text-[#999] sm:mt-[18px]"
          style={{ fontSize: "clamp(15px, 3.5vw, 21px)" }}
        >
          from first conversation to launch
        </p>

        <p
          className="mt-3 max-w-md px-2 text-[#bbb] sm:mt-[18px]"
          style={{ fontSize: "clamp(10px, 2.5vw, 12px)" }}
        >
          Six steps orbit our process — hover an icon to see what happens at each
          stage.
        </p>

        <div className="mt-5 flex w-full max-w-xs flex-col items-center justify-center gap-2.5 sm:mt-[26px] sm:max-w-none sm:flex-row sm:gap-3">
          <Link
            href="/contact"
            className="inline-flex h-10 w-full items-center justify-center rounded-[7px] bg-[#111] text-sm text-white transition hover:bg-[#222] sm:w-[148px]"
          >
            Start a project →
          </Link>
          <Link
            href="/work"
            className="inline-flex h-10 w-full items-center justify-center rounded-[7px] border border-[#ccc] bg-transparent text-sm text-[#444] transition hover:bg-white/60 sm:w-[118px]"
          >
            View work
          </Link>
        </div>
      </div>

      {/* ORBIT ZONE */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <svg
          className="absolute left-0 top-0 h-full w-full"
          width={layout.w || "100%"}
          height={layout.h || "100%"}
          aria-hidden
        >
          {layout.cx > 0 &&
            layout.orbitRs.map((r, i) => (
              <path
                key={`orbit-${i}`}
                d={arcPath(layout.cx, layout.cy, r)}
                fill="none"
                stroke={ORBIT_STYLES[i].stroke}
                strokeWidth={ORBIT_STYLES[i].strokeWidth}
                strokeDasharray={ORBIT_STYLES[i].dasharray}
              />
            ))}
        </svg>

        {layout.cx > 0 &&
          PLANETS.map((planet, idx) => {
            const Icon = planet.icon;
            const isBlack = planet.variant === "black";
            const size = isBlack ? config.planetBlack : config.planetWhite;

            return (
              <div
                key={planet.name}
                ref={(el) => {
                  planetRefs.current[idx] = el;
                }}
                className="pointer-events-auto absolute will-change-transform"
                style={{ left: layout.cx, top: layout.cy }}
              >
                <div
                  ref={(el) => {
                    innerRefs.current[idx] = el;
                  }}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => handleEnter(idx)}
                  onMouseLeave={() => handleLeave(idx)}
                  onTouchStart={() => handleEnter(idx)}
                  onTouchEnd={() => handleLeave(idx)}
                >
                  <PlanetTooltip
                    title={planet.tooltipTitle}
                    subtitle={planet.tooltipSub}
                    visible={hoveredIdx === idx}
                  />

                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: size,
                      height: size,
                      background: isBlack ? "#111" : "#fff",
                      border: isBlack ? "none" : "1.2px solid #ddd",
                      boxShadow: isBlack
                        ? "none"
                        : "0 2px 12px rgba(0,0,0,0.07)",
                    }}
                  >
                    <Icon
                      size={config.iconSize}
                      color={isBlack ? "#fff" : "#333"}
                      strokeWidth={1.75}
                    />
                  </div>

                  {config.showLabels && (
                    <span
                      className="absolute whitespace-nowrap font-bold uppercase tracking-[0.8px] text-[#555]"
                      style={{
                        top: "calc(100% + 6px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: config.labelSize,
                      }}
                    >
                      {planet.name}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

        {/* Half sun */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-[5] -translate-x-1/2"
          style={{ width: sun.glow, height: sun.glow / 2 }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: sun.glow, height: sun.glow / 2 }}
          >
            <div
              className="absolute left-0 top-0 rounded-full bg-[#efefed]"
              style={{
                width: sun.glow,
                height: sun.glow,
                border: "1px solid #e4e4e0",
              }}
            />
            <SunHalfCenter
              innerSize={sun.inner}
              iconSize={sun.icon}
              top={sun.glow / 2 - sun.inner / 2}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
