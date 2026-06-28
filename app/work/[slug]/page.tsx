import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/app/components/work/CaseStudyPage";
import {
  getProjectBySlug,
  getProjectSlugs,
} from "@/app/lib/projects";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.metadata.title,
    description: project.metadata.shortDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyPage {...project} />;
}
