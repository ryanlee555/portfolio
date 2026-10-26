import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono, Hanken_Grotesk } from "next/font/google";
import BaseLink from "@/components/BaseLink";
import Cursor from "@/components/Cursor";
import Dock from "@/components/Dock";
import Loader from "@/components/Loader";
import { contact, profile } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const body = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description: "Ryan Lee's portfolio: experience, projects, and interests, laid out like a baseball diamond.",
};

// Runs before first paint so the intro either plays or stays hidden without a flash.
const introScript = `(function(){var d=document.documentElement;try{d.dataset.intro=sessionStorage.getItem("intro-seen")==="1"?"seen":"playing"}catch(e){d.dataset.intro="seen"}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: introScript }}
        />
      </head>
      <body>
        <Loader />
        <div className="site">
          <header className="top">
            <BaseLink index={0} className="mark">
              {profile.name}
            </BaseLink>
            <nav className="top-links mono" aria-label="Elsewhere">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="foot mono">
            <span>{profile.name}</span>
            <span>Click a base, or use the ← → keys</span>
          </footer>
          <Dock />
        </div>
        <Cursor />
      </body>
    </html>
  );
}
