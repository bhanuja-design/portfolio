import Container from "@/app/components/Container";
import ProjectCard from "@/app/components/ProjectCard";
import { getAllProjects } from "@/app/lib/projects";

export default function Home() {
  const featuredProjects = getAllProjects().filter((project) => project.featured);

  return (
    <Container>
      <h1 className="text-2xl md:text-3xl lg:text-4xl">Portfolio</h1>
      <p>
        Designer and developer building thoughtful digital experiences.
      </p>
      <section className="mt-lg">
        <h2>Featured Work</h2>
        <div className="mt-md grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              shortDescription={project.shortDescription}
              role={project.role}
              slug={project.slug}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
