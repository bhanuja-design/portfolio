import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "app/content/projects");

const REQUIRED_PROJECT_FIELDS = [
  "slug",
  "title",
  "shortDescription",
  "role",
  "date",
] as const;

function isProjectFile(file: string): boolean {
  return (
    file.endsWith(".mdx") &&
    !file.startsWith("_") &&
    !file.startsWith(".")
  );
}

function slugFromFilename(file: string): string {
  return file.replace(/\.mdx$/, "");
}

function sanitizeProjectSlug(slug: string): string | null {
  const normalized = path.basename(slug.trim());

  if (!normalized || normalized === "." || normalized === "..") {
    return null;
  }

  if (!isProjectFile(`${normalized}.mdx`)) {
    return null;
  }

  return normalized;
}

function readProjectFile(slug: string): ProjectDetail | null {
  const filePath = path.join(projectsDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));

  for (const field of REQUIRED_PROJECT_FIELDS) {
    if (data[field] === undefined || data[field] === "") {
      throw new Error(
        `Project "${slug}.mdx" is missing required frontmatter field "${field}".`
      );
    }
  }

  const metadata = toProject(data);

  if (metadata.slug !== slug) {
    throw new Error(
      `Project "${slug}.mdx" frontmatter slug "${metadata.slug}" must match the filename.`
    );
  }

  return { metadata, content };
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  role: string;
  date: string;
  featured?: boolean;
  madeAt?: string;
  externalUrl?: string;
  timeline?: string;
  team?: string;
  skills?: string[];
  heroImage?: string;
}

export interface ProjectDetail {
  metadata: Project;
  content: string;
}

function toProject(data: Record<string, unknown>): Project {
  const skills = data.skills;

  return {
    slug: String(data.slug),
    title: String(data.title),
    shortDescription: String(data.shortDescription),
    role: String(data.role),
    date: String(data.date),
    featured: data.featured === true || data.featured === "true",
    madeAt: data.madeAt ? String(data.madeAt) : undefined,
    externalUrl: data.externalUrl ? String(data.externalUrl) : undefined,
    timeline: data.timeline ? String(data.timeline) : undefined,
    team: data.team ? String(data.team) : undefined,
    skills: Array.isArray(skills)
      ? skills.map(String)
      : typeof skills === "string"
        ? skills.split(",").map((item) => item.trim()).filter(Boolean)
        : undefined,
    heroImage: data.heroImage ? String(data.heroImage) : undefined,
  };
}

export function formatProjectEyebrow(project: Project): string {
  const org = project.madeAt?.trim();
  const year = getProjectYear(project.date);
  const parts = [org, year].filter(Boolean);

  return parts.join(" • ");
}

export function getProjectTitleSecondary(project: Project): string | undefined {
  const value = project.madeAt?.trim();

  if (!value) {
    return undefined;
  }

  const withoutFor = value
    .replace(/^\s*for\s+/i, "")
    .replace(/\s+for\s+/gi, " ")
    .trim();

  return withoutFor || undefined;
}

export function getProjectTimeline(project: Project): string {
  if (project.timeline) {
    return project.timeline;
  }

  return formatDate(project.date);
}

export function getProjectYear(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return String(date.getFullYear());
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
  const files = fs.readdirSync(projectsDir).filter(isProjectFile);

  return files
    .map((file) => readProjectFile(slugFromFilename(file))!.metadata)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(projectsDir)
    .filter(isProjectFile)
    .map(slugFromFilename);
}

export function getFeaturedProjects(limit = 6): Project[] {
  const featured = getAllProjects().filter((project) => project.featured);

  if (featured.length > 0) {
    return featured.slice(0, limit);
  }

  return getAllProjects().slice(0, limit);
}

export function getProjectBySlug(slug: string): ProjectDetail | null {
  const normalized = sanitizeProjectSlug(slug);

  if (!normalized) {
    return null;
  }

  const filePath = path.join(projectsDir, `${normalized}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return readProjectFile(normalized);
}
