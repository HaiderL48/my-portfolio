import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/portfolio/header";
import Footer from "@/components/portfolio/footer";
import ServiceLandingPage from "@/components/portfolio/service-landing-page";
import { getServiceLandingContent } from "@/lib/service-landing-data";
import { getServiceBySlug, serviceSlugs } from "@/lib/services-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  const landing = getServiceLandingContent(service.slug);

  return {
    title: `${service.title} — Freelance Developer`,
    description: landing.subheadline,
    openGraph: {
      title: `${landing.headline} | Haider Limdiwala`,
      description: landing.subheadline,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <ServiceLandingPage service={service} />
      <Footer />
    </main>
  );
}
