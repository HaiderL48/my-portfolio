import type { Metadata } from "next";
import Header from "@/components/portfolio/header";
import Footer from "@/components/portfolio/footer";
import WorkPageContent from "@/components/portfolio/work-page-content";

export const metadata: Metadata = {
  title: "Work — Portfolio & Case Studies",
  description:
    "Browse mobile apps, web projects, Shopify stores, Figma designs, and full-stack case studies.",
  openGraph: {
    title: "Work | Haider Limdiwala",
    description:
      "A curated index of shipped apps, storefronts, dashboards, and design systems with full case studies.",
  },
};

export default function WorkPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <WorkPageContent />
      <Footer />
    </main>
  );
}
