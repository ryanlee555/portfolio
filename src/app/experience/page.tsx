import type { Metadata } from "next";
import { experience } from "@/content/site";

export const metadata: Metadata = { title: "Experience" };

export default function Experience() {
  return (
    <section className="page" aria-labelledby="experience-title">
      <p className="eyebrow">First base · Experience</p>
      <h2 id="experience-title">Where I&apos;ve worked</h2>
      <div className="roles">
        {experience.map((role) => (
          <article className="role" key={`${role.company}-${role.dates}`}>
            <div className="mono">{role.dates}</div>
            <div>
              <h3>{role.company}</h3>
              <p className="org">
                {role.role} · {role.location}
              </p>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
