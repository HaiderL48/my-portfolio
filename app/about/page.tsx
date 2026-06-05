import type { Metadata } from "next";
import Header from "@/components/portfolio/header";
import Footer from "@/components/portfolio/footer";
import AboutPageContent from "@/components/portfolio/about-page-content";

export const metadata: Metadata = {
  title: "About — Haider Limdiwala",
  description:
    "Full-stack developer and designer — Flutter, React, Figma, Shopify, WordPress, and integrations from idea to launch.",
};

export default function AboutPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <AboutPageContent />
      <Footer />
    </main>
  );
}
