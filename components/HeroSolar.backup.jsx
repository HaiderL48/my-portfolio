"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  Search,
  Paintbrush,
  Code2,
  ClipboardCheck,
  Rocket,
  LifeBuoy,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

const BG = "#f5f5f3";

const ORBITS = [
  { id: "inner", rx: 90, ry: 42, speed: 0.008, count: 2 },
  { id: "middle", rx: 178, ry: 96, speed: 0.005, count: 2 },
  { id: "outer", rx: 266, ry: 150, speed: 0.003, count: 2 },
];

const OUTER_ORBIT = ORBITS[ORBITS.length - 1];
const SYSTEM_PAD = 52;

const PLANETS = [
  {
    orbitId: "inner",
    name: "Discover",
    desc: "Goals, scope, and success metrics before design or code.",
    icon: Search,
    size: 44,
    theme: "light",
  },
  {
    orbitId: "inner",
    name: "Design",
    desc: "Figma UI/UX, wireframes, and prototypes when the product needs it.",
    icon: Paintbrush,
    size: 44,
    theme: "light",
  },
  {
    orbitId: "middle",
    name: "Develop",
    desc: "Build in Flutter, React, WordPress, Shopify, or your chosen stack.",
    icon: Code2,
    size: 44,
    theme: "light",
  },
  {
    orbitId: "middle",
    name: "Test",
    desc: "QA across devices, performance checks, and polish before go-live.",
    icon: ClipboardCheck,
    size: 44,
    theme: "dark",
  },
  {
    orbitId: "outer",
    name: "Launch",
    desc: "Deploy, handoff, and documentation so you stay in control.",
    icon: Rocket,
    size: 44,
    theme: "dark",
  },
  {
    orbitId: "outer",
    name: "Support",
    desc: "Retainers, updates, and quick responses after launch.",
    icon: LifeBuoy,
    size: 44,
    theme: "light",
  },
];

function initialAngles() {
  const orbitAngles = {
    inner: [0, Math.PI],
    middle: [Math.PI / 3, (4 * Math.PI) / 3],
    outer: [(2 * Math.PI) / 3, (5 * Math.PI) / 3],
  };

  const indices = { inner: 0, middle: 0, outer: 0 };

  return PLANETS.map((p) => {
    const list = orbitAngles[p.orbitId];
    const idx = indices[p.orbitId]++;
    return list[idx] ?? 0;
  });
}

function getOrbitScale(width, height) {
  if (!width || !height) return 1;
  const scaleX = (width - SYSTEM_PAD) / (OUTER_ORBIT.rx * 2);
  const scaleY = (height - SYSTEM_PAD) / (OUTER_ORBIT.ry * 2);
  return Math.min(scaleX, scaleY);
}

function getSystemLayout(width, height) {
  const scale = getOrbitScale(width, height);
  return {
    w: width,
    h: height,
    scale,
    cx: width / 2,
    cy: height / 2,
  };
}

export default function HeroSolar() {
  const rootRef = useRef(null);
  const systemRef = useRef(null);
  const planetRefs = useRef([]);
  const layoutRef = useRef({ w: 0, h: 0, scale: 1, cx: 0, cy: 0 });

  const anglesRef = useRef(initialAngles());
  const pausedRef = useRef(Array.from({ length: PLANETS.length }, () => false));

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [layout, setLayout] = useState({
    w: 0,
    h: 0,
    scale: 1,
    cx: 0,
    cy: 0,
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
    const x = layoutState.cx + orbit.rx * layoutState.scale * Math.cos(angle);
    const y = layoutState.cy + orbit.ry * layoutState.scale * Math.sin(angle);
    const half = planet.size / 2;

    el.style.transform = `translate(${x - half}px, ${y - half}px)`;
  };

  const positionAllPlanets = (layoutState) => {
    for (let i = 0; i < PLANETS.length; i++) {
      positionPlanet(i, layoutState);
    }
  };

  const measureSystem = () => {
    const system = systemRef.current;
    if (!system) return null;

    const next = getSystemLayout(system.clientWidth, system.clientHeight);
    layoutRef.current = next;
    setLayout(next);
    positionAllPlanets(next);
    return next;
  };

  useGSAP(
    () => {
      const system = systemRef.current;
      if (!system) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      measureSystem();

      if (prefersReducedMotion) return;

      const tick = () => {
        const layoutState = layoutRef.current;
        if (!layoutState.w || !layoutState.h) return;

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

      const resizeObserver = new ResizeObserver(() => {
        measureSystem();
      });
      resizeObserver.observe(system);

      return () => {
        resizeObserver.disconnect();
        gsap.ticker.remove(tick);
      };
    },
    { scope: rootRef },
  );

  const handleEnter = (idx) => {
    pausedRef.current[idx] = true;
    setHoveredIdx(idx);
  };

  const handleLeave = (idx) => {
    pausedRef.current[idx] = false;
    setHoveredIdx((current) => (current === idx ? null : current));
  };

  return (
    <section
      ref={rootRef}
      className="w-full min-h-[100svh] flex flex-col lg:flex-row lg:items-center overflow-hidden"
      style={{ background: BG }}
    >
      {/* Left: content */}
      <div className="w-full lg:w-[42%] xl:w-[38%] shrink-0 px-4 sm:px-6 md:px-8 lg:pl-10 xl:pl-14 lg:pr-4 pt-24 md:pt-28 lg:py-16 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
        <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-foreground/50">
          How we work
        </p>
        <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl font-semibold leading-[1.15] tracking-tight text-balance text-foreground">
          We design and build
          <span className="block text-foreground/65 font-normal text-xl sm:text-2xl lg:text-[1.65rem] xl:text-[1.75rem] mt-2">
            from first conversation to launch
          </span>
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/60 leading-relaxed max-w-md">
          Six steps orbit our process — hover an icon to see what happens at
          each stage of working together.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-foreground px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium text-background shadow-sm transition hover:opacity-90"
          >
            Start a project
          </a>
          <a
            href="/work"
            className="inline-flex items-center justify-center rounded-xl border border-[#d8d8d6] bg-white px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium text-foreground/75 transition hover:bg-white/90"
          >
            View work
          </a>
        </div>
      </div>

      {/* Right: solar system */}
      <div className="w-full lg:flex-1 flex items-center justify-center px-2 sm:px-4 lg:px-2 xl:px-6 pb-10 sm:pb-12 lg:py-10 min-h-[min(72vw,420px)] sm:min-h-[min(68vw,480px)] lg:min-h-[min(90svh,760px)]">
        <div className="relative w-full h-[min(72vw,420px)] sm:h-[min(68vw,480px)] lg:h-[min(85svh,720px)] max-w-[720px] lg:max-w-none">
          <div ref={systemRef} className="absolute inset-0 overflow-visible">
            {layout.w > 0 && layout.h > 0 && (
              <svg
                className="absolute inset-0 overflow-visible pointer-events-none"
                width={layout.w}
                height={layout.h}
                viewBox={`0 0 ${layout.w} ${layout.h}`}
                aria-hidden
              >
                {ORBITS.map((o) => (
                  <ellipse
                    key={o.id}
                    cx={layout.cx}
                    cy={layout.cy}
                    rx={o.rx * layout.scale}
                    ry={o.ry * layout.scale}
                    fill="none"
                    stroke="#a3a3a3"
                    strokeWidth="1.15"
                    strokeDasharray="5 6"
                  />
                ))}
              </svg>
            )}

            {/* Sun */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ width: 96, height: 96 }}
            >
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: 112,
                  height: 112,
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: 136,
                  height: 136,
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
              />

              <div
                className="relative w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center select-none transition-transform duration-200 hover:scale-[1.05] shadow-sm"
                style={{ border: "1px solid rgba(0,0,0,0.14)" }}
              >
                <div className="text-[13px] sm:text-[14px] font-bold tracking-[0.14em] text-foreground">
                  HAIDER
                </div>
                <div className="text-[9px] sm:text-[10px] font-medium tracking-[0.22em] text-foreground/55 -mt-0.5">
                  LIMDIWALA
                </div>
                <div className="text-[7px] sm:text-[8px] font-semibold tracking-[0.28em] text-foreground/45 mt-0.5">
                  IT SERVICES
                </div>
              </div>
            </div>

            {/* Planets */}
            {PLANETS.map((p, idx) => {
              const isDark = p.theme === "dark";
              const isHovered = hoveredIdx === idx;
              const Icon = p.icon;

              return (
                <div
                  key={`${p.orbitId}-${p.name}`}
                  ref={(el) => {
                    planetRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => handleEnter(idx)}
                  onMouseLeave={() => handleLeave(idx)}
                  aria-label={p.name}
                  className="absolute left-0 top-0 z-20"
                  style={{
                    width: p.size,
                    height: p.size,
                    borderRadius: 9999,
                    background: isDark ? "#111111" : "#ffffff",
                    border: isDark ? "1px solid #111111" : "1px solid #bdbdbd",
                    color: isDark ? "#ffffff" : "#111111",
                    display: "grid",
                    placeItems: "center",
                    cursor: "default",
                    userSelect: "none",
                    boxShadow: isDark
                      ? "0 10px 24px rgba(0,0,0,0.12)"
                      : "0 10px 22px rgba(0,0,0,0.08)",
                  }}
                >
                  <Icon size={20} strokeWidth={1.75} aria-hidden />

                  <div
                    className="absolute left-1/2 hidden sm:block"
                    style={{
                      bottom: p.size + 10,
                      width: 200,
                      opacity: isHovered ? 1 : 0,
                      transform: `translate(-50%, ${isHovered ? 0 : 6}px)`,
                      transition: "opacity 160ms ease, transform 160ms ease",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        background: "#ffffff",
                        border: "1px solid #e0e0e0",
                        borderRadius: 8,
                        padding: "8px 12px",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#111111",
                          lineHeight: 1.1,
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          marginTop: 2,
                          fontSize: 11,
                          color: "rgba(17,17,17,0.58)",
                          lineHeight: 1.2,
                        }}
                      >
                        {p.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
