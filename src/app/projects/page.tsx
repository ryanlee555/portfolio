import type { Metadata } from "next";
import { projects, type Project } from "@/content/site";

export const metadata: Metadata = { title: "Projects" };

function CardBody({ project }: { project: Project }) {
  return (
    <>
      <h3>{project.name}</h3>
      <p>{project.summary}</p>
      <div className="stack mono">
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      {project.href && <span className="more">View project →</span>}
    </>
  );
}

export default function Projects() {
  return (
    <section className="page" aria-labelledby="projects-title">
      <p className="eyebrow">Second base · Projects</p>
      <h2 id="projects-title">Things I&apos;ve built</h2>
      <div className="grid">
        {projects.map((project) =>
          project.href ? (
            <a className="card" key={project.name} href={project.href} target="_blank" rel="noopener noreferrer">
              <CardBody project={project} />
            </a>
          ) : (
            <article className="card" key={project.name}>
              <CardBody project={project} />
            </article>
          ),
        )}
      </div>
    </section>
  );
}
