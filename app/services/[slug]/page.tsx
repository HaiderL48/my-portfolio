import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import Header from "@/components/portfolio/header";
import Footer from "@/components/portfolio/footer";
import Service3DStack from "@/components/portfolio/service-3d-stack";
import { getServiceLandingContent } from "@/lib/service-landing-data";
import { getServiceBySlug, serviceSlugs } from "@/lib/services-data";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-service-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-service-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-service-mono",
});

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
    <main className="w-full">
      <Header />
      <div
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
      >
        <Service3DStack />
      </div>
      <Footer />
    </main>
  );
}
