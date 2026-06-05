"use client";

import Header from "@/components/portfolio/header";
import HeroSolar from "@/components/HeroSolar";
import HomeTrustBar from "@/components/portfolio/home-trust-bar";
// Archived: full-viewport scroll-stack — kept in components/portfolio/services.tsx
// import Services from "@/components/portfolio/services";
import ServicesTwoColumn from "@/components/portfolio/services-two-column";
// Process story lives in HeroSolar — see components/HeroSolar.jsx
// import ProcessStrip from "@/components/portfolio/process-strip";
import HomeFeaturedWork from "@/components/portfolio/home-featured-work";
import TestimonialsSection from "@/components/portfolio/testimonials-section";
import HomeCta from "@/components/portfolio/home-cta";
import Footer from "@/components/portfolio/footer";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <HeroSolar />
      <HomeTrustBar />
      <ServicesTwoColumn />
      {/* <Services /> — archived full-viewport stack */}
      {/* <ProcessStrip /> — covered by HeroSolar process orbits */}
      <HomeFeaturedWork />
      <TestimonialsSection />
      <HomeCta />
      <Footer />
    </main>
  );
}
