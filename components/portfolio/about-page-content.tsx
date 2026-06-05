import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutContent } from "@/lib/site-data";
import Services from "@/components/portfolio/services";
import { TechBadgeList } from "@/components/portfolio/tech-badge";
import TestimonialsSection from "@/components/portfolio/testimonials-section";

export default function AboutPageContent() {
  const content = aboutContent;

  return (
    <>
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border/50">
        <div className="site-container">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            About
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance max-w-3xl">
            {content.headline}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-border/50">
        <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold">My story</h2>
            {content.story.map((p, i) => (
              <p
                key={i}
                className="text-sm md:text-base text-foreground/70 leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {content.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-5 text-center"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Services />

      <section className="py-16 md:py-24 border-b border-border/50 bg-muted/30">
        <div className="site-container">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">
            Skills & expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.expertiseGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
                <TechBadgeList items={group.items} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-border/50">
        <div className="site-container">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">
            How I work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border border-border bg-card"
              >
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-border/50 bg-muted/30">
        <div className="site-container">
          <h2 className="text-2xl font-extrabold mb-8">Journey</h2>
          <ol className="space-y-6 border-l-2 border-border pl-6">
            {content.timeline.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary" />
                <p className="text-sm font-bold text-primary">{item.year}</p>
                <p className="text-sm text-foreground/70 mt-0.5">{item.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-20 md:py-28">
        <div className="site-container text-center">
          <h2 className="text-3xl font-extrabold">Want to work together?</h2>
          <p className="mt-3 text-foreground/60">Say hello — I&apos;d love to hear about your project.</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
          >
            Get in touch
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
