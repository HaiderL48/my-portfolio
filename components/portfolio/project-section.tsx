"use client";

import Image from "next/image";
import { PortfolioItem } from "@/lib/portfolio-data";

interface ProjectSectionProps {
  project: PortfolioItem;
  reverse?: boolean;
  index: number;
}

export default function ProjectSection({ project, reverse, index }: ProjectSectionProps) {
  const isReverse = reverse && index % 2 === 0;

  return (
    <section
      id={`project-${project.id}`}
      className="bg-background border-b border-border/50 px-4 md:px-8 py-16 md:py-24 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-[1200px]">
        <div className={`flex flex-col ${isReverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-center`}>

          {/* Content Side */}
          <div className="space-y-6 text-foreground w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <div className="space-y-4 animate-slide-in-left flex flex-col items-center lg:items-start" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="inline-block">
                <span className="text-sm font-semibold bg-primary/10 px-4 py-2 rounded-full text-primary">
                  Featured Project
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-center lg:text-left text-balance">
                {project.title}
              </h2>
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-xl text-center lg:text-left text-balance">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 justify-center lg:justify-start">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs md:text-sm px-3 py-1 bg-muted text-foreground/70 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="flex justify-center w-full lg:w-1/2">
            <div className="relative w-full max-w-lg">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
