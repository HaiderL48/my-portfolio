import type { ComponentType } from "react";
import {
  Briefcase,
  Calendar,
  Layers,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectDetailContent } from "@/lib/project-details-data";

export type ProjectMetaVariant = "cards" | "strip" | "stats";

export interface ProjectMetaItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

export function buildProjectMetaItems(
  meta: ProjectDetailContent["meta"],
  role: string,
): ProjectMetaItem[] {
  return [
    { label: "Timeline", value: meta.timeline, icon: Calendar },
    { label: "Platform", value: meta.platform, icon: Layers },
    ...(meta.industry
      ? [{ label: "Industry", value: meta.industry, icon: Briefcase }]
      : []),
    { label: "My role", value: role, icon: UserRound },
  ];
}

function MetaSectionHeader({ className }: { className?: string }) {
  return (
    <div className={cn("mb-8 md:mb-10", className)}>
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
        Snapshot
      </p>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-balance">
        Project at a glance
      </h2>
    </div>
  );
}

function MetaCards({ items }: { items: ProjectMetaItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-card p-4 md:p-5"
          >
            <div className="flex items-center gap-2 text-foreground/50">
              <Icon className="size-3.5 shrink-0" strokeWidth={2} />
              <p className="text-[10px] font-bold uppercase tracking-wider">
                {item.label}
              </p>
            </div>
            <p className="mt-2 text-sm md:text-base font-semibold leading-snug">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function MetaStrip({ items }: { items: ProjectMetaItem[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-start gap-3 px-5 py-4 md:px-6 md:py-5"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold leading-snug">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetaStats({ items }: { items: ProjectMetaItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="text-center lg:text-left">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-lg md:text-xl font-bold tracking-tight leading-snug">
              {item.value}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-foreground/50">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

const variantComponents: Record<
  ProjectMetaVariant,
  ComponentType<{ items: ProjectMetaItem[] }>
> = {
  cards: MetaCards,
  strip: MetaStrip,
  stats: MetaStats,
};

export default function ProjectMetaSection({
  meta,
  role,
  variant = "cards",
  className,
}: {
  meta: ProjectDetailContent["meta"];
  role: string;
  variant?: ProjectMetaVariant;
  className?: string;
}) {
  const items = buildProjectMetaItems(meta, role);
  const Content = variantComponents[variant];

  return (
    <section
      className={cn(
        "py-10 md:py-14 border-b border-border/50",
        variant === "stats" ? "bg-background" : "bg-muted/20",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <MetaSectionHeader />
        <Content items={items} />
      </div>
    </section>
  );
}

/** @deprecated Use ProjectMetaSection — kept for imports that only need the grid */
export function ProjectMetaStrip({
  meta,
  role,
}: {
  meta: ProjectDetailContent["meta"];
  role: string;
}) {
  return <MetaCards items={buildProjectMetaItems(meta, role)} />;
}
