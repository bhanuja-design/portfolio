import { getFeaturedProjects, getProjectTitleSecondary } from "@/app/lib/projects";
import Link from "next/link";
import SelectedWorkHeader from "@/app/components/home/SelectedWorkHeader";

function ProjectGridCard({
  title,
  titleSecondary,
  slug,
}: {
  title: string;
  titleSecondary?: string;
  slug: string;
}) {
  return (
    <li className="selected-work__item list-none min-w-0">
      <Link
        href={`/work/${slug}`}
        data-cursor="view"
        className="selected-work__link"
      >
        <div className="selected-work__media bg-surface" aria-hidden="true" />
        <div className="selected-work__body">
          <h3 className="selected-work__title m-0 min-w-0 text-lg font-semibold leading-snug tracking-tight text-text-primary lg:text-xl">
            <span>{title}</span>
            {titleSecondary ? (
              <span className="font-medium text-text-secondary">
                {" "}
                {titleSecondary}
              </span>
            ) : null}
          </h3>
        </div>
      </Link>
    </li>
  );
}

export default function SelectedWork() {
  const projects = getFeaturedProjects(6);

  return (
    <section className="content-grid" aria-labelledby="selected-work-heading">
      <div className="col-full selected-work">
        <SelectedWorkHeader />
        <ul className="selected-work__grid">
        {projects.map((project) => (
          <ProjectGridCard
            key={project.slug}
            title={project.title}
            titleSecondary={getProjectTitleSecondary(project)}
            slug={project.slug}
          />
        ))}
      </ul>
      </div>
    </section>
  );
}
