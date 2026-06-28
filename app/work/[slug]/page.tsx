import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/app/components/Container";
import { formatDate, getProjectBySlug } from "@/app/lib/projects";

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

  const { metadata, content } = project;

  return (
    <Container>
      <header className="mb-lg border-b border-gray-200 pb-3xl md:pb-4xl">
        <h1 className="mb-md text-2xl md:text-3xl">{metadata.title}</h1>
        <p className="mb-md text-sm text-gray-500">{metadata.role}</p>
        <p className="text-sm text-gray-500">{formatDate(metadata.date)}</p>
      </header>
      <div className="prose max-w-prose">
        <MDXRemote source={content} />
      </div>
    </Container>
  );
}
