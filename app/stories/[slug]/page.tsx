import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AtlasShell } from "../../components/AtlasShell";
import { AdSlot } from "../../components/AdSlot";
import { getStory, stories } from "../../site-data";

export function generateStaticParams() {
  return stories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};

  return {
    title: `${story.title} — Apex Atlas Technical Journal`,
    description: story.deck,
    openGraph: {
      title: story.title,
      description: story.deck,
      type: "article",
      publishedTime: story.publishedAt,
      authors: [story.author],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.deck,
    },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const relatedStories = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: story.title,
    description: story.deck,
    datePublished: story.publishedAt,
    author: {
      "@type": "Person",
      name: story.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Apex Atlas",
      url: "https://apexatlas.online",
    },
    keywords: [story.tag, "Motorsport Engineering", "Formula 1", "Telemetry", "Aerodynamics"],
  };

  return (
    <AtlasShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="story-reading">
        <nav className="story-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1rem", fontSize: "0.8rem", opacity: 0.7 }}>
          <Link href="/">Home</Link> / <Link href="/stories">Technical Journal</Link> / <span>{story.tag}</span>
        </nav>

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
            <small>Apex Atlas Technical Analysis Desk · Peer-Reviewed Motorsport Engineering</small>
          </div>
        </div>

        {/* Key Takeaways Card */}
        {story.keyTakeaways && story.keyTakeaways.length > 0 && (
          <div className="aa-key-takeaways-card">
            <div className="takeaways-header">
              <span className="icon">⚡</span>
              <b>EXECUTIVE BRIEFING / KEY TAKEAWAYS</b>
            </div>
            <ul>
              {story.keyTakeaways.map((point: string, idx: number) => (
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
        {story.sections.map((section: { heading: string; text: string }, index: number) => (
          <section key={section.heading} className="story-section-block">
            <span>0{index + 1}</span>
            <h2>{section.heading}</h2>
            {section.text.split("\n\n").map((paragraph: string, pIdx: number) => (
              <p key={pIdx}>{paragraph}</p>
            ))}

            {/* Tasteful in-article ad slot halfway through reading */}
            {index === 2 && (
              <div className="aa-story-ad-wrap" style={{ margin: "2rem 0" }}>
                <AdSlot format="in-article" />
              </div>
            )}
          </section>
        ))}

        {/* Technical Glossary */}
        {story.glossary && story.glossary.length > 0 && (
          <div className="aa-story-glossary">
            <h3>TECHNICAL MOTORSPORT GLOSSARY</h3>
            <div className="glossary-grid">
              {story.glossary.map((item: { term: string; definition: string }) => (
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
