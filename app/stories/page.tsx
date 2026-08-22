import { AtlasShell } from "../components/AtlasShell";
import { stories } from "../site-data";

export default function StoriesPage() {
  return <AtlasShell><section className="atlas-hero stories-hero"><p className="section-kicker"><span>05</span> FIELD JOURNAL</p><h1>Read the race<br /><em>differently.</em></h1><p>Original explainers on the systems and decisions behind motorsport, built for readers who value context over noise.</p></section><section className="stories-index">{stories.map((story, index) => <article key={story.slug}><span>0{index + 1} / {story.tag} / {story.minutes}</span><h2>{story.title}</h2><p>{story.deck}</p><a href={`/stories/${story.slug}`}>READ FIELD NOTE <b>↗</b></a></article>)}</section></AtlasShell>;
}
