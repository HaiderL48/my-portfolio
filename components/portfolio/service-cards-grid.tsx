import Link from "next/link";
import type { ServiceDefinition } from "@/lib/services-data";

interface ServiceCardsGridProps {
  items: ServiceDefinition[];
}

export default function ServiceCardsGrid({ items }: ServiceCardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((service) => {
        const Icon = service.icon;
        return (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group p-6 rounded-2xl border border-border bg-card hover:bg-accent/10 transition-colors duration-300 dark:hover:bg-white/10"
          >
            <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Icon size={20} strokeWidth={1.75} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              {service.summary}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline">
              View service →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
