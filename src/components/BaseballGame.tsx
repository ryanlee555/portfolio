"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CHARACTERS, characterById, type CharacterId } from "@/components/GameCharacters";

// A tiny batting game: the pitch comes in from the mound and you swing (space, click, or
// tap) as it crosses the plate. The closer to perfect timing, the farther it goes.
// Three strikes is an out, three outs ends the game. Three hits in a row (no fouls or
// strikes in between) supercharges the bat: the next swing is a guaranteed home run.
// Best score stays in this browser.

const HOME = { x: 160, y: 262 };
const MOUND = { x: 160, y: 192 };
const BASE_SPOTS = [
  { x: 232, y: 190 },
  { x: 160, y: 118 },
  { x: 88, y: 190 },
];
const FENCE = 185; // outfield wall, measured from home plate
const BEST_KEY = "baseball-best";
const PLAYER_KEY = "pinguball-player";
const STREAK_FOR_CHARGE = 3;

// Home run fireworks: two bursts over the outfield, sparks spread evenly around each.
const BURSTS = [
  { x: 112, y: 112 },
  { x: 208, y: 100 },
];
const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const reach = i % 2 ? 20 : 28;
  return { dx: Math.cos(a) * reach, dy: Math.sin(a) * reach, tone: i % 3 };
});

// How far off perfect a swing can be (ms) for each result; anything farther off misses.
const WINDOWS = [
  { within: 30, bases: 4, label: "Home run!" },
  { within: 65, bases: 2, label: "Double!" },
  { within: 105, bases: 1, label: "Single!" },
  { within: 150, bases: 0, label: "Foul ball" },
];

type Phase = "ready" | "windup" | "pitch" | "result" | "over";
type Bases = [boolean, boolean, boolean];
type Board = {
  runs: number;
  outs: number;
  strikes: number;
  bases: Bases;
  streak: number; // hits in a row toward a supercharged swing
  charged: boolean; // the next swing is a guaranteed home run
  message: string;
  phase: Phase;
  best: number;
};

const fresh = (best: number): Board => ({
  runs: 0,
  outs: 0,
  strikes: 0,
  bases: [false, false, false],
  streak: 0,
  charged: false,
  message: "Press Play ball, then swing as the pitch crosses the plate.",
  phase: "ready",
  best,
});

const readPlayer = (): CharacterId => {
  try {
    return characterById(localStorage.getItem(PLAYER_KEY) ?? "").id;
  } catch {
    return "penguin";
  }
};

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

// Runners move up `n` bases; the batter takes base n (4 = home run).
function advance(bases: Bases, n: number) {
  let runs = 0;
  const next: Bases = [false, false, false];
  for (let i = 2; i >= 0; i--) {
    if (!bases[i]) continue;
    if (i + n >= 3) runs++;
    else next[i + n] = true;
  }
  if (n >= 4) runs++;
  else next[n - 1] = true;
  return { bases: next, runs };
}

type View = {
  ball: SVGCircleElement;
  shadow: SVGCircleElement;
  show: (b: Board) => void;
  swingBat: (charged: boolean) => void;
  celebrate: () => void;
};

// The game itself, outside React: it moves the ball directly and hands React a new
// scoreboard whenever something changes.
function createGame(view: View) {
  let board = fresh(readBest());
  let frame = 0;
  let timer = 0;
  let arrive = 0;
  let swungAt = 0;

  const set = (patch: Partial<Board>) => {
    board = { ...board, ...patch };
    if (board.outs >= 3 && board.phase !== "over") {
      const best = Math.max(board.best, board.runs);
      try {
        localStorage.setItem(BEST_KEY, String(best));
      } catch {}
      board = { ...board, phase: "over", best, message: `Game over: ${board.runs} ${board.runs === 1 ? "run" : "runs"}. ${board.message}` };
    }
    view.show(board);
  };

  const place = (x: number, y: number, r = 3.6, lift = 0) => {
    view.ball.setAttribute("cx", String(x));
    view.ball.setAttribute("cy", String(y - lift));
    view.ball.setAttribute("r", String(r));
    view.shadow.setAttribute("cx", String(x));
    view.shadow.setAttribute("cy", String(y));
    view.shadow.setAttribute("opacity", lift > 0 ? "0.35" : "0");
  };

  const later = (fn: () => void, ms: number) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(fn, ms);
  };

  const nextPitch = (delay: number) => {
    if (board.phase === "over") return;
    later(() => {
      place(MOUND.x, MOUND.y);
      set({ phase: "windup", message: board.charged ? "Supercharged. Pitcher's set…" : "Pitcher's set…" });
      later(throwPitch, 650 + Math.random() * 700);
    }, delay);
  };

  const strike = (how: string) => {
    const count = board.strikes + 1;
    const out = count >= 3;
    set({
      phase: "result",
      strikes: out ? 0 : count,
      outs: out ? board.outs + 1 : board.outs,
      streak: 0,
      message: out ? `Strikeout (${how}).` : `Strike ${count} (${how}).`,
    });
    nextPitch(900);
  };

  const throwPitch = () => {
    // Mostly fastballs; now and then a changeup that floats in late.
    const changeup = Math.random() < 0.18;
    const travel = changeup ? 1250 + Math.random() * 150 : 620 + Math.random() * 380;
    const start = performance.now();
    arrive = start + travel;
    swungAt = 0;
    set({ phase: "pitch", message: board.charged ? "Swing away!" : changeup ? "Changeup…" : "Here it comes…" });
    const step = (now: number) => {
      place(MOUND.x, MOUND.y + (HOME.y + 6 - MOUND.y) * ((now - start) / travel));
      if (now < arrive + 170) {
        frame = requestAnimationFrame(step);
        return;
      }
      // Past the plate without contact: a strike, swinging or looking.
      place(HOME.x, HOME.y, 0);
      strike(swungAt ? (swungAt < arrive ? "a little early" : "a little late") : "looking");
    };
    frame = requestAnimationFrame(step);
  };

  const flyTo = (angle: number, distance: number, duration: number, then: () => void) => {
    const rad = (angle * Math.PI) / 180;
    const to = { x: HOME.x + distance * Math.sin(rad), y: HOME.y - distance * Math.cos(rad) };
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - (1 - t) ** 2;
      const lift = Math.sin(Math.PI * t) * Math.min(40, distance * 0.22);
      place(HOME.x + (to.x - HOME.x) * e, HOME.y + (to.y - HOME.y) * e, 3.6 + lift * 0.06, lift);
      if (t < 1) frame = requestAnimationFrame(step);
      else then();
    };
    frame = requestAnimationFrame(step);
  };

  return {
    start() {
      cancelAnimationFrame(frame);
      board = fresh(board.best);
      place(MOUND.x, MOUND.y);
      set({ phase: "windup", message: "Pitcher's set…" });
      later(throwPitch, 900);
    },
    swing() {
      if (board.phase === "ready" || board.phase === "over") return;
      const live = board.phase === "pitch" && !swungAt;
      view.swingBat(live && board.charged);
      if (!live) return;
      swungAt = performance.now();
      const off = swungAt - arrive; // negative = early, pulled to left field

      // A supercharged swing can't miss: it's a home run, then the charge is spent.
      if (board.charged) {
        cancelAnimationFrame(frame);
        set({ phase: "result", charged: false, message: "Supercharged home run!" });
        view.ball.classList.add("charged");
        window.setTimeout(view.celebrate, 650); // as it clears the fence
        flyTo(Math.max(-30, Math.min(30, (off / 200) * 30)), FENCE + 140, 1200, () => {
          view.ball.classList.remove("charged");
          const moved = advance(board.bases, 4);
          set({ strikes: 0, streak: 0, bases: moved.bases, runs: board.runs + moved.runs });
          nextPitch(700);
        });
        return;
      }

      const hit = WINDOWS.find((w) => Math.abs(off) <= w.within);
      if (!hit) return; // a whiff: the pitch keeps going and is called a strike

      cancelAnimationFrame(frame);
      const side = Math.sign(off) || 1;
      if (hit.bases === 0) {
        set({ phase: "result", streak: 0, message: "Foul ball." });
        flyTo(side * (54 + Math.random() * 10), 95, 650, () => {
          set({ strikes: Math.min(2, board.strikes + 1) });
          nextPitch(500);
        });
        return;
      }
      const angle = Math.max(-38, Math.min(38, (off / 100) * 38));
      const distance = hit.bases === 4 ? FENCE + 120 : hit.bases === 2 ? 150 : 92;
      set({ phase: "result", message: hit.label });
      if (hit.bases === 4) window.setTimeout(view.celebrate, 600);
      flyTo(angle, distance, hit.bases === 4 ? 1100 : 750, () => {
        const moved = advance(board.bases, hit.bases);
        const streak = board.streak + 1;
        const charged = streak >= STREAK_FOR_CHARGE;
        set({
          strikes: 0,
          bases: moved.bases,
          runs: board.runs + moved.runs,
          streak: charged ? 0 : streak,
          charged,
          message: charged ? "Supercharged! Your next swing is a guaranteed home run." : board.message,
        });
        nextPitch(charged ? 1600 : 700);
      });
    },
    isLive: () => board.phase !== "ready" && board.phase !== "over",
    stop() {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    },
  };
}

type Game = ReturnType<typeof createGame>;

export default function BaseballGame() {
  // Only mounted after a click, never on the server, so reading storage here is safe.
  const [board, setBoard] = useState<Board>(() => fresh(readBest()));
  // "swing" plays the bat animation; "power" is the supercharged version
  const [swinging, setSwinging] = useState<"" | "swing" | "power">("");
  const [party, setParty] = useState(0); // bumps on each home run to replay the celebration
  const [player, setPlayer] = useState<CharacterId>(readPlayer);
  const pick = (id: CharacterId) => {
    setPlayer(id);
    try {
      localStorage.setItem(PLAYER_KEY, id);
    } catch {}
  };
  const ball = useRef<SVGCircleElement>(null);
  const shadow = useRef<SVGCircleElement>(null);
  const game = useRef<Game | null>(null);

  useEffect(() => {
    let batTimer = 0;
    let partyTimer = 0;
    const g = createGame({
      ball: ball.current!,
      shadow: shadow.current!,
      show: setBoard,
      swingBat: (charged) => {
        // Drop the class for a frame first so back-to-back swings restart the animation.
        setSwinging("");
        window.clearTimeout(batTimer);
        requestAnimationFrame(() => setSwinging(charged ? "power" : "swing"));
        batTimer = window.setTimeout(() => setSwinging(""), 460);
      },
      celebrate: () => {
        setParty((n) => n + 1);
        window.clearTimeout(partyTimer);
        partyTimer = window.setTimeout(() => setParty(0), 1600);
      },
    });
    game.current = g;
    // Space swings while a pitch is live (a focused button handles its own keys).
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.target instanceof HTMLButtonElement || !g.isLive()) return;
      e.preventDefault();
      g.swing();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(batTimer);
      window.clearTimeout(partyTimer);
      g.stop();
    };
  }, []);

  const playing = board.phase !== "ready" && board.phase !== "over";
  const swing = () => game.current?.swing();

  return (
    <div className="game">
      <div className="batters" role="group" aria-label="Choose your batter">
        <span className="mono">Batter</span>
        {CHARACTERS.map((c) => (
          <button key={c.id} type="button" className="batter" aria-pressed={player === c.id} onClick={() => pick(c.id)}>
            <svg viewBox="-13 -30 26 32" aria-hidden="true">
              {c.art}
            </svg>
            {c.name}
          </button>
        ))}
      </div>
      <div className="game-board" aria-live="polite">
        <div>
          <span className="mono">Runs</span>
          <strong>{board.runs}</strong>
        </div>
        <div>
          <span className="mono">Outs</span>
          <strong className="dots">
            {[0, 1, 2].map((i) => (
              <i key={i} className={i < board.outs ? "on" : ""} />
            ))}
          </strong>
        </div>
        <div>
          <span className="mono">Strikes</span>
          <strong className="dots">
            {[0, 1].map((i) => (
              <i key={i} className={i < board.strikes ? "on" : ""} />
            ))}
          </strong>
        </div>
        <div className={board.charged ? "charged" : undefined}>
          <span className="mono">{board.charged ? "Charged" : "Streak"}</span>
          <strong className="dots">
            {[0, 1, 2].map((i) => (
              <i key={i} className={board.charged || i < board.streak ? "hot" : ""} />
            ))}
          </strong>
        </div>
        <div>
          <span className="mono">Best</span>
          <strong>{board.best}</strong>
        </div>
      </div>

      <svg className="game-field" viewBox="0 64 320 224" onPointerDown={playing ? swing : undefined} role="img" aria-label="Baseball field">
        <path className="g-grass" d={`M${HOME.x} ${HOME.y} L${HOME.x - 131} ${HOME.y - 131} A${FENCE} ${FENCE} 0 0 1 ${HOME.x + 131} ${HOME.y - 131} Z`} />
        <path className="g-dirt" d={`M${HOME.x} ${HOME.y + 8} L${BASE_SPOTS[0].x + 10} ${BASE_SPOTS[0].y} L${HOME.x} ${BASE_SPOTS[1].y - 10} L${BASE_SPOTS[2].x - 10} ${BASE_SPOTS[2].y} Z`} />
        <path className="g-chalk" d={`M${HOME.x - 140} ${HOME.y - 140} L${HOME.x} ${HOME.y} L${HOME.x + 140} ${HOME.y - 140}`} />
        <circle className="g-mound" cx={MOUND.x} cy={MOUND.y} r="7" />
        {BASE_SPOTS.map((b, i) => (
          <rect key={i} className={`g-base${board.bases[i] ? " on" : ""}`} x={b.x - 4.5} y={b.y - 4.5} width="9" height="9" transform={`rotate(45 ${b.x} ${b.y})`} />
        ))}
        <path className="g-plate" d={`M${HOME.x - 5} ${HOME.y - 3} h10 v4 l-5 4 l-5 -4 Z`} />
        <g className={party ? "g-cheer" : undefined} key={`p${party}`}>
          <g transform={`translate(${HOME.x - 20} ${HOME.y + 10}) scale(1.2)`}>{characterById(player).art}</g>
        </g>
        <g transform={`translate(${HOME.x - 12} ${HOME.y - 2})`}>
          <g className={`g-bat${swinging ? ` ${swinging}` : ""}${board.charged ? " charged" : ""}`}>
            <rect x="-1.6" y="-26" width="3.2" height="26" rx="1.6" />
          </g>
        </g>
        <circle ref={shadow} className="g-shadow" cx={MOUND.x} cy={MOUND.y} r="3" opacity="0" />
        <circle ref={ball} className="g-ball" cx={MOUND.x} cy={MOUND.y} r="3.6" />
        {party > 0 && (
          <g className="g-party" key={party} aria-hidden="true">
            {BURSTS.map((b, i) => (
              <g key={i} transform={`translate(${b.x} ${b.y})`} style={{ animationDelay: `${i * 0.18}s` }}>
                {SPARKS.map((sp, j) => (
                  <circle
                    key={j}
                    className={`spark t${sp.tone}`}
                    r="2"
                    style={{ "--dx": `${sp.dx}px`, "--dy": `${sp.dy}px`, animationDelay: `${i * 0.18}s` } as CSSProperties}
                  />
                ))}
              </g>
            ))}
            <text className="g-banner" x={HOME.x} y="168" textAnchor="middle">
              HOME RUN!
            </text>
          </g>
        )}
      </svg>

      <div className="game-foot">
        <p className="game-msg">{board.message}</p>
        {playing ? (
          <button type="button" className="btn" onClick={swing}>
            Swing
          </button>
        ) : (
          <button type="button" className="btn" onClick={() => game.current?.start()}>
            {board.phase === "over" ? "Play again" : "Play ball"}
          </button>
        )}
      </div>
      <p className="mono game-hint">Swing with space, a click on the field, or the Swing button. Three hits in a row supercharges your next swing.</p>
    </div>
  );
}
