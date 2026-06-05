import type { Metadata } from "next";
import Header from "@/components/portfolio/header";
import Footer from "@/components/portfolio/footer";
import ContactPageContent from "@/components/portfolio/contact-page-content";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Get in touch for web, mobile, design, or e-commerce projects. Typical response within 24 hours.",
};

export default function ContactPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <ContactPageContent />
      <Footer />
    </main>
  );
}
