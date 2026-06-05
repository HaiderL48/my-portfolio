import { homeProcessSteps } from "@/lib/site-data";

export default function ProcessStrip() {
  return (
    <section className="py-16 md:py-20 border-b border-border/50 bg-muted/30">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            How I work
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            From idea to launch
          </h2>
          <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
            A clear, repeatable process — so you always know what happens next.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeProcessSteps.map((item, index) => (
            <li
              key={item.step}
              className="relative rounded-2xl border border-border bg-card p-5 md:p-6"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold mb-4">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold">{item.step}</h3>
              <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
