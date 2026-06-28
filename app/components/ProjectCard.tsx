import Link from "next/link";

interface ProjectCardProps {
  title: string;
  shortDescription: string;
  role: string;
  slug: string;
}

export default function ProjectCard({
  title,
  shortDescription,
  role,
  slug,
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="block cursor-pointer rounded border border-gray-200 bg-gray-50 p-md transition-colors hover:border-gray-300 hover:bg-gray-100"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-xs text-sm text-gray-600">{shortDescription}</p>
      <p className="mt-xs text-sm text-gray-500">{role}</p>
    </Link>
  );
}
