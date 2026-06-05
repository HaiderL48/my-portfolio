import type { Metadata } from "next";
import Header from "@/components/portfolio/header";
import Footer from "@/components/portfolio/footer";
import ServicesPageContent from "@/components/portfolio/services-page-content";

export const metadata: Metadata = {
  title: "Services — Web, E-Commerce, Apps & More",
  description:
    "Full-service digital partner: web development, e-commerce, mobile apps, UI/UX design, CMS integration, and cloud backends. Browse all services and dedicated landing pages.",
  openGraph: {
    title: "All Services | Haider Limdiwala",
    description:
      "Everything you need to launch and grow online — six specialized services with dedicated landing pages, process roadmaps, and portfolio work.",
  },
};

export default function ServicesPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <ServicesPageContent />
      <Footer />
    </main>
  );
}
