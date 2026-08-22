import { AtlasShell } from "../components/AtlasShell";
import { AdSlot } from "../components/AdSlot";
import { stories } from "../site-data";

export default function StoriesPage() {
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
          In-depth technical field notes on ground effect aerodynamics, tire chemistry, 2026 regulations, telemetry traces, and racecraft psychology.
        </p>
      </section>

      {/* Leaderboard Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      <section className="stories-index">
        {stories.map((story, index) => (
          <article key={story.slug} className="story-card-item">
            <div className="story-card-meta">
              <span>0{index + 1} / {story.tag}</span>
              <time>{story.minutes} READ</time>
            </div>
            <h2>{story.title}</h2>
            <p className="story-deck">{story.deck}</p>
            <div className="story-author-tag">
              <small>By {story.author}</small>
            </div>
            <a href={`/stories/${story.slug}`} className="read-note-link">
              READ FIELD NOTE <b>↗</b>
            </a>
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
