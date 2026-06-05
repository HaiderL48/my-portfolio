"use client";

import Header from "@/components/portfolio/header";
import Hero from "@/components/portfolio/hero";
import HomeTrustBar from "@/components/portfolio/home-trust-bar";
import Services from "@/components/portfolio/services";
import ProcessStrip from "@/components/portfolio/process-strip";
import HomeFeaturedWork from "@/components/portfolio/home-featured-work";
import WhyMe from "@/components/portfolio/why-me";
import TestimonialsSection from "@/components/portfolio/testimonials-section";
import HomeCta from "@/components/portfolio/home-cta";
import Footer from "@/components/portfolio/footer";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <HomeTrustBar />
      <Services />
      <ProcessStrip />
      <HomeFeaturedWork />
      <WhyMe />
      <TestimonialsSection />
      <HomeCta />
      <Footer />
    </main>
  );
}
