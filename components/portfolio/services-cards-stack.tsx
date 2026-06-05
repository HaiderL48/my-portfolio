"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services-data";
import "./services-cards-stack.css";

const ServicesCardsStack = forwardRef<HTMLDivElement>(function ServicesCardsStack(
  _props,
  ref,
) {
  return (
    <div ref={ref} className="services-cards">
      <div className="services-stack">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.slug} className="services-card">
              <Link
                href={`/services/${service.slug}`}
                className="group block w-full rounded-2xl md:rounded-3xl border border-border bg-card shadow-lg overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 hover:border-primary/25 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="size-6 sm:size-7" strokeWidth={1.5} />
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold text-primary">
                    Learn more
                    <ArrowRight className="size-3.5 sm:size-4 md:size-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-foreground/60 leading-relaxed">
                  {service.summary}
                </p>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
});

export default ServicesCardsStack;
