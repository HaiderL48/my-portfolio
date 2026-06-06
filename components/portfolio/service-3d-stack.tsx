"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./service-3d-stack.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PLATES = [
  {
    title: "Your Team",
    subtitle: "Defines priorities, direction, and goals.",
  },
  {
    title: "Production",
    subtitle:
      "Runtime systems, infrastructure, code execution, and everything around them.",
  },
] as const;

// Final 3D pose the plate boxes animate into as you scroll.
const FINAL = {
  rotateX: -20,
  rotateY: 24,
  separation: 150,
};

function CornerMarks() {
  return (
    <>
      <span className="service-3d-stack__corner service-3d-stack__corner--tl" />
      <span className="service-3d-stack__corner service-3d-stack__corner--tr" />
      <span className="service-3d-stack__corner service-3d-stack__corner--bl" />
      <span className="service-3d-stack__corner service-3d-stack__corner--br" />
    </>
  );
}

export default function Service3DStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  // position:sticky needs ancestors without overflow:hidden on the cross axis.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflowX;
    const prevBody = body.style.overflowX;

    html.style.overflowX = "visible";
    body.style.overflowX = "visible";
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      html.style.overflowX = prevHtml;
      body.style.overflowX = prevBody;
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }, []);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const scroll = root.querySelector<HTMLElement>(
        ".service-3d-stack__scroll",
      );
      const plates = gsap.utils.toArray<HTMLElement>(
        ".service-3d-stack__plate",
        root,
      );
      const boxes = gsap.utils.toArray<HTMLElement>(
        ".service-3d-stack__box",
        root,
      );

      if (!scroll || plates.length !== 2 || boxes.length !== 2) return;

      const apply = (p: number) => {
        boxes.forEach((box) => {
          gsap.set(box, {
            rotateX: p * FINAL.rotateX,
            rotateY: p * FINAL.rotateY,
          });
        });
        plates.forEach((plate, i) => {
          const dir = i === 0 ? -1 : 1;
          gsap.set(plate, {
            y: dir * p * FINAL.separation,
          });
        });
      };

      apply(0);

      const trigger = ScrollTrigger.create({
        trigger: scroll,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => apply(self.progress),
      });

      const onResize = () => ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        trigger.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="service-3d-stack">
      <div className="service-3d-stack__scroll">
        <div className="service-3d-stack__scene">
          <div className="service-3d-stack__inner">
            <aside className="service-3d-stack__vision">
              <div className="service-3d-stack__vision-label">The Vision</div>
              <h2 className="service-3d-stack__vision-title">
                Production should run itself.
              </h2>
              <p className="service-3d-stack__vision-body">
                Production is too complex to run manually. Engineers should set
                direction, ship product, and approve important changes. The rest
                should be handled autonomously.
              </p>
            </aside>

            <div className="service-3d-stack__plates">
              {PLATES.map((plate) => (
                <div key={plate.title} className="service-3d-stack__plate">
                  <div className="service-3d-stack__box">
                    <div className="service-3d-stack__face service-3d-stack__face--front">
                      <CornerMarks />
                      <h3 className="service-3d-stack__plate-title">
                        {plate.title}
                      </h3>
                      <p className="service-3d-stack__plate-sub">
                        {plate.subtitle}
                      </p>
                    </div>
                    <div className="service-3d-stack__face service-3d-stack__face--top" />
                    <div className="service-3d-stack__face service-3d-stack__face--right" />
                    <div className="service-3d-stack__face service-3d-stack__face--back" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
