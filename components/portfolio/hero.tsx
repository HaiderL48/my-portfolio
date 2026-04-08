"use client";

import { useEffect, useRef } from "react";
import React from "react";
import { gsap } from "gsap";
import { FaWix, FaWordpress } from "react-icons/fa";
import { IoLogoFigma } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import { BiLogoGoogleCloud } from "react-icons/bi";
import { SiZoho } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { FaFlutter } from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";
import { IoLogoAndroid } from "react-icons/io";

interface HeroProps {
  isLoading: boolean;
}

type MarqueeItem = {
  label: string;
  icon: React.ReactElement;
};

const marqueeItems: MarqueeItem[] = [
  { label: "Flutter", icon: <FaFlutter /> },
  { label: "Next.js", icon: <RiNextjsFill /> },
  { label: "Shopify", icon: <FaShopify /> },
  { label: "Android", icon: <IoLogoAndroid /> },
  { label: "WordPress", icon: <FaWordpress /> },
  { label: "Wix", icon: <FaWix /> },
  { label: "Firebase", icon: <IoLogoFirebase /> },
  { label: "Figma", icon: <IoLogoFigma /> },
  { label: "Google Cloud", icon: <BiLogoGoogleCloud /> },
  { label: "Zoho", icon: <SiZoho /> },
];

export default function Hero({ isLoading }: HeroProps) {
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
        duration: 24,
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
    <section className="min-h-screen bg-background border-b border-border/50 pt-24 pb-16 md:py-24 flex items-center flex-col justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center flex-col justify-center">
        <div className="space-y-6">
          {isLoading ? (
            <>
              <div className="h-16 bg-muted animate-shimmer rounded-lg w-3/4" />
              <div className="h-8 bg-muted animate-shimmer rounded-lg w-full" />
              <div className="h-8 bg-muted animate-shimmer rounded-lg w-5/6" />
            </>
          ) : (
            <>
              <div className="space-y-4 animate-fade-in-up flex flex-col items-center justify-center max-w-5xl  mx-auto">
                {/* The "Intro" - Smaller, uppercase, and wider tracking for a modern feel */}
                {/* Top Label */}
                {/* <p className="text-md uppercase text-foreground mb-4">
                  Hi! I'm Haider Limdiwala
                </p> */}

                {/* The Big Header */}
                <h1 className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-[1.3] text-center tracking-tighter">
                  Your Partner for <br /> Custom Web & App Development.
                </h1>

                {/* The Description */}
                <p className="mt-0 text-[13px] sm:text-[14px] min-[1440px]:text-[16px] leading-relaxed text-foreground/60 text-center max-[991px]:[&>br]:hidden max-w-lg md:max-w-xl lg:max-w-2xl">
                  Specialized in creating seamless digital experiences across
                  Shopify, WordPress, and Wix. From intuitive UI/UX design to
                  robust mobile app development, I provide end-to-end technical
                  expertise to help brands stand out and sell more online.
                </p>
                <div className="flex justify-center pt-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                  >
                    Hire an Expert
                  </a>
                </div>

                <div className="mt-10 marquee-container overflow-hidden ">
                  <div className="marquee w-sm sm:w-xl md:w-2xl lg:w-4xl ">
                    <div className="marquee-track flex gap-5" ref={trackRef}>
                      {[...marqueeItems, ...marqueeItems].map((item, index) => (
                        <div key={`${item.label}-${index}`} className="p-2 md:p-3 lg:p-4 rounded-xl bg-accent-foreground dark:bg-accent text-2xl md:text-2xl lg:text-3xl">
                          {item.icon}
                          {/* <span>{item.label}</span> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
