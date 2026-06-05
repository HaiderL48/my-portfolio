import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/portfolio/header";
import Footer from "@/components/portfolio/footer";
import ProjectDetailPage from "@/components/portfolio/project-detail-page";
import { getProjectBySlug, projectSlugs } from "@/lib/portfolio-data";
import { getProjectDetail } from "@/lib/project-details-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const detail = getProjectDetail(slug);

  return {
    title: `${project.title} — Case Study`,
    description: detail?.headline ?? project.description,
    openGraph: {
      title: `${project.title} | Haider Limdiwala`,
      description: project.description,
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function WorkProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <ProjectDetailPage project={project} />
      <Footer />
    </main>
  );
}
