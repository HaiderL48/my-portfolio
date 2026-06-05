import type { ServiceDefinition } from "@/lib/services-data";

export interface ServiceStackBeat {
  label: string;
  title: string;
  body: string;
}

export interface ServiceStackLayer {
  title: string;
  subtitle: string;
}

export interface ServiceStackScrollData {
  sectionLabel: string;
  sectionTitle: string;
  beats: ServiceStackBeat[];
  stackTop: ServiceStackLayer;
  stackMiddle: ServiceStackLayer[];
  stackBottom: ServiceStackLayer;
  technologies: string[];
  moreTechCount: number;
}

export function getServiceStackScrollData(
  service: ServiceDefinition,
): ServiceStackScrollData {
  const tech = service.technologies;
  const shown = tech.slice(0, 5);

  return {
    sectionLabel: "Where this fits",
    sectionTitle: `How ${service.title.toLowerCase()} sits in your stack`,
    beats: [
      {
        label: "THE CHALLENGE",
        title: service.tagline,
        body: service.overview[0] ?? service.summary,
      },
      {
        label: "THE APPROACH",
        title: `${service.title} bridges the gap.`,
        body:
          service.overview[1] ??
          "Strategy, build, and launch handled in one clear workflow — not scattered across vendors.",
      },
      {
        label: "THE OUTCOME",
        title: "Shipped, measurable, and ready to grow.",
        body:
          service.process[service.process.length - 1]?.description ??
          service.summary,
      },
    ],
    stackTop: {
      title: "Your goals",
      subtitle: "Vision, audience, timeline, and success metrics",
    },
    stackMiddle: service.process.map((step) => ({
      title: step.step,
      subtitle: step.description,
    })),
    stackBottom: {
      title: "Live product",
      subtitle: `Production-ready ${service.title.toLowerCase()} your users interact with`,
    },
    technologies: shown,
    moreTechCount: Math.max(0, tech.length - shown.length),
  };
}
