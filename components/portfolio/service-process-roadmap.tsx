import { cn } from "@/lib/utils";

export interface ProcessStep {
  step: string;
  description: string;
}

interface ServiceProcessRoadmapProps {
  steps: ProcessStep[];
}

export default function ServiceProcessRoadmap({
  steps,
}: ServiceProcessRoadmapProps) {
  const lastIndex = steps.length - 1;
  const lineInset = `${100 / (steps.length * 2)}%`;

  return (
    <div className="w-full">
      {/* Mobile: vertical roadmap */}
      <ol className="md:hidden space-y-0" aria-label="Project roadmap">
        {steps.map((phase, index) => (
          <li
            key={phase.step}
            className={cn("relative flex gap-4", index < lastIndex && "pb-10")}
          >
            {index < lastIndex && (
              <span
                className="absolute left-[1.125rem] top-10 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-border"
                aria-hidden
              />
            )}
            <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card text-sm font-bold text-primary shadow-sm">
              {index + 1}
            </div>
            <div className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                Phase {index + 1}
                {index === 0 && (
                  <span className="ml-2 normal-case text-primary">· Start</span>
                )}
                {index === lastIndex && (
                  <span className="ml-2 normal-case text-primary">· Launch</span>
                )}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{phase.step}</h3>
              <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                {phase.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop: horizontal roadmap */}
      <div
        className="hidden md:block rounded-2xl border border-border bg-card/50 p-8 lg:p-10"
        aria-label="Project roadmap"
      >
        <div
          className="relative grid gap-6 lg:gap-8"
          style={{
            gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
          }}
        >
          {steps.length > 1 && (
            <div
              className="pointer-events-none absolute top-6 h-0.5 bg-gradient-to-r from-primary/30 via-border to-primary/30"
              style={{ left: lineInset, right: lineInset }}
              aria-hidden
            />
          )}

          {steps.map((phase, index) => (
            <div
              key={phase.step}
              className="relative flex flex-col items-center"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary shadow-sm ring-4 ring-card/50">
                {index + 1}
              </div>

              <div className="mt-6 w-full rounded-xl border border-border bg-card p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                  Phase {index + 1}
                  {index === 0 && (
                    <span className="ml-2 normal-case text-primary">· Start</span>
                  )}
                  {index === lastIndex && (
                    <span className="ml-2 normal-case text-primary">· Launch</span>
                  )}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{phase.step}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-foreground/50">
          <span className="text-primary">Kickoff</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/40 via-border to-primary/40" />
          <span className="text-primary">Go live</span>
        </div>
      </div>
    </div>
  );
}
