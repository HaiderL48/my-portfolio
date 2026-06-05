import type { ReactNode } from "react";
import Image from "next/image";
import { Figma } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/portfolio-data";
import type {
  ProjectDetailContent,
  ProjectScreen,
} from "@/lib/project-details-data";
import ServiceProcessRoadmap from "@/components/portfolio/service-process-roadmap";
import { TechBadgeList } from "@/components/portfolio/tech-badge";

export function CaseStudySection({
  eyebrow,
  title,
  description,
  children,
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-20 border-b border-border/50", className)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {eyebrow && (
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-foreground/60 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function ProjectObjectivesList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <li
          key={item}
          className="p-5 rounded-2xl border border-border bg-card text-sm text-foreground/70 leading-relaxed"
        >
          <span className="text-xs font-bold text-primary mb-2 block">
            Goal {i + 1}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ScreenFrame({
  screen,
  projectTitle,
}: {
  screen: ProjectScreen;
  projectTitle: string;
}) {
  const isMobile = screen.variant === "mobile";
  const isFigma = screen.variant === "figma";

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-muted overflow-hidden",
        isMobile ? "mx-auto max-w-[280px]" : "w-full",
      )}
    >
      {isFigma && (
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-md bg-card/90 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase tracking-wider border border-border">
          <Figma className="size-3" />
          Figma
        </div>
      )}
      <div
        className={cn(
          "relative w-full",
          isMobile ? "aspect-[9/19]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={screen.image}
          alt={`${projectTitle} — ${screen.title}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

export function ProjectFeatureShowcase({
  screens,
  projectTitle,
}: {
  screens: ProjectScreen[];
  projectTitle: string;
}) {
  return (
    <div className="space-y-16 md:space-y-24">
      {screens.map((screen, index) => {
        const reversed = index % 2 === 1;
        return (
          <div
            key={screen.title}
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center",
              reversed && "lg:[&>*:first-child]:order-2",
            )}
          >
            <ScreenFrame screen={screen} projectTitle={projectTitle} />
            <div className={cn(reversed && "lg:order-1")}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">
                Screen {index + 1}
              </p>
              <h3 className="mt-2 text-xl md:text-2xl font-bold tracking-tight">
                {screen.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-foreground/60 leading-relaxed">
                {screen.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProjectTechStack({ items }: { items: string[] }) {
  return <TechBadgeList items={items} size="md" />;
}

export function ProjectTestimonialBlock({
  project,
}: {
  project: PortfolioItem;
}) {
  const testimonial = project.testimonial;
  if (!testimonial?.text?.trim()) return null;

  return (
    <CaseStudySection
      eyebrow="Client feedback"
      title="What they said"
      className="bg-muted/30"
    >
      <div className="max-w-3xl mx-auto text-center">
        <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-balance">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>
        {(testimonial.author || testimonial.role) && (
          <div className="mt-8 flex flex-col items-center gap-3">
            {testimonial.image && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author ?? "Client"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              {testimonial.author && (
                <p className="font-semibold">{testimonial.author}</p>
              )}
              {testimonial.role && (
                <p className="text-sm text-foreground/60">{testimonial.role}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </CaseStudySection>
  );
}

export function ProjectProcessSection({
  steps,
}: {
  steps: ProjectDetailContent["processSteps"];
}) {
  return (
    <CaseStudySection
      eyebrow="Process"
      title="How this project ran"
      description="Milestones from kickoff to delivery for this discipline."
    >
      <ServiceProcessRoadmap steps={steps} />
    </CaseStudySection>
  );
}
