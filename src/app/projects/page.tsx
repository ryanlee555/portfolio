import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/content/site";

export const metadata: Metadata = { title: "Projects" };

function CardBody({ project }: { project: Project }) {
  return (
    <>
      <div className="proj-shot">
        {project.cover ? (
          <>
            <Image className="proj-cover" src={project.cover.src} alt={project.cover.alt} sizes="(max-width: 860px) 90vw, 560px" loading="eager" />
            {project.inset && <Image className="proj-inset" src={project.inset.src} alt={project.inset.alt} sizes="160px" />}
          </>
        ) : (
          <span className="mono">Coming soon</span>
        )}
      </div>
      <div className="proj-body">
        <div className="proj-head">
          <h3>{project.name}</h3>
          {project.detail && <span className="more">View project →</span>}
        </div>
        <p>{project.summary}</p>
        <div className="stack mono">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
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
          project.detail ? (
            <Link className="card proj" key={project.slug} href={`/projects/${project.slug}`}>
              <CardBody project={project} />
            </Link>
          ) : (
            <article className="card proj" key={project.slug}>
              <CardBody project={project} />
            </article>
          ),
        )}
      </div>
    </section>
  );
}
