import BaseLink from "@/components/BaseLink";
import Scoreboard from "@/components/Scoreboard";
import { profile } from "@/content/site";

const lineup = [
  { index: 1, short: "1B", name: "Experience", desc: "Internships and contract work, with what I did at each." },
  { index: 2, short: "2B", name: "Projects", desc: "Things I've built, with the stack and what I learned." },
  { index: 3, short: "3B", name: "Interests", desc: "Baseball first, then everything else." },
];

export default function Home() {
  return (
    <section className="page" aria-labelledby="home-title">
      <div className="home-top">
        <div>
          <p className="eyebrow">Home plate · About</p>
          <h1 id="home-title">Hi, I&apos;m Ryan.</h1>
          <p className="lede">{profile.intro}</p>
        </div>
        <ul className="lineup">
          <li>
            <div className="row here">
              <span className="pos">HP</span>
              <span className="nm">About me</span>
              <span className="ds">You&apos;re here. Who I am and how this site works.</span>
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
      <Scoreboard />
    </section>
  );
}
