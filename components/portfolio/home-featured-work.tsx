"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  categories,
  disciplineLabels,
  portfolioItems,
  type Category,
} from "@/lib/portfolio-data";
import { TechBadgeList } from "@/components/portfolio/tech-badge";

const filterOptions: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  ...categories.map((c) => ({ value: c.value, label: c.label })),
];

export default function HomeFeaturedWork() {
  const [filter, setFilter] = useState<Category>("all");

  const filtered =
    filter === "all"
      ? portfolioItems.filter((p) => p.featured)
      : portfolioItems.filter(
          (p) => p.featured && p.category.includes(filter),
        );

  const display =
    filtered.length > 0
      ? filtered.slice(0, 3)
      : portfolioItems.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="work" className="py-20 md:py-28 border-b border-border/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              Proof in the work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
              Products clients hired us to ship
            </h2>
            <p className="mt-4 text-foreground/60 leading-relaxed">
              Real case studies across mobile, web, design, and commerce — each
              with its own discipline and stack.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            View full portfolio
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFilter(opt.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground/70 hover:bg-accent/10"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative aspect-[16/11] bg-muted overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.groupTitle}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold border border-border">
                  {disciplineLabels[project.discipline]}
                </span>
              </div>
              <div className="p-5 flex flex-1 flex-col gap-3">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                  {project.groupTitle}
                </h3>
                <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed flex-1">
                  {project.description}
                </p>
                <TechBadgeList
                  items={project.tags.slice(0, 3)}
                  size="sm"
                  variant="muted"
                />
                <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                  Case study
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
