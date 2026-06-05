import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/portfolio/header";
import Footer from "@/components/portfolio/footer";
import WorkListing from "@/components/portfolio/work-listing";

export const metadata: Metadata = {
  title: "Work — Portfolio & Case Studies",
  description:
    "Browse mobile apps, web projects, Shopify stores, Figma designs, and full-stack case studies.",
};

export default function WorkPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <Link
            href="/"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            ← Back to home
          </Link>
          <p className="mt-8 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/60 mb-2">
            Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
            My work
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed">
            Case studies across mobile, web, design, and e-commerce — filter by
            category or open a project to see the full story.
          </p>
        </div>
      </section>
      <WorkListing />
      <Footer />
    </main>
  );
}
