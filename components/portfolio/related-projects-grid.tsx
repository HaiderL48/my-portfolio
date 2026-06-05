import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/portfolio-data";

interface RelatedProjectsGridProps {
  projects: PortfolioItem[];
}

export default function RelatedProjectsGrid({ projects }: RelatedProjectsGridProps) {
  if (projects.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-foreground/60 line-clamp-2">
              {project.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
