"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  Search,
  Pen,
  Code2,
  CheckCircle,
  Rocket,
  Headphones,
  Infinity,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

const BG = "#f5f5f3";
const DEFAULT_PLANET_SIZE = 56;
const DEFAULT_SUN_SIZE = 96;
const ORBIT_SCALE_BOOST = 1.14;

const ORBITS = [
  { id: "inner", r: 115, speed: 0.007 },
  { id: "middle", r: 235, speed: 0.004 },
  { id: "outer", r: 355, speed: 0.0025 },
];

const OUTER = ORBITS[ORBITS.length - 1];
/** Foreshorten Y to mimic a 3D ring viewed at an angle (lower = flatter / more depth) */
const ORBIT_FORESHORTEN = 0.34;
const ORBIT_SLANT_DEG = 18;
const ORBIT_SLANT = (ORBIT_SLANT_DEG * Math.PI) / 180;
const SUN_Z = 10;
const Z_ORBIT_BEHIND = 4;
const Z_ORBIT_FRONT = 15;
const Z_BEHIND = 5;
const Z_FRONT = 20;
const Z_HOVER = 30;

function getOrbitDepth(angle) {
  const sin = Math.sin(angle);
  return {
    behind: sin < 0,
    mix: (sin + 1) / 2,
  };
}

function orbitExtents(r, scale) {
  const ex = r * scale;
  const ey = r * scale * ORBIT_FORESHORTEN;
  const cos = Math.cos(ORBIT_SLANT);
  const sin = Math.sin(ORBIT_SLANT);

  return {
    halfW: Math.hypot(ex * cos, ey * sin),
    halfH: Math.hypot(ex * sin, ey * cos),
  };
}

/** 3D ring: circular path foreshortened on Y, then tilted in the screen plane */
function orbitXY(cx, cy, r, angle, scale) {
  const ex = r * scale * Math.cos(angle);
  const ey = r * scale * Math.sin(angle) * ORBIT_FORESHORTEN;
  const cos = Math.cos(ORBIT_SLANT);
  const sin = Math.sin(ORBIT_SLANT);

  return {
    x: cx + ex * cos + ey * sin,
    y: cy - ex * sin + ey * cos,
  };
}

function getVisualConfig(width) {
  if (width < 380) {
    return { planetSize: 40, sunSize: 68, iconSize: 16, labelSize: 8, systemPad: 8 };
  }
  if (width < 640) {
    return { planetSize: 44, sunSize: 72, iconSize: 17, labelSize: 8, systemPad: 10 };
  }
  if (width < 768) {
    return { planetSize: 48, sunSize: 80, iconSize: 18, labelSize: 8, systemPad: 10 };
  }
  if (width < 1024) {
    return { planetSize: 52, sunSize: 88, iconSize: 19, labelSize: 9, systemPad: 11 };
  }
  if (width < 1536) {
    return {
      planetSize: DEFAULT_PLANET_SIZE,
      sunSize: DEFAULT_SUN_SIZE,
      iconSize: 20,
      labelSize: 9,
      systemPad: 12,
    };
  }
  return { planetSize: 58, sunSize: 104, iconSize: 22, labelSize: 10, systemPad: 12 };
}

function getOrbitScale(width, height, visual) {
  if (!width || !height) return 1;

  const planetHalf = visual.planetSize / 2;
  const labelSpace = Math.max(10, Math.round(visual.planetSize * 0.25));
  const { halfW, halfH } = orbitExtents(OUTER.r, 1);
  const scaleX = (width / 2 - visual.systemPad - planetHalf) / halfW;
  const scaleY =
    (height / 2 - visual.systemPad - planetHalf - labelSpace) / halfH;

  const fit = Math.min(scaleX, scaleY);
  let maxScale =
    width >= 2200 ? 1.42 : width >= 1920 ? 1.32 : width >= 1536 ? 1.18 : 1.08;

  if (height < 860) maxScale = Math.min(maxScale, 0.96);
  if (height < 760) maxScale = Math.min(maxScale, 0.88);

  const boost =
    height < 860 && width >= 1024 ? ORBIT_SCALE_BOOST * 0.9 : ORBIT_SCALE_BOOST;

  return Math.min(fit, maxScale) * boost;
}

function buildOrbitArcPath(
  cx,
  cy,
  r,
  scale,
  startAngle,
  endAngle,
  steps = 72,
) {
  const parts = [];

  for (let i = 0; i <= steps; i++) {
    const angle = startAngle + ((endAngle - startAngle) * i) / steps;
    const { x, y } = orbitXY(cx, cy, r, angle, scale);
    parts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  return parts.join(" ");
}

const sunShellStyle = {
  border: "1px solid #e0e0e0",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
};

const INFINITY_RATIO = 0.56;

function SunCenter({ size = DEFAULT_SUN_SIZE }) {
  const ref = useRef(null);
  const infinitySize = Math.round(size * INFINITY_RATIO);

  useGSAP(
    () => {
      const path = ref.current?.querySelector("path");
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

      return () => {
        gsap.ticker.remove(tick);
        path.style.willChange = "";
      };
    },
    { scope: ref, dependencies: [size] },
  );

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center rounded-full bg-white"
      style={{ width: size, height: size, ...sunShellStyle }}
      aria-hidden
    >
      <Infinity
        className="text-[#111]"
        size={infinitySize}
        strokeWidth={1.75}
      />
    </div>
  );
}

const PLANETS = [
  {
    orbitId: "inner",
    name: "DISCOVER",
    desc: "Understanding your goals & audience",
    icon: Search,
    startAngle: 0,
    phase: "action",
  },
  {
    orbitId: "inner",
    name: "DESIGN",
    desc: "Wireframes, UI & brand alignment",
    icon: Pen,
    startAngle: Math.PI,
    phase: "action",
  },
  {
    orbitId: "middle",
    name: "DEVELOP",
    desc: "Clean code, fast & scalable builds",
    icon: Code2,
    startAngle: Math.PI / 4,
    phase: "action",
  },
  {
    orbitId: "middle",
    name: "TEST",
    desc: "QA, cross-device & performance checks",
    icon: CheckCircle,
    startAngle: Math.PI + Math.PI / 4,
    phase: "outcome",
  },
  {
    orbitId: "outer",
    name: "LAUNCH",
    desc: "Deployment, domains & go-live",
    icon: Rocket,
    startAngle: Math.PI / 6,
    phase: "outcome",
  },
  {
    orbitId: "outer",
    name: "SUPPORT",
    desc: "Retainers, updates & ongoing care",
    icon: Headphones,
    startAngle: Math.PI + Math.PI / 6,
    phase: "outcome",
  },
];

export default function HeroSolar() {
  const rootRef = useRef(null);
  const systemRef = useRef(null);
  const planetRefs = useRef([]);

  const anglesRef = useRef(PLANETS.map((p) => p.startAngle));
  const pausedRef = useRef(Array.from({ length: PLANETS.length }, () => false));
  const layoutRef = useRef({
    w: 0,
    h: 0,
    cx: 0,
    cy: 0,
    scale: 1,
    ...getVisualConfig(
      typeof window !== "undefined" ? window.innerWidth : 1024,
    ),
  });

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [layout, setLayout] = useState({
    w: 0,
    h: 0,
    cx: 0,
    cy: 0,
    scale: 1,
    planetSize: DEFAULT_PLANET_SIZE,
    sunSize: DEFAULT_SUN_SIZE,
    iconSize: 20,
    labelSize: 9,
    systemPad: 12,
  });

  const orbitById = useMemo(() => {
    return new Map(ORBITS.map((o) => [o.id, o]));
  }, []);

  const positionPlanet = (idx, layoutState) => {
    const el = planetRefs.current[idx];
    if (!el) return;

    const planet = PLANETS[idx];
    const orbit = orbitById.get(planet.orbitId);
    if (!orbit) return;

    const angle = anglesRef.current[idx];
    const scale = layoutState.scale ?? 1;
    const { x, y } = orbitXY(
      layoutState.cx,
      layoutState.cy,
      orbit.r,
      angle,
      scale,
    );
    const { behind, mix } = getOrbitDepth(angle);
    const hovered = pausedRef.current[idx];

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = "translate(-50%, -50%)";
    el.style.zIndex = String(hovered ? Z_HOVER : behind ? Z_BEHIND : Z_FRONT);

    const circle = el.querySelector("[data-planet-circle]");
    const label = el.querySelector("[data-planet-label]");

    if (circle) {
      const depthScale = hovered ? 1 : 0.68 + mix * 0.32;
      circle.style.opacity = hovered ? "1" : String(0.5 + mix * 0.5);
      circle.style.filter = hovered || !behind ? "none" : "blur(0.4px)";
      circle.style.transform = hovered
        ? "scale(1.15)"
        : `scale(${depthScale})`;
    }

    if (label) {
      label.style.opacity = hovered ? "1" : String(0.45 + mix * 0.55);
      label.style.top = `${(layoutState.planetSize ?? DEFAULT_PLANET_SIZE) + 6}px`;
    }
  };

  const positionAllPlanets = (layoutState) => {
    for (let i = 0; i < PLANETS.length; i++) {
      positionPlanet(i, layoutState);
    }
  };

  const measureSystem = () => {
    const system = systemRef.current;
    if (!system) return null;

    const w = system.clientWidth;
    const h = system.clientHeight;
    if (!w || !h) return null;

    const visual = getVisualConfig(w);
    const next = {
      w,
      h,
      cx: w / 2,
      cy: h / 2,
      scale: getOrbitScale(w, h, visual),
      ...visual,
    };

    layoutRef.current = next;
    setLayout(next);
    positionAllPlanets(next);
    return next;
  };

  useGSAP(
    () => {
      const system = systemRef.current;
      const root = rootRef.current;
      if (!system) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const sync = () => {
        requestAnimationFrame(() => measureSystem());
      };

      sync();

      const resizeObserver = new ResizeObserver(sync);
      resizeObserver.observe(system);
      if (root) resizeObserver.observe(root);

      const onOrientation = () => sync();
      window.addEventListener("orientationchange", onOrientation);
      window.addEventListener("resize", onOrientation);

      if (prefersReducedMotion) {
        return () => {
          resizeObserver.disconnect();
          window.removeEventListener("orientationchange", onOrientation);
          window.removeEventListener("resize", onOrientation);
        };
      }

      const tick = () => {
        const layoutState = layoutRef.current;
        if (!layoutState.h) return;

        for (let i = 0; i < PLANETS.length; i++) {
          const orbit = orbitById.get(PLANETS[i].orbitId);
          if (!orbit) continue;

          if (!pausedRef.current[i]) {
            anglesRef.current[i] += orbit.speed;
          }

          positionPlanet(i, layoutState);
        }
      };

      gsap.ticker.add(tick);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("orientationchange", onOrientation);
        window.removeEventListener("resize", onOrientation);
        gsap.ticker.remove(tick);
      };
    },
    { scope: rootRef },
  );

  useLayoutEffect(() => {
    measureSystem();
    const raf = requestAnimationFrame(() => measureSystem());
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleEnter = (idx) => {
    pausedRef.current[idx] = true;
    setHoveredIdx(idx);
    positionPlanet(idx, layoutRef.current);
  };

  const handleLeave = (idx) => {
    pausedRef.current[idx] = false;
    setHoveredIdx((current) => (current === idx ? null : current));
    positionPlanet(idx, layoutRef.current);
  };

  const handleTouchStart = (idx) => {
    handleEnter(idx);
  };

  const handleTouchEnd = (idx) => {
    handleLeave(idx);
  };

  return (
    <section
      ref={rootRef}
      className="w-full min-h-[100svh]"
      style={{ background: BG }}
    >
      <div className="site-container w-full min-h-[100svh] flex flex-col gap-6 sm:gap-8 [@media(min-width:1024px)_and_(min-height:820px)]:flex-row [@media(min-width:1024px)_and_(min-height:820px)]:items-stretch [@media(min-width:1024px)_and_(min-height:820px)]:gap-8 xl:gap-12 2xl:gap-16 3xl:gap-20">
        {/* Left — content */}
        <div className="w-full [@media(min-width:1024px)_and_(min-height:820px)]:w-[42%] xl:w-[38%] 2xl:w-[36%] shrink-0 flex flex-col items-center [@media(min-width:1024px)_and_(min-height:820px)]:items-start text-center [@media(min-width:1024px)_and_(min-height:820px)]:text-left justify-center pt-20 pb-6 sm:pt-24 sm:pb-8 md:pb-10 [@media(min-width:1024px)_and_(min-height:820px)]:py-16 [@media(min-width:1024px)_and_(min-height:820px)]:min-h-[100svh]">
          <p className="text-[11px] sm:text-xs 2xl:text-sm font-medium uppercase tracking-[0.22em] text-[#888]">
            How we work
          </p>
          <h1 className="mt-4 sm:mt-5 text-[#111]">
            <span className="block text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-extrabold tracking-tight leading-tight text-balance">
              We design and build
            </span>
            <span className="mt-2 block text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-normal text-[#555] tracking-tight leading-tight text-balance">
              from first conversation to launch
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base 2xl:text-lg text-[#666] leading-relaxed max-w-md 2xl:max-w-lg">
            Six clear steps — three action phases, then three outcomes.{" "}
            <span className="[@media(min-width:1024px)_and_(min-height:820px)]:hidden">Tap a step below to learn more.</span>
            <span className="hidden [@media(min-width:1024px)_and_(min-height:820px)]:inline">
              Hover any step on desktop to see what happens at each stage.
            </span>
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center [@media(min-width:1024px)_and_(min-height:820px)]:justify-start w-full">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#111] px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              Start a project
            </a>
            <a
              href="/work"
              className="inline-flex items-center justify-center rounded-xl border border-[#ddd] bg-white px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium text-[#444] transition hover:bg-white/90"
            >
              View work
            </a>
          </div>
        </div>

        {/* Solar system — all breakpoints */}
        <div
          ref={systemRef}
          className="relative w-full flex-1 min-h-[min(52svh,380px)] sm:min-h-[min(54svh,420px)] md:min-h-[min(56svh,460px)] [@media(min-width:1024px)_and_(min-height:820px)]:min-h-0 [@media(min-width:1024px)_and_(min-height:820px)]:h-full [@media(min-width:1024px)_and_(min-height:820px)]:min-h-[100svh] overflow-visible touch-pan-y"
        >
          {layout.w > 0 && layout.h > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: Z_ORBIT_BEHIND }}
              width={layout.w}
              height={layout.h}
              viewBox={`0 0 ${layout.w} ${layout.h}`}
              aria-hidden
            >
              {ORBITS.map((o) => (
                <path
                  key={`${o.id}-back`}
                  d={buildOrbitArcPath(
                    layout.cx,
                    layout.cy,
                    o.r,
                    layout.scale,
                    Math.PI,
                    Math.PI * 2,
                  )}
                  fill="none"
                  stroke="#b5b5b5"
                  strokeWidth="1"
                  strokeDasharray="5 6"
                />
              ))}
            </svg>
          )}

          {layout.w > 0 && layout.h > 0 && (
            <div
              className="absolute"
              style={{
                left: layout.cx,
                top: layout.cy,
                transform: "translate(-50%, -50%)",
                width: layout.sunSize,
                height: layout.sunSize,
                zIndex: SUN_Z,
              }}
            >
              <SunCenter size={layout.sunSize} />
            </div>
          )}

          {layout.w > 0 && layout.h > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: Z_ORBIT_FRONT }}
              width={layout.w}
              height={layout.h}
              viewBox={`0 0 ${layout.w} ${layout.h}`}
              aria-hidden
            >
              {ORBITS.map((o) => (
                <path
                  key={`${o.id}-front`}
                  d={buildOrbitArcPath(
                    layout.cx,
                    layout.cy,
                    o.r,
                    layout.scale,
                    0,
                    Math.PI,
                  )}
                  fill="none"
                  stroke="#b5b5b5"
                  strokeWidth="1"
                  strokeDasharray="5 6"
                />
              ))}
            </svg>
          )}

          {PLANETS.map((p, idx) => {
            const isAction = p.phase === "action";
            const isHovered = hoveredIdx === idx;
            const Icon = p.icon;
            const planetSize = layout.planetSize ?? DEFAULT_PLANET_SIZE;
            const iconSize = layout.iconSize ?? 20;
            const labelSize = layout.labelSize ?? 9;

            return (
              <div
                key={p.name}
                ref={(el) => {
                  planetRefs.current[idx] = el;
                }}
                className="absolute will-change-[left,top] touch-manipulation"
                onMouseEnter={() => handleEnter(idx)}
                onMouseLeave={() => handleLeave(idx)}
                onTouchStart={() => handleTouchStart(idx)}
                onTouchEnd={() => handleTouchEnd(idx)}
                onTouchCancel={() => handleTouchEnd(idx)}
                aria-label={p.name}
              >
                <div
                  className="absolute left-1/2 bottom-full pointer-events-none"
                  style={{
                    marginBottom: 10,
                    width: 200,
                    opacity: isHovered ? 1 : 0,
                    transform: `translate(-50%, ${isHovered ? 0 : 6}px)`,
                    transition: "opacity 200ms ease, transform 200ms ease",
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      background: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: 8,
                      padding: "8px 12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#111",
                        lineHeight: 1.2,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        marginTop: 2,
                        fontSize: 11,
                        color: "#888",
                        lineHeight: 1.3,
                      }}
                    >
                      {p.desc}
                    </div>
                    <div
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{
                        bottom: -6,
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "6px solid #e0e0e0",
                      }}
                    />
                    <div
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{
                        bottom: -5,
                        width: 0,
                        height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid #fff",
                      }}
                    />
                  </div>
                </div>

                <div
                  data-planet-circle
                  className="relative flex items-center justify-center rounded-full transition-[transform,opacity,filter] duration-200 ease-out"
                  style={{
                    width: planetSize,
                    height: planetSize,
                    background: isAction ? "#111" : "#fff",
                    border: isAction ? "none" : "1px solid #ddd",
                    boxShadow: isAction
                      ? "0 8px 20px rgba(0,0,0,0.15)"
                      : "0 2px 8px rgba(0,0,0,0.06)",
                    color: isAction ? "#fff" : "#333",
                  }}
                >
                  <Icon size={iconSize} strokeWidth={1.75} aria-hidden />
                </div>

                <span
                  data-planet-label
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-200"
                  style={{
                    top: planetSize + 6,
                    fontSize: labelSize,
                    fontWeight: 600,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    color: isAction ? "#111" : "#555",
                    lineHeight: 1,
                  }}
                >
                  {p.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
