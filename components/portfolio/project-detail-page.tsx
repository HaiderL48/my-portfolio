import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  categories,
  disciplineLabels,
  getAdjacentProjects,
  getDetailRelatedProjects,
  getExploreMoreProjects,
  getServiceSlugForDiscipline,
  type PortfolioItem,
} from "@/lib/portfolio-data";
import { getProjectDetail } from "@/lib/project-details-data";
import { projectScreensFromAssets } from "@/lib/mockup-assets";
import RelatedProjectsGrid from "@/components/portfolio/related-projects-grid";
import ProjectRelatedSection from "@/components/portfolio/project-related-section";
import ProjectNavigation from "@/components/portfolio/project-navigation";
import ProjectDetailMotion from "@/components/portfolio/project-detail-motion";
import {
  CaseStudySection,
  ProjectObjectivesList,
  ProjectProcessSection,
  ProjectTechStack,
  ProjectTestimonialBlock,
} from "@/components/portfolio/project-case-study-blocks";
import { TechBadgeList } from "@/components/portfolio/tech-badge";
import ProjectMetaSection, {
  type ProjectMetaVariant,
} from "@/components/portfolio/project-meta-section";
import ProjectScreenExplorer from "@/components/portfolio/project-screen-explorer";

/** Layout for the meta block: "cards" | "strip" | "stats" */
const PROJECT_META_VARIANT: ProjectMetaVariant = "strip";

interface ProjectDetailPageProps {
  project: PortfolioItem;
}

function buildFallbackDetail(project: PortfolioItem) {
  const extraImages = [project.webImage, project.mobileImage].filter(
    (src): src is string => Boolean(src),
  );

  const featureScreens = projectScreensFromAssets(
    [
      {
        title: "Primary view",
        description: project.description,
        image: project.image,
      },
      ...extraImages.map((image, i) => ({
        title: `View ${i + 2}`,
        description: project.description,
        image,
      })),
    ],
    project.mockupType === "phone" ? "mobile" : "browser",
  );

  return {
    headline: project.description,
    meta: {
      timeline: "—",
      platform: disciplineLabels[project.discipline],
    },
    overview: [project.description],
    challenge: project.description,
    solution:
      "Delivered with a focus on clarity, maintainability, and alignment with product goals.",
    results: ["Shipped to scope", "Documented handoff", "Production-ready output"],
    deliverables: project.tags,
    role: disciplineLabels[project.discipline],
    techStack: project.tags,
    objectives: ["Meet project goals", "Deliver on timeline", "Quality output"],
    featureScreens,
    processSteps: [
      { step: "Discover", description: "Goals, scope, and success metrics." },
      { step: "Execute", description: `${disciplineLabels[project.discipline]} delivery.` },
      { step: "Launch", description: "QA, handoff, and deploy." },
    ],
  };
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const detail = getProjectDetail(project.slug) ?? buildFallbackDetail(project);
  const { projects: detailRelated, source: detailRelatedSource } =
    getDetailRelatedProjects(project);
  const exploreMore = getExploreMoreProjects(
    project,
    detailRelated.map((p) => p.slug),
  );
  const { prev, next } = getAdjacentProjects(project.slug);

  const categoryLabels = project.category
    .filter((c) => c !== "all")
    .map((c) => categories.find((cat) => cat.value === c)?.label ?? c);

  const primaryCategoryLabel = categoryLabels[0];

  const serviceSlug = getServiceSlugForDiscipline(project.discipline);

  return (
    <ProjectDetailMotion>
      <section
        data-project-hero
        className="relative pt-28 pb-12 md:pt-32 md:pb-16 border-b border-border/50 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background"
          aria-hidden
        />
        <div className="relative site-container">
          <Link
            href="/work"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            ← Back to work
          </Link>

          <div className="mt-8 space-y-6">
            <div data-hero-item className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary text-primary-foreground">
                {disciplineLabels[project.discipline]}
              </span>
              <span className="text-xs px-3 py-1 rounded-full border border-border bg-card text-foreground/70">
                {project.groupTitle}
              </span>
              {categoryLabels.map((label) => (
                <span
                  key={label}
                  className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div data-hero-item className="space-y-6 lg:py-4">
                <div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
                    Case study
                  </p>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-balance">
                    {project.groupTitle}
                  </h1>
                  <p className="mt-2 text-lg font-medium text-foreground/80">
                    {disciplineLabels[project.discipline]}
                  </p>
                  <p className="mt-4 text-base md:text-lg text-foreground/70 leading-relaxed">
                    {detail.headline}
                  </p>
                </div>

                <TechBadgeList items={project.tags} size="sm" />

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                  >
                    Start a similar project
                    <ArrowRight className="size-4" />
                  </a>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:bg-accent/10 dark:hover:bg-white/10"
                    >
                      Live site
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                  {serviceSlug && (
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:bg-accent/10 dark:hover:bg-white/10"
                    >
                      Related service
                    </Link>
                  )}
                </div>
              </div>

              <div data-hero-item className="flex items-center justify-center w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={900}
                  className="w-full max-w-lg h-auto object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div data-project-section>
        <ProjectMetaSection
          meta={detail.meta}
          role={detail.role}
          variant={PROJECT_META_VARIANT}
        />
      </div>

      <CaseStudySection
        data-project-section
        eyebrow="Context"
        title="Project overview"
      >
        <div data-reveal className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
          {detail.overview.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm md:text-base text-foreground/70 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow="Goals" title="Project objectives" className="bg-muted/30" data-project-section>
        <ProjectObjectivesList items={detail.objectives} />
      </CaseStudySection>

      <CaseStudySection eyebrow="Problem & approach" title="Challenge and solution" data-project-section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div data-reveal-card className="p-6 md:p-8 rounded-2xl border border-border bg-card">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-3">
              Challenge
            </p>
            <p className="text-foreground/70 leading-relaxed">{detail.challenge}</p>
          </div>
          <div data-reveal-card className="p-6 md:p-8 rounded-2xl border border-border bg-card">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-3">
              Solution
            </p>
            <p className="text-foreground/70 leading-relaxed">{detail.solution}</p>
          </div>
        </div>
      </CaseStudySection>

      {detail.featureScreens.length > 0 && (
        <CaseStudySection
          id="screens"
          eyebrow="Product views"
          title="Pages & key features"
          description="Browse each screen inside the device mockup — use the arrows or page chips to explore the flow."
          data-project-section
        >
          <ProjectScreenExplorer
            screens={detail.featureScreens}
            mockupType={project.mockupType}
            projectSlug={project.slug}
            projectTitle={project.groupTitle}
          />
        </CaseStudySection>
      )}

      <ProjectRelatedSection
        projects={detailRelated}
        source={detailRelatedSource}
        groupTitle={project.groupTitle}
        categoryLabel={primaryCategoryLabel}
      />

      <CaseStudySection eyebrow="Delivery" title="Outcomes & deliverables" className="bg-muted/30" data-project-section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Outcomes</h3>
            <ul className="space-y-3">
              {detail.results.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm md:text-base text-foreground/70 leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Deliverables</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {detail.deliverables.map((item) => (
                <li
                  key={item}
                  className="text-sm p-4 rounded-xl border border-border bg-card text-foreground/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow="Stack" title="Tools & technologies" data-project-section>
        <ProjectTechStack items={detail.techStack} />
      </CaseStudySection>

      <ProjectProcessSection steps={detail.processSteps} />

      <ProjectTestimonialBlock project={project} />

      <ProjectNavigation prev={prev} next={next} />

      {exploreMore.length > 0 && (
        <section className="py-16 md:py-24 border-b border-border/50" data-project-section>
          <div className="site-container">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
              Explore more
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Other projects
            </h2>
            {detailRelatedSource === "connected" && primaryCategoryLabel ? (
              <p className="text-foreground/60 max-w-2xl leading-relaxed mb-8">
                More {primaryCategoryLabel.toLowerCase()} work beyond this product
                family.
              </p>
            ) : (
              <div className="mb-5" />
            )}
            <RelatedProjectsGrid projects={exploreMore} />
          </div>
        </section>
      )}

      <section className="py-20 md:py-28 bg-primary text-primary-foreground" data-project-section>
        <div className="site-container text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            Need {disciplineLabels[project.discipline]} for your product?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
            Whether you need one discipline or a full stack across Figma, mobile,
            web, and admin — let&apos;s plan it together.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-foreground text-primary px-8 py-4 text-sm font-semibold shadow-lg transition hover:opacity-90"
          >
            Get in Touch
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </ProjectDetailMotion>
  );
}
