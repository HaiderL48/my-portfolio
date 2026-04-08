"use client";

import { PortfolioItem } from "@/lib/portfolio-data";
import ProjectMockup from "./project-mockup";
import Image from "next/image";

interface ProjectSectionProps {
  project: PortfolioItem;
  reverse?: boolean;
  index: number;
}

export default function ProjectSection({
  project,
  reverse,
  index,
}: ProjectSectionProps) {
  const isReverse = reverse && index % 2 === 0;

  return (
    <section
      id={`project-${project.id}`}
      className={`bg-background border-b h-screen flex flex-col items-center justify-center border-border/50 px-4 md:px-8 ${
        index === 0 ? "pt-14 md:pt-0 pb-20 md:pb-28" : "py-20 md:py-28"
      }`}
    >
      <div className="mx-auto flex flex-row flex-none items-center justify-start gap-0 w-full max-w-[1200px] h-min p-0 relative overflow-visible z-[1]">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isReverse ? "md:grid-flow-dense" : ""}`}
        >
          {/* Content Side */}
          <div
            className={`space-y-6 text-foreground ${isReverse ? "md:col-start-2" : ""}`}
          >
            <div
              className="space-y-4 animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-block">
                <span className="text-sm font-semibold bg-primary/10 px-4 py-2 rounded-full text-primary">
                  Featured Project
                </span>
              </div>
              <h2 className="text-4xl md:text-7xl font-med tracking-tight text-balance">
                {project.title}
              </h2>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-xl text-balance">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-muted text-foreground/70 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Testimonial */}
            {/* {project.testimonial && (
              <div
                className="mt-8 p-6 bg-muted/50 rounded-lg border border-border animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={project.testimonial.image}
                    alt={project.testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-foreground/70 italic mb-3">
                      "{project.testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-foreground">
                        {project.testimonial.author}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {project.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>

          {/* Mockup Side */}
          <div
            className={`flex justify-center ${isReverse ? "md:col-start-1 md:row-start-1" : ""}`}
          >
            {project.mockupType === "browser" ||
            project.mockupType === "phone" ? (
              <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
                <ProjectMockup
                  image={
                    project.mockupType === "browser"
                      ? (project.webImage ?? project.image)
                      : (project.mobileImage ?? project.image)
                  }
                  title={`${project.title} — ${project.mockupType === "browser" ? "Web" : "Mobile"} view 1`}
                  type={project.mockupType}
                  delay={`${index * 0.1 + 0.1}s`}
                  priority={index === 0}
                />
                <ProjectMockup
                  image={
                    project.mockupType === "browser"
                      ? (project.webImage ?? project.image)
                      : (project.mobileImage ?? project.image)
                  }
                  title={`${project.title} — ${project.mockupType === "browser" ? "Web" : "Mobile"} view 2`}
                  type={project.mockupType}
                  delay={`${index * 0.1 + 0.15}s`}
                  priority={false}
                />
                  type={project.mockupType}
                  delay={`${index * 0.1 + 0.15}s`}
                />
              </div>
            ) : (
              <ProjectMockup
                image={project.image}
                title={project.title}
                type={project.mockupType}
                delay={`${index * 0.1 + 0.1}s`}
                priority={index === 0}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
