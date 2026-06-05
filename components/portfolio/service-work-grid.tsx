import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/portfolio-data";
import { TechBadgeList } from "@/components/portfolio/tech-badge";

interface ServiceWorkGridProps {
  projects: PortfolioItem[];
  emptyWorkHref?: string;
}

export default function ServiceWorkGrid({
  projects,
  emptyWorkHref = "/#work",
}: ServiceWorkGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-foreground/60">
        New case studies for this service are on the way.{" "}
        <Link href={emptyWorkHref} className="text-primary hover:underline">
          View all work
        </Link>
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/work/${project.slug}`}
          className="group rounded-2xl border border-border bg-card overflow-hidden hover:bg-accent/10 dark:hover:bg-white/10 transition-colors duration-300"
        >
          <div className="relative aspect-[4/3] bg-muted overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="p-5 space-y-2">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
            <TechBadgeList
              items={project.tags.slice(0, 3)}
              size="sm"
              variant="muted"
              className="pt-1"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
