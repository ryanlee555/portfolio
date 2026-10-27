import Image from "next/image";
import portrait from "@/assets/ryan.jpg";
import BaseLink from "@/components/BaseLink";
import Contact from "@/components/Contact";
import PhotoGrid from "@/components/PhotoGrid";
import RichText from "@/components/RichText";
import { lineup, looking, profile } from "@/content/site";

const bases = [
  { index: 1, short: "1B", name: "Experience", desc: lineup.experience },
  { index: 2, short: "2B", name: "Projects", desc: lineup.projects },
  { index: 3, short: "3B", name: "Interests", desc: lineup.interests },
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
                <span className="ds">{lineup.about}</span>
              </div>
            </li>
            {bases.map((item) => (
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
      <div className="looking">
        <div>
          <p className="eyebrow">{looking.eyebrow}</p>
          <p className="lede">
            <RichText text={looking.text} />
          </p>
          <p className="eyebrow facts-title">Quick fun facts</p>
          <ul className="facts">
            {looking.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        <PhotoGrid photos={looking.photos} />
      </div>
      <Contact />
    </section>
  );
}
