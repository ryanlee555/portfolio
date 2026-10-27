import type { Metadata } from "next";
import InterestBoard from "@/components/InterestBoard";
import { interests, screen, songs } from "@/content/site";

export const metadata: Metadata = { title: "Interests" };

export default function Interests() {
  return (
    <section className="page" aria-labelledby="interests-title">
      <p className="eyebrow">Third base · Interests</p>
      <h2 id="interests-title">Outside of work</h2>
      <InterestBoard interests={interests} songs={songs} screen={screen} />
    </section>
  );
}
