import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeCta() {
  return (
    <section className="py-20 md:py-28 border-b border-border/50">
      <div className="site-container">
        <div className="rounded-3xl bg-primary text-primary-foreground px-8 py-12 md:px-14 md:py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            Ready to build something?
          </h2>
          <p className="mt-4 text-primary-foreground/85 max-w-xl mx-auto leading-relaxed">
            From Figma to go-live — mobile, web, stores, and integrations in one
            workflow.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-foreground text-primary px-8 py-4 text-sm font-semibold shadow-lg transition hover:opacity-90"
            >
              Let&apos;s talk
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-2xl border border-primary-foreground/30 px-8 py-4 text-sm font-semibold transition hover:bg-primary-foreground/10"
            >
              See my work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
