import Container from "@/app/components/Container";
import ProjectCard from "@/app/components/ProjectCard";
import { getAllProjects } from "@/app/lib/projects";

export default function Work() {
  const projects = getAllProjects();

  return (
    <Container>
      <h1>Work</h1>
      <p>All projects will be listed here.</p>
      <div className="mt-md grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            shortDescription={project.shortDescription}
            role={project.role}
            slug={project.slug}
          />
        ))}
      </div>
    </Container>
  );
}
