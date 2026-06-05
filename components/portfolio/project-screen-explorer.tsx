"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MockupType } from "@/lib/portfolio-data";
import type { ProjectScreen } from "@/lib/project-details-data";
import {
  getMockupDevice,
  getProjectFramePath,
  MOCKUP_FRAMES,
  type MockupDevice,
} from "@/lib/mockup-assets";

function CssFallbackFrame({
  device,
  image,
  alt,
  priority,
}: {
  device: MockupDevice;
  image: string;
  alt: string;
  priority?: boolean;
}) {
  if (device === "phone") {
    return (
      <div className="relative w-[220px] sm:w-[260px] md:w-[280px] mx-auto">
        <div
          className="relative rounded-[2.5rem] border-[10px] sm:border-[12px] border-foreground/90 shadow-2xl bg-foreground/90 overflow-hidden"
          style={{ aspectRatio: "9/19.5" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 sm:h-7 bg-foreground/90 rounded-b-2xl z-10" />
          <div className="relative w-full h-full bg-muted">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="280px"
              priority={priority}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-xl mx-auto shadow-2xl rounded-xl overflow-hidden border border-border bg-card">
      <div className="bg-muted px-4 py-3 border-b border-border flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/90" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
          <div className="w-3 h-3 rounded-full bg-green-500/90" />
        </div>
        <div className="flex-1 ml-2 h-7 rounded-md bg-background/80 border border-border" />
      </div>
      <div className="relative w-full aspect-[16/10] bg-muted">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 640px"
          priority={priority}
        />
      </div>
    </div>
  );
}

function StaticFrameMockup({
  device,
  projectSlug,
  image,
  alt,
  priority,
}: {
  device: MockupDevice;
  projectSlug: string;
  image: string;
  alt: string;
  priority?: boolean;
}) {
  const config = MOCKUP_FRAMES[device];
  const [frameSrc, setFrameSrc] = useState(getProjectFramePath(projectSlug));
  const [frameReady, setFrameReady] = useState(false);
  const [frameFailed, setFrameFailed] = useState(false);

  useEffect(() => {
    setFrameSrc(getProjectFramePath(projectSlug));
    setFrameReady(false);
    setFrameFailed(false);
  }, [projectSlug, device]);

  const tryGlobalFrame = () => {
    if (frameSrc !== config.src) {
      setFrameSrc(config.src);
      setFrameReady(false);
      return;
    }
    setFrameFailed(true);
  };

  if (frameFailed) {
    return (
      <CssFallbackFrame
        device={device}
        image={image}
        alt={alt}
        priority={priority}
      />
    );
  }

  const widthStyle =
    device === "phone"
      ? { width: config.width, maxWidth: "100%" }
      : { width: "100%", maxWidth: config.maxWidth };

  return (
    <div className="relative mx-auto" style={widthStyle}>
      <div
        className="relative w-full"
        style={{ aspectRatio: device === "phone" ? "9/19.5" : "16/11" }}
      >
        <div
          className="absolute z-0 overflow-hidden"
          style={{
            top: config.screenInset.top,
            left: config.screenInset.left,
            right: config.screenInset.right,
            bottom: config.screenInset.bottom,
            borderRadius: config.borderRadius,
          }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover object-top transition-opacity duration-300"
            sizes={device === "phone" ? "280px" : "640px"}
            priority={priority}
          />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameSrc}
          alt=""
          className={cn(
            "absolute inset-0 z-10 w-full h-full object-contain pointer-events-none transition-opacity duration-200",
            frameReady ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setFrameReady(true)}
          onError={tryGlobalFrame}
          aria-hidden
        />
      </div>
    </div>
  );
}

interface ProjectScreenExplorerProps {
  screens: ProjectScreen[];
  mockupType: MockupType;
  projectSlug: string;
  projectTitle: string;
}

export default function ProjectScreenExplorer({
  screens,
  mockupType,
  projectSlug,
  projectTitle,
}: ProjectScreenExplorerProps) {
  const [index, setIndex] = useState(0);
  const device = getMockupDevice(mockupType);
  const total = screens.length;
  const current = screens[index];
  const canPrev = index > 0;
  const canNext = index < total - 1;

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  if (!current) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="relative flex items-center justify-center gap-3 sm:gap-4 md:gap-6 min-h-[320px] sm:min-h-[380px]">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          aria-label="Previous screen"
          className={cn(
            "shrink-0 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-border bg-card shadow-md transition",
            canPrev
              ? "hover:bg-accent/10 text-foreground"
              : "opacity-30 cursor-not-allowed",
          )}
        >
          <ChevronLeft className="size-5 sm:size-6" />
        </button>

        <div className="flex-1 min-w-0 flex justify-center">
          <StaticFrameMockup
            device={device}
            projectSlug={projectSlug}
            image={current.image}
            alt={`${projectTitle} — ${current.title}`}
            priority={index === 0}
          />
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          aria-label="Next screen"
          className={cn(
            "shrink-0 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-border bg-card shadow-md transition",
            canNext
              ? "hover:bg-accent/10 text-foreground"
              : "opacity-30 cursor-not-allowed",
          )}
        >
          <ChevronRight className="size-5 sm:size-6" />
        </button>
      </div>

      <div className="space-y-6 lg:pl-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">
            Screen {index + 1} of {total}
          </span>
          <span className="h-1 flex-1 max-w-[120px] rounded-full bg-muted overflow-hidden">
            <span
              className="block h-full bg-primary transition-all duration-300"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </span>
        </div>

        <div key={current.title}>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            {current.title}
          </h3>
          <p className="mt-4 text-sm md:text-base text-foreground/60 leading-relaxed">
            {current.description}
          </p>
        </div>

        {total > 1 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {screens.map((screen, i) => (
              <button
                key={screen.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to ${screen.title}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-full border font-medium transition",
                  i === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/70 hover:bg-accent/10",
                )}
              >
                {screen.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
