"use client";

import { useEffect, useRef } from "react";

// Spotify's player, driven through its iFrame API so the page can react to playback.
// When a preview stops, Spotify swaps the player for a "Get Spotify" ad; we reload the
// track instead so the card looks the same as before. Only one song plays at a time.

type Playback = { isPaused: boolean; position: number; duration: number };
type Controller = {
  addListener: (event: "playback_update", cb: (e: { data: Playback }) => void) => void;
  loadUri: (uri: string) => void;
  pause: () => void;
  destroy: () => void;
};
type IFrameAPI = {
  createController: (el: HTMLElement, options: { uri: string; width: string; height: number }, cb: (c: Controller) => void) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

let api: Promise<IFrameAPI> | undefined;
function loadApi() {
  api ??= new Promise((resolve) => {
    window.onSpotifyIframeApiReady = resolve;
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);
  });
  return api;
}

const players = new Set<Controller>();
// Spotify fades in its ad about 5s before a preview ends (while still "playing"),
// so the preview is cut just before that.
const AD_LEAD_MS = 6000;

export default function SpotifyTrack({ id, title }: { id: string; title: string }) {
  const slot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = slot.current;
    if (!host) return;
    const target = document.createElement("div");
    host.appendChild(target);
    const uri = `spotify:track:${id}`;
    let controller: Controller | undefined;
    let alive = true;

    loadApi().then((spotify) => {
      if (!alive) return;
      spotify.createController(target, { uri, width: "100%", height: 152 }, (c) => {
        controller = c;
        players.add(c);
        host.querySelector("iframe")?.setAttribute("title", title);
        let playing = false;
        c.addListener("playback_update", ({ data }) => {
          const ended = data.duration > 0 && data.position >= data.duration - AD_LEAD_MS;
          if (!data.isPaused && !ended) {
            if (!playing) players.forEach((other) => other !== c && other.pause());
            playing = true;
            return;
          }
          // When a preview stops, by pausing or by nearing its end, Spotify swaps the player
          // for a "Get Spotify" ad. Reload the track then so the card stays as it was.
          if (playing) c.loadUri(uri);
          playing = false;
        });
      });
    });

    return () => {
      alive = false;
      if (controller) {
        players.delete(controller);
        controller.destroy();
      }
      host.replaceChildren();
    };
  }, [id, title]);

  return <div className="spotify" ref={slot} />;
}
