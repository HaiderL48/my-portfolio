"use client";

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-gradient-shift absolute -top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.88_0.02_250/0.45),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_center,oklch(0.35_0.06_280/0.35),transparent_55%)]" />
      <div className="hero-blob hero-blob-a absolute top-[12%] -left-[8%] h-[420px] w-[420px] rounded-full bg-primary/[0.06] blur-3xl dark:bg-primary/[0.12]" />
      <div className="hero-blob hero-blob-b absolute bottom-[8%] -right-[6%] h-[380px] w-[380px] rounded-full bg-foreground/[0.04] blur-3xl dark:bg-foreground/[0.08]" />
      <div className="hero-blob hero-blob-c absolute top-[45%] right-[15%] h-[200px] w-[200px] rounded-full bg-primary/[0.05] blur-2xl" />

      <div
        className="absolute inset-0 opacity-[0.22] dark:opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 30%, black 15%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
    </div>
  );
}
