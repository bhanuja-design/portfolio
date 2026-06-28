import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "app/content/projects");

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  featured: boolean;
  role: string;
  date: string;
}

export interface ProjectDetail {
  metadata: Project;
  content: string;
}

function toProject(data: Record<string, unknown>): Project {
  return {
    slug: String(data.slug),
    title: String(data.title),
    shortDescription: String(data.shortDescription),
    role: String(data.role),
    date: String(data.date),
    featured: Boolean(data.featured),
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getAllProjects(): Project[] {
  const files = fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const filePath = path.join(projectsDir, file);
    const { data } = matter(fs.readFileSync(filePath, "utf-8"));
    return toProject(data);
  });
}

export function getProjectBySlug(slug: string): ProjectDetail | null {
  const filePath = path.join(projectsDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));

  return {
    metadata: toProject(data),
    content,
  };
}
