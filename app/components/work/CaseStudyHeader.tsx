import Image from "next/image";
import type { Project } from "@/app/lib/projects";
import {
  formatProjectEyebrow,
  getProjectTimeline,
} from "@/app/lib/projects";

interface CaseStudyHeaderProps {
  project: Project;
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="case-study-meta__item">
      <p className="case-study-meta__label">{label}</p>
      <p className="case-study-meta__value">{value}</p>
    </div>
  );
}

function SkillsItem({ skills }: { skills: string[] }) {
  return (
    <div className="case-study-meta__item">
      <p className="case-study-meta__label">Skills</p>
      <ul className="case-study-meta__skills">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  const eyebrow = formatProjectEyebrow(project);
  const title = project.title;
  const timeline = getProjectTimeline(project);
  const skills = project.skills?.length ? project.skills : undefined;

  return (
    <header className="case-study__header">
      {eyebrow ? <p className="case-study__eyebrow">{eyebrow}</p> : null}
      <h1 className="case-study__title">{title}</h1>
      <div className="case-study__hero" aria-hidden={project.heroImage ? undefined : true}>
        {project.heroImage ? (
          <Image
            src={project.heroImage}
            alt={`Hero image for ${project.title}`}
            fill
            className="case-study__hero-image"
            sizes="(min-width: 64rem) 70vw, 100vw"
            priority
          />
        ) : (
          <div className="case-study__hero-placeholder">
            <span className="case-study__hero-placeholder-label">{project.title}</span>
          </div>
        )}
      </div>
      <div className="case-study-meta">
        <MetaItem label="Role" value={project.role} />
        <MetaItem label="Timeline" value={timeline} />
        {project.team ? <MetaItem label="Team" value={project.team} /> : null}
        {skills ? <SkillsItem skills={skills} /> : null}
      </div>
    </header>
  );
}
