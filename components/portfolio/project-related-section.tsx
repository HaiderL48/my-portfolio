import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  disciplineLabels,
  type DetailRelatedSource,
  type PortfolioItem,
} from "@/lib/portfolio-data";
import { CaseStudySection } from "@/components/portfolio/project-case-study-blocks";

interface ProjectRelatedSectionProps {
  projects: PortfolioItem[];
  source: DetailRelatedSource;
  groupTitle: string;
  categoryLabel?: string;
}

export default function ProjectRelatedSection({
  projects,
  source,
  groupTitle,
  categoryLabel,
}: ProjectRelatedSectionProps) {
  if (projects.length === 0) return null;

  const isConnected = source === "connected";
  const eyebrow = isConnected ? "Same product" : "Similar work";
  const title = isConnected
    ? `More from ${groupTitle}`
    : "Related projects";
  const description = isConnected
    ? "This product spans multiple disciplines — explore the connected case studies below."
    : categoryLabel
      ? `Other ${categoryLabel.toLowerCase()} work you may want to explore.`
      : "Other projects in a similar category.";

  return (
    <CaseStudySection
      eyebrow={eyebrow}
      title={title}
      description={description}
      className="bg-muted/30"
      data-project-section
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            data-reveal-card
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
              {isConnected && (
                <span className="absolute top-3 right-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Connected
                </span>
              )}
            </div>
            <div className="p-5 flex flex-1 flex-col">
              <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                {item.groupTitle}
              </p>
              <h3 className="mt-1 font-semibold group-hover:text-primary transition-colors">
                {item.title}
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
    </CaseStudySection>
  );
}
