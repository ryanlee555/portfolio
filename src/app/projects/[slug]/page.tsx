import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ArcSlider from "@/components/ArcSlider";
import RichText from "@/components/RichText";
import { projects } from "@/content/site";

function findProject(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  return project?.detail ? { ...project, detail: project.detail } : undefined;
}

export function generateStaticParams() {
  return projects.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: findProject(slug)?.name ?? "Projects" };
}

// The slug is URL data, so it's read inside Suspense to keep navigation instant.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={null}>
      <ProjectBody params={params} />
    </Suspense>
  );
}

async function ProjectBody({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const { detail } = project;

  return (
    <article className="page proj-page" aria-labelledby="proj-title">
      <Link href="/projects" className="back mono">
        ← All projects
      </Link>
      <p className="eyebrow">Second base · Projects</p>
      <h2 id="proj-title">{project.name}</h2>
      <p className="lede">
        <RichText text={project.summary} />
      </p>
      <div className="proj-links">
        {detail.live && (
          <a className="btn" href={detail.live} target="_blank" rel="noopener noreferrer">
            Visit live site ↗
          </a>
        )}
        {detail.repo && (
          <a className="btn ghost" href={detail.repo} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        )}
      </div>

      <dl className="proj-meta">
        {detail.meta.map((m) => (
          <div key={m.label}>
            <dt className="mono">{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>

      {project.cover && (
        <figure className="shot proj-hero">
          <Image src={project.cover.src} alt={project.cover.alt} sizes="(max-width: 1280px) 100vw, 1220px" loading="eager" />
        </figure>
      )}

      <section className="proj-sec">
        <h3>Why I built it</h3>
        <div className="proj-text">
          {detail.why.map((para) => (
            <p key={para}>
              <RichText text={para} />
            </p>
          ))}
        </div>
      </section>

      {detail.sections.map((sec, i) => (
        <section className="proj-sec" key={sec.title}>
          <h3>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            {sec.title}
          </h3>
          <div className="proj-text">
            <p>
              <RichText text={sec.body} />
            </p>
            {sec.options && (
              <ul className="styles">
                {sec.options.map((o) => (
                  <li key={o.name}>
                    <strong>{o.name}</strong>
                    <span>{o.blurb}</span>
                  </li>
                ))}
              </ul>
            )}
            {(sec.shots || sec.demo) && (
              <div className={`proj-shots${(sec.shots?.length ?? 0) + (sec.demo ? 1 : 0) > 1 ? " two" : ""}`}>
                {sec.shots?.map((s) => (
                  <figure className="shot" key={s.alt}>
                    <Image src={s.src} alt={s.alt} sizes="(max-width: 860px) 100vw, 900px" />
                  </figure>
                ))}
                {sec.demo === "arc-slider" && <ArcSlider />}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="proj-sec">
        <h3>How it&apos;s built</h3>
        <div className="proj-text">
          <dl className="built">
            {detail.built.map((b) => (
              <div key={b.layer}>
                <dt className="mono">{b.layer}</dt>
                <dd>{b.tech}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

    </article>
  );
}
