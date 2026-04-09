import { Zap, Code2, Paintbrush, HeadphonesIcon } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "I deliver projects on time without cutting corners. Most projects ship within days, not months.",
  },
  {
    icon: Code2,
    title: "Scalable Code",
    description: "Clean, maintainable code built to grow with your business — no spaghetti, no shortcuts.",
  },
  {
    icon: Paintbrush,
    title: "UI/UX Focused",
    description: "Every pixel matters. I build interfaces that look great and feel intuitive to use.",
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description: "I don't disappear after launch. You get continued support and quick responses when you need them.",
  },
];

export default function WhyMe() {
  return (
    <section className=" py-20 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center text-center mb-14">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            The difference
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Why Work With Me?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="group flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:bg-accent/10 dark:hover:bg-white/10 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <benefit.icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold">{benefit.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
