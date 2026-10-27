import type { Metadata } from "next";
import Image from "next/image";
import { BoldNumbers } from "@/components/RichText";
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
            <div className="role-side">
              <div className="mono">{role.dates}</div>
              <div className="role-logo" style={{ height: role.logoHeight }}>
                <Image
                  src={role.logo}
                  alt={`${role.company} logo`}
                  className={role.logoDark ? "logo-on-light" : undefined}
                  sizes="180px"
                />
                {role.logoDark && <Image src={role.logoDark} alt="" className="logo-on-dark" sizes="180px" />}
              </div>
            </div>
            <div>
              <h3>{role.company}</h3>
              <p className="org">
                {role.role} · {role.location}
              </p>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>
                    <BoldNumbers text={point} />
                  </li>
                ))}
              </ul>
            </div>
            {role.photos && (
              <div className="role-photos">
                {role.photos.map((photo) => (
                  <Image key={photo.alt} src={photo.src} alt={photo.alt} sizes="240px" style={{ objectPosition: photo.position }} />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
