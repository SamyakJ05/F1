import type { Metadata } from "next";
import Link from "next/link";
import { AtlasShell } from "../components/AtlasShell";
import { AdSlot } from "../components/AdSlot";
import { stories } from "../site-data";

export const metadata: Metadata = {
  title: "Motorsport Engineering Field Journal — Apex Atlas",
  description: "In-depth technical field notes and telemetry explainers on ground effect aerodynamics, tire polymer chemistry, 2026 active aero regulations, and racecraft physics.",
};

export default function StoriesPage() {
  const categories = Array.from(new Set(stories.map((s) => s.tag)));

  return (
    <AtlasShell>
      <section className="atlas-hero stories-hero">
        <p className="section-kicker">
          <span>05</span> FIELD JOURNAL &amp; MOTORSPORT ENGINEERING
        </p>
        <h1>
          Read the race<br />
          <em>differently.</em>
        </h1>
        <p>
          Peer-reviewed technical field notes on ground effect aerodynamics, viscoelastic tire chemistry, 2026 regulations, suspension kinematics, and racecraft psychology.
        </p>

        {/* Quick topic tags */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
          {categories.map((cat) => (
            <span
              key={cat}
              style={{
                fontSize: "0.75rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.15)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Leaderboard Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      <section className="stories-index">
        {stories.map((story, index) => (
          <article key={story.slug} className="story-card-item">
            <div className="story-card-meta">
              <span>{String(index + 1).padStart(2, "0")} / {story.tag}</span>
              <time>{story.minutes} READ · {story.publishedAt}</time>
            </div>
            <h2>{story.title}</h2>
            <p className="story-deck">{story.deck}</p>
            <div className="story-author-tag" style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}>
              <small style={{ opacity: 0.85 }}>By {story.author}</small>
            </div>
            <Link href={`/stories/${story.slug}`} className="read-note-link">
              READ FIELD NOTE <b>↗</b>
            </Link>
          </article>
        ))}
      </section>

      {/* In-Article Native Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="in-article" />
      </div>
    </AtlasShell>
  );
}
