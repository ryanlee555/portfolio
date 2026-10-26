import type { Metadata } from "next";
import { interests } from "@/content/site";

export const metadata: Metadata = { title: "Interests" };

export default function Interests() {
  return (
    <section className="page" aria-labelledby="interests-title">
      <p className="eyebrow">Third base · Interests</p>
      <h2 id="interests-title">Outside of work</h2>
      <ul className="things">
        {interests.map((item) => (
          <li key={item.name}>
            <span className="big">{item.name}</span>
            <p>{item.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
