"use client";

import { useEffect, useRef, useState } from "react";
import RichText from "@/components/RichText";
import SpotifyTrack from "@/components/SpotifyTrack";
import type { Interest, Song } from "@/content/site";

// The interest pillars. A pillar with `opens: "songs"` gets a button that reveals the
// "On repeat" songs underneath; the Spotify players only load once that's opened.
export default function InterestBoard({ interests, songs }: { interests: Interest[]; songs: Song[] }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open]);

  return (
    <>
      <ul className="things">
        {interests.map((item) => (
          <li key={item.name} className={item.opens && open ? "active" : undefined}>
            <span className="big">{item.name}</span>
            <p>
              <RichText text={item.blurb} />
            </p>
            {item.opens === "songs" && (
              <button
                type="button"
                className="pillar-btn"
                aria-expanded={open}
                aria-controls="songs"
                onClick={() => setOpen((o) => !o)}
              >
                {open ? "Hide songs ↑" : "Click for songs ↓"}
              </button>
            )}
          </li>
        ))}
      </ul>

      {open && (
        <section className="songs" id="songs" aria-labelledby="songs-title" ref={panel}>
          <div className="songs-head">
            <div>
              <p className="eyebrow">Songs I like</p>
              <h3 id="songs-title">On repeat</h3>
            </div>
            <button type="button" className="btn ghost" onClick={() => setOpen(false)}>
              Close
            </button>
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
    </>
  );
}
