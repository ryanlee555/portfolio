"use client";

import { useEffect, useRef, useState } from "react";
import BaseballGame from "@/components/BaseballGame";
import RichText from "@/components/RichText";
import SpotifyTrack from "@/components/SpotifyTrack";
import type { Interest, Song } from "@/content/site";

type Panel = NonNullable<Interest["opens"]>;

const BUTTONS: Record<Panel, { open: string; close: string }> = {
  songs: { open: "Click for songs ↓", close: "Hide songs ↑" },
  game: { open: "Play ball ↓", close: "Hide game ↑" },
};

// The interest pillars. A pillar with `opens` gets a button that reveals a panel
// underneath (the "On repeat" songs or the mini baseball game), one at a time.
// Nothing in a panel loads until it's opened.
export default function InterestBoard({ interests, songs }: { interests: Interest[]; songs: Song[] }) {
  const [open, setOpen] = useState<Panel | null>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open]);

  const close = (
    <button type="button" className="btn ghost" onClick={() => setOpen(null)}>
      Close
    </button>
  );

  return (
    <>
      <ul className="things">
        {interests.map((item) => (
          <li key={item.name} className={item.opens && open === item.opens ? "active" : undefined}>
            <span className="big">{item.name}</span>
            <p>
              <RichText text={item.blurb} />
            </p>
            {item.opens && (
              <button
                type="button"
                className="pillar-btn"
                aria-expanded={open === item.opens}
                aria-controls={item.opens}
                onClick={() => setOpen((o) => (o === item.opens ? null : (item.opens ?? null)))}
              >
                {open === item.opens ? BUTTONS[item.opens].close : BUTTONS[item.opens].open}
              </button>
            )}
          </li>
        ))}
      </ul>

      {open === "songs" && (
        <section className="panel songs" id="songs" aria-labelledby="songs-title" ref={panel}>
          <div className="panel-head">
            <div>
              <p className="eyebrow">Songs I like</p>
              <h3 id="songs-title">On repeat</h3>
            </div>
            {close}
          </div>
          <div className="song-grid">
            {songs.map((song) => (
              <article className="song" key={song.spotifyId}>
                {/* Spotify's own player: a preview for everyone, full tracks when signed in */}
                <SpotifyTrack id={song.spotifyId} title={`${song.title} by ${song.artist} on Spotify`} />
                <p className="eyebrow song-artist">{song.artist}</p>
                <h4>{song.title}</h4>
                {song.why.map((para) => (
                  <p key={para}>
                    <RichText text={para} />
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>
      )}

      {open === "game" && (
        <section className="panel" id="game" aria-labelledby="game-title" ref={panel}>
          <div className="panel-head">
            <div>
              <p className="eyebrow">Batter up</p>
              <h3 id="game-title">Pinguball</h3>
            </div>
            {close}
          </div>
          <BaseballGame />
        </section>
      )}
    </>
  );
}
