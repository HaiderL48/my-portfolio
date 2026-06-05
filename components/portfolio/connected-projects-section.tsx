import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  disciplineLabels,
  type PortfolioItem,
} from "@/lib/portfolio-data";

interface ConnectedProjectsSectionProps {
  projects: PortfolioItem[];
  groupTitle: string;
}

export default function ConnectedProjectsSection({
  projects,
  groupTitle,
}: ConnectedProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-16 md:py-24 border-b border-border/50 bg-muted/30">
      <div className="site-container">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
          Same product
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          More from {groupTitle}
        </h2>
        <p className="mt-3 text-foreground/60 max-w-2xl leading-relaxed">
          This product spans multiple disciplines. Explore the connected case
          studies below — each focused on one stack (Figma, Flutter, web, etc.).
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:bg-accent/10 dark:hover:bg-white/10 transition-colors duration-300"
            >
              <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold border border-border">
                  {disciplineLabels[item.discipline]}
                </span>
              </div>
              <div className="p-5 flex flex-1 flex-col">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {disciplineLabels[item.discipline]}
                </h3>
                <p className="mt-2 text-sm text-foreground/60 line-clamp-2 leading-relaxed flex-1">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  View case study
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
