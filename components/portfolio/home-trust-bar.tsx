import { homeHero } from "@/lib/home-content";
import { CheckCircle2 } from "lucide-react";

export default function HomeTrustBar() {
  return (
    <section className="border-b border-border/50 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <ul className="lg:col-span-7 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-3">
            {homeHero.valuePoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-foreground/75"
              >
                <CheckCircle2 className="size-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
          <div className="lg:col-span-5 grid grid-cols-3 gap-4">
            {homeHero.stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-right">
                <p className="text-2xl md:text-3xl font-semibold tracking-tight text-primary">
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
