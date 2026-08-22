import { notFound } from "next/navigation";
import { AtlasShell } from "../../components/AtlasShell";
import { getStory, stories } from "../../site-data";

export function generateStaticParams() { return stories.map(({ slug }) => ({ slug })); }

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  return <AtlasShell><article className="story-reading"><p className="section-kicker"><span>{story.tag}</span> {story.minutes} READ</p><h1>{story.title}</h1><p className="story-deck">{story.deck}</p><div className="story-rule"><i /><span>FIELD NOTE / APEX ATLAS</span></div>{story.sections.map((section, index) => <section key={section.heading}><span>0{index + 1}</span><h2>{section.heading}</h2><p>{section.text}</p></section>)}<div className="story-closer">The details are where the race gets interesting.</div></article><section className="next-step"><span>KEEP READING</span><a href="/stories">RETURN TO FIELD JOURNAL ↗</a></section></AtlasShell>;
}
