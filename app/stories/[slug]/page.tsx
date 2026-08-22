import { notFound } from "next/navigation";
import Link from "next/link";
import { AtlasShell } from "../../components/AtlasShell";
import { AdSlot } from "../../components/AdSlot";
import { getStory, stories } from "../../site-data";

export function generateStaticParams() {
  return stories.map(({ slug }) => ({ slug }));
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const relatedStories = stories.filter((s) => s.slug !== story.slug).slice(0, 2);

  return (
    <AtlasShell>
      <article className="story-reading">
        <div className="story-top-meta">
          <p className="section-kicker">
            <span>{story.tag}</span> {story.minutes} COMPREHENSIVE READ
          </p>
          <time className="published-date">Published {story.publishedAt}</time>
        </div>

        <h1>{story.title}</h1>
        <p className="story-deck">{story.deck}</p>

        <div className="story-author-byline">
          <div className="author-avatar">{story.author.charAt(0)}</div>
          <div>
            <strong>{story.author}</strong>
            <small>Apex Atlas Technical Analysis Desk</small>
          </div>
        </div>

        {/* Top Banner Ad */}
        <div className="aa-story-ad-wrap">
          <AdSlot format="horizontal" />
        </div>

        {/* Key Takeaways Card */}
        {story.keyTakeaways && story.keyTakeaways.length > 0 && (
          <div className="aa-key-takeaways-card">
            <div className="takeaways-header">
              <span className="icon">⚡</span>
              <b>EXECUTIVE BRIEFING / KEY TAKEAWAYS</b>
            </div>
            <ul>
              {story.keyTakeaways.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="story-rule">
          <i />
          <span>FIELD NOTE / APEX ATLAS TECHNICAL JOURNAL</span>
        </div>

        {/* Technical Sections */}
        {story.sections.map((section, index) => (
          <section key={section.heading} className="story-section-block">
            <span>0{index + 1}</span>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </section>
        ))}

        {/* In-Article Native Ad */}
        <div className="aa-story-ad-wrap">
          <AdSlot format="in-article" />
        </div>

        {/* Technical Glossary */}
        {story.glossary && story.glossary.length > 0 && (
          <div className="aa-story-glossary">
            <h3>TECHNICAL MOTORSPORT GLOSSARY</h3>
            <div className="glossary-grid">
              {story.glossary.map((item) => (
                <div key={item.term} className="glossary-item">
                  <strong>{item.term}</strong>
                  <p>{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="story-closer">
          Motorsport is where physics, chemical engineering, and human courage meet.
        </div>
      </article>

      {/* Related Stories Navigation */}
      <section className="aa-related-stories-section">
        <div className="related-head">
          <span>RELATED MOTORSPORT FIELD NOTES</span>
          <h2>Continue Reading</h2>
        </div>
        <div className="related-grid">
          {relatedStories.map((rel) => (
            <article key={rel.slug} className="related-card">
              <span className="rel-tag">{rel.tag} · {rel.minutes}</span>
              <h3>{rel.title}</h3>
              <p>{rel.deck}</p>
              <Link href={`/stories/${rel.slug}`}>READ NOTE ↗</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="next-step">
        <span>KEEP READING</span>
        <Link href="/stories">RETURN TO FIELD JOURNAL ↗</Link>
      </section>
    </AtlasShell>
  );
}
