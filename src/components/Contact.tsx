"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/site";

// Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree form URL) to deliver messages directly.
// Without it, submitting opens the visitor's email app with the message filled in.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error" | "mailto";

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

function MessageForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!FORM_ENDPOINT) {
      const body = [data.message, "", data.name, data.email, data.phone].filter((l) => l !== undefined).join("\n");
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        `Portfolio message from ${data.name}`,
      )}&body=${encodeURIComponent(body.trim())}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const message = {
    idle: "",
    sending: "Sending…",
    sent: "Thanks! Your message is on its way, and I'll get back to you soon.",
    error: `That didn't go through. Try again, or email me at ${contact.email}.`,
    mailto: "Your email app should open with the message filled in.",
  }[status];

  return (
    <form className="board-form" onSubmit={onSubmit}>
      <h3 className="form-title">Send a message</h3>
      <label className="field">
        <span>NAME</span>
        <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
      </label>
      <label className="field">
        <span>EMAIL</span>
        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </label>
      <label className="field">
        <span>
          PHONE <em>optional</em>
        </span>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" />
      </label>
      <label className="field">
        <span>MESSAGE</span>
        <textarea id="contact-message" name="message" rows={4} placeholder="Type your message…" required />
      </label>
      <input type="text" name="_gotcha" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="b-submit" disabled={status === "sending"}>
        {status === "sending" ? "SENDING…" : "SEND MESSAGE"}
      </button>
      <p className="form-status" role="status">
        {message}
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <section className="board" aria-labelledby="contact-title">
      <div className="board-head">
        <span className="bm">SCOREBOARD</span>
        <span className="bm">ANY QUESTIONS?</span>
      </div>
      <div className="board-body">
        <div className="board-info">
          <h2 className="board-title" id="contact-title">
            {contact.heading}
          </h2>
          <p className="board-text">{contact.blurb}</p>
          <div className="b-rows">
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
          </div>
        </div>
        <MessageForm />
      </div>
    </section>
  );
}
