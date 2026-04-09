"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/portfolio/header";
import Hero from "@/components/portfolio/hero";
import WhyMe from "@/components/portfolio/why-me";
import Services from "@/components/portfolio/services";
import BottomFilterBar from "@/components/portfolio/bottom-filter-bar";
import ProjectSection from "@/components/portfolio/project-section";
import Footer from "@/components/portfolio/footer";
import { portfolioItems, Category } from "@/lib/portfolio-data";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [isLoading, setIsLoading] = useState(false);
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let trigger: any;

    const setupAnimation = async () => {
      if (!showcaseRef.current || !bottomBarRef.current) return;

      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);
      gsap.set(bottomBarRef.current, { autoAlpha: 0, y: 100 });

      const showBar = () => {
        if (!bottomBarRef.current) return;
        gsap.to(bottomBarRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
      };

      const hideBar = () => {
        if (!bottomBarRef.current) return;
        gsap.to(bottomBarRef.current, { autoAlpha: 0, y: 100, duration: 0.35, ease: "power2.in" });
      };

      trigger = ScrollTrigger.create({
        trigger: showcaseRef.current,
        start: "top 60%",
        end: "bottom bottom",
        onEnter: showBar,
        onEnterBack: showBar,
        onLeave: hideBar,
        onLeaveBack: hideBar,
      });
    };

    setupAnimation();

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  const filteredProjects =
    selectedCategory === "all"
      ? portfolioItems.filter((item) => item.featured)
      : portfolioItems.filter((item) => item.category.includes(selectedCategory));

  const handleCategoryChange = (category: Category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <Hero isLoading={isLoading} />
      <WhyMe />

      {/* Projects Showcase */}
      <div ref={showcaseRef} className="w-full flex flex-col items-center pt-16 overflow-hidden">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2 text-center px-4">
          What I've been up to lately
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-center px-4">
          A Journey Through My Work
        </h2>
        {isLoading ? (
          <div className="flex items-center justify-center py-40">
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-border border-t-primary animate-spin mx-auto" />
              <p className="text-foreground/60">Loading projects...</p>
            </div>
          </div>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectSection key={project.id} project={project} reverse={index % 2 === 0} index={index} />
          ))
        ) : (
          <div className="flex items-center justify-center py-40">
            <p className="text-lg text-foreground/60">No projects found</p>
          </div>
        )}
      </div>

      <Services />
      <Footer />

      <BottomFilterBar
        ref={bottomBarRef}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
    </main>
  );
}
