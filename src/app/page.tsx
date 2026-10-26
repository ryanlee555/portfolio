import Image from "next/image";
import portrait from "@/assets/ryan.jpg";
import BaseLink from "@/components/BaseLink";
import Contact from "@/components/Contact";
import RichText from "@/components/RichText";
import { profile } from "@/content/site";

const lineup = [
  { index: 1, short: "1B", name: "Experience", desc: "The roles I've held and what I accomplished in each one." },
  { index: 2, short: "2B", name: "Projects", desc: "Things I've built, the tools I used, and what I learned along the way." },
  { index: 3, short: "3B", name: "Interests", desc: "What I'm into outside of work, starting with baseball." },
];

export default function Home() {
  return (
    <section className="page" aria-labelledby="home-title">
      <div className="home-top">
        <div className="intro">
          <Image
            src={portrait}
            alt="Ryan Lee"
            className="portrait"
            sizes="136px"
            placeholder="blur"
            loading="eager"
          />
          <h1 id="home-title">{profile.greeting}</h1>
          {profile.intro.map((paragraph) => (
            <p className="lede" key={paragraph.slice(0, 24)}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>
        <div>
          <p className="eyebrow">Round the bases</p>
          <ul className="lineup">
            <li>
              <div className="row here">
                <span className="pos">HP</span>
                <span className="nm">About me</span>
                <span className="ds">You&apos;re here, with who I am and how to reach me.</span>
              </div>
            </li>
            {lineup.map((item) => (
              <li key={item.short}>
                <BaseLink index={item.index} className="row">
                  <span className="pos">{item.short}</span>
                  <span className="nm">{item.name}</span>
                  <span className="ar">→</span>
                  <span className="ds">{item.desc}</span>
                </BaseLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Contact />
    </section>
  );
}
