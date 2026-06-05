import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { disciplineLabels, type PortfolioItem } from "@/lib/portfolio-data";

export default function ProjectNavigation({
  prev,
  next,
}: {
  prev?: PortfolioItem;
  next?: PortfolioItem;
}) {
  if (!prev && !next) return null;

  return (
    <section className="py-12 md:py-16 border-t border-border/50 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 hover:bg-accent/10 transition-colors"
            >
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/50">
                <ArrowLeft className="size-3.5" />
                Previous
              </span>
              <span className="font-semibold group-hover:text-primary transition-colors">
                {prev.groupTitle}
              </span>
              <span className="text-xs text-foreground/60">
                {disciplineLabels[prev.discipline]}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col items-end text-right gap-2 rounded-2xl border border-border bg-card p-5 hover:bg-accent/10 transition-colors sm:col-start-2"
            >
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/50">
                Next
                <ArrowRight className="size-3.5" />
              </span>
              <span className="font-semibold group-hover:text-primary transition-colors">
                {next.groupTitle}
              </span>
              <span className="text-xs text-foreground/60">
                {disciplineLabels[next.discipline]}
              </span>
            </Link>
          ) : null}
        </div>
        <p className="mt-6 text-center">
          <Link
            href="/work"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all projects
          </Link>
        </p>
      </div>
    </section>
  );
}
