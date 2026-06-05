"use client";

import { useRef, type ReactNode } from "react";
import ServicesCardsStack from "@/components/portfolio/services-cards-stack";
import { useServicesCardStack } from "@/lib/use-services-card-stack";
import "./services-cards-stack.css";

interface ServicesCardStackSectionProps {
  id?: string;
  sectionClassName?: string;
  stageClassName?: string;
  stackStageClassName?: string;
  header: ReactNode;
  headerClassName?: string;
}

export default function ServicesCardStackSection({
  id,
  sectionClassName = "relative border-b border-border/50 bg-background scroll-mt-28",
  stageClassName = "services-two-col-stage relative lg:h-dvh lg:min-h-dvh lg:overflow-x-clip lg:overflow-y-visible lg:grid lg:grid-cols-2 lg:gap-14 xl:gap-20 lg:items-stretch py-16 md:py-20 lg:py-0",
  stackStageClassName = "flex relative w-full min-h-[min(52vh,380px)] sm:min-h-[min(48vh,420px)] md:min-h-[460px] lg:h-full lg:min-h-0 lg:flex-col lg:justify-center lg:overflow-visible",
  header,
  headerClassName = "mb-10 md:mb-12 lg:mb-0 lg:flex lg:flex-col lg:justify-center lg:py-12",
}: ServicesCardStackSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stackStageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useServicesCardStack(sectionRef, stageRef, stackStageRef, cardsRef);

  return (
    <section ref={sectionRef} id={id} className={sectionClassName}>
      <div className="site-container w-full">
        <div ref={stageRef} className={stageClassName}>
          <div className={headerClassName}>{header}</div>
          <div ref={stackStageRef} className={stackStageClassName}>
            <ServicesCardsStack ref={cardsRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
