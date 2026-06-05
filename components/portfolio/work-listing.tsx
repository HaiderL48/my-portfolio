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
  type PortfolioItem,
} from "@/lib/portfolio-data";
import { TechBadgeList } from "@/components/portfolio/tech-badge";

const filterOptions: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  ...categories.map((c) => ({ value: c.value, label: c.label })),
];

function getFeaturedProject(): PortfolioItem | undefined {
  return portfolioItems.find((p) => p.featured) ?? portfolioItems[0];
}

export default function WorkListing() {
  const [filter, setFilter] = useState<Category>("all");
  const featured = getFeaturedProject();

  const filtered =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category.includes(filter));

  const gridItems = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      {featured && (
        <section className="pb-12 md:pb-16 border-b border-border/50">
          <div className="site-container">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-4">
              Featured project
            </p>
            <Link
              href={`/work/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center rounded-2xl border border-border bg-card overflow-hidden hover:bg-accent/5 transition-colors"
            >
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[320px] bg-muted">
                <Image
                  src={featured.image}
                  alt={featured.groupTitle}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-6 md:p-10 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary text-primary-foreground">
                  {disciplineLabels[featured.discipline]}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight group-hover:text-primary transition-colors">
                  {featured.groupTitle}
                </h2>
                <p className="text-foreground/70 leading-relaxed max-w-lg">
                  {featured.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  View case study
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-10 md:py-12 border-b border-border/50">
        <div className="site-container">
          <div className="flex flex-wrap gap-2 justify-center">
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
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="site-container">
          {gridItems.length === 0 ? (
            <p className="text-center text-foreground/60 py-16">
              No projects in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridItems.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:bg-accent/10 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.groupTitle}
                      fill
                      className="object-cover object-top transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold border border-border">
                      {disciplineLabels[project.discipline]}
                    </span>
                  </div>
                  <div className="p-5 flex flex-1 flex-col gap-3">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-t border-border/50">
        <div className="site-container text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Want results like these?
          </h2>
          <p className="mt-3 text-foreground/60 max-w-lg mx-auto">
            Tell me about your product — I&apos;ll map the right stack and timeline.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition"
          >
            Start your project
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
