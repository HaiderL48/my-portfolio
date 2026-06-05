import { Code2, HeadphonesIcon } from "lucide-react";
import { homeWhyPoints } from "@/lib/home-content";
// import { homeTestimonials } from "@/lib/site-data";

const whyIcons = [Code2, HeadphonesIcon] as const;

export default function TestimonialsSection() {
  // const items = homeTestimonials.filter((t) => t.text.trim().length > 0);

  return (    <section
      id="testimonials"
      className="py-20 md:py-28 border-b border-border/50 bg-muted/30 scroll-mt-24"
    >
      <div className="site-container">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            The difference
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-balance">
            What you get working with me
          </h2>
          <p className="mt-4 text-sm sm:text-base text-foreground/60 leading-relaxed">
            You have seen the work — here is how projects run after you hire me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {homeWhyPoints.map((point, index) => {
            const Icon = whyIcons[index] ?? Code2;
            return (
              <div
                key={point.title}
                className="group flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:bg-accent/10 dark:hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-semibold">{point.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* What people say — hidden until real client quotes are ready
        {items.length > 0 ? (
          <>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
                Clients
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                What people say
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <blockquote
                  key={item.author}
                  className="p-6 md:p-8 rounded-2xl border border-border bg-card"
                >
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                    &ldquo;{item.text}&rdquo;
                  </p>
                  <footer className="mt-6">
                    <p className="font-semibold text-sm">{item.author}</p>
                    <p className="text-xs text-foreground/60 mt-0.5">
                      {item.role}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </>
        ) : null}
        */}
      </div>
    </section>
  );
}
