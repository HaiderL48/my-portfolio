import { homeTestimonials } from "@/lib/site-data";

export default function TestimonialsSection() {
  const items = homeTestimonials.filter((t) => t.text.trim().length > 0);
  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-24 border-b border-border/50 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            Clients
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            What people say
          </h2>
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
                <p className="text-xs text-foreground/60 mt-0.5">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
