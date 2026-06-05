"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  disciplineLabels,
  type PortfolioItem,
} from "@/lib/portfolio-data";

type WorksProjectCardProps = {
  project: PortfolioItem;
  className?: string;
  showFeaturedLabel?: boolean;
  dataReveal?: boolean;
};

export default function WorksProjectCard({
  project,
  className = "",
  showFeaturedLabel = false,
  dataReveal = false,
}: WorksProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      {...(dataReveal ? { "data-reveal-item": true } : {})}
      className={`works-project-card group block overflow-hidden hover:bg-accent/5 dark:hover:bg-white/5 transition-colors ${className}`.trim()}
    >
      <div className="relative aspect-[16/10] bg-muted overflow-hidden">
        <Image
          src={project.image}
          alt={project.groupTitle}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 78vw, 480px"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold border border-border">
          {disciplineLabels[project.discipline]}
        </span>
      </div>
      <div className="p-5 flex items-start justify-between gap-4">
        <div>
          {showFeaturedLabel ? (
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-1">
              Featured
            </p>
          ) : null}
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
            {project.groupTitle}
          </h3>
          <p className="mt-1 text-sm text-foreground/60 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
        <span className="shrink-0 flex size-10 items-center justify-center rounded-full border border-border bg-background group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-colors">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
