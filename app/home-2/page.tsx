"use client";

import Header from "@/components/portfolio/header";
import HeroHalfSolar from "@/components/HeroHalfSolar";
import HomeTrustBar from "@/components/portfolio/home-trust-bar";
import ServicesTwoColumn from "@/components/portfolio/services-two-column";
import HomeFeaturedWork from "@/components/portfolio/home-featured-work";
import TestimonialsSection from "@/components/portfolio/testimonials-section";
import HomeCta from "@/components/portfolio/home-cta";
import Footer from "@/components/portfolio/footer";

export default function Home2() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <HeroHalfSolar />
      <HomeTrustBar />
      <ServicesTwoColumn />
      <HomeFeaturedWork />
      <TestimonialsSection />
      <HomeCta />
      <Footer />
    </main>
  );
}
