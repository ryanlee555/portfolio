"use client";

import { useState } from "react";
import { contact } from "@/content/site";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <button type="button" className="b-act" onClick={copy}>
      {copied ? "COPIED" : "COPY"}
    </button>
  );
}

export default function Scoreboard() {
  return (
    <section className="board" aria-labelledby="board-title">
      <div className="board-head">
        <span className="bm">SCOREBOARD</span>
        <span className="bm">CONTACT</span>
      </div>
      <h2 className="board-title" id="board-title">
        Any questions? Reach out through the links below.
      </h2>
      <div className="b-row">
        <span className="b-lamp" />
        <span className="b-k">EMAIL</span>
        <span className="b-v">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </span>
        <CopyButton text={contact.email} />
      </div>
      <div className="b-row">
        <span className="b-lamp" />
        <span className="b-k">PHONE</span>
        <span className="b-v">
          <a href={contact.phoneHref}>{contact.phone}</a>
        </span>
        <CopyButton text={contact.phone} />
      </div>
      <div className="b-row">
        <span className="b-lamp" />
        <span className="b-k">LINKEDIN</span>
        <span className="b-v">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            {contact.linkedinLabel}
          </a>
        </span>
        <a className="b-act" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
          OPEN ↗
        </a>
      </div>
    </section>
  );
}
