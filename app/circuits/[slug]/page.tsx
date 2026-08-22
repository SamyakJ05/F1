import { notFound } from "next/navigation";
import { AtlasShell } from "../../components/AtlasShell";
import { circuits, getCircuit } from "../../site-data";

export function generateStaticParams() { return circuits.map(({ slug }) => ({ slug })); }

export default async function CircuitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const circuit = getCircuit(slug);
  if (!circuit) notFound();
  return <AtlasShell><section className={`circuit-detail-hero ${circuit.slug}`}><img src={`/media/${circuit.slug}-diorama.png`} alt={`${circuit.name} aerial circuit illustration`} /><div className="circuit-detail-copy"><p className="section-kicker"><span>TRACK NOTE</span> {circuit.country.toUpperCase()}</p><h1>{circuit.name}</h1><p>{circuit.character}</p><b>{circuit.distance}<small>{circuit.turns} · {circuit.lapType}</small></b></div></section><article className="reading-layout"><aside><span>FIELD GUIDE</span><a href="#character">Character</a><a href="#lessons">Driving lessons</a><a href="#note">Field note</a></aside><div><p className="lead" id="character">{circuit.intro}</p><section id="lessons"><p className="section-kicker"><span>01</span> DRIVING LESSONS</p>{circuit.lessons.map((lesson, index) => <div className="lesson" key={lesson.title}><span>0{index + 1}</span><h2>{lesson.title}</h2><p>{lesson.text}</p></div>)}</section><blockquote id="note">“{circuit.fieldNote}”</blockquote><p className="source-note">Circuit reference: <a href={circuit.sourceUrl} target="_blank" rel="noreferrer">Formula 1 circuit guide ↗</a>. Visual is an original Apex Atlas 3D illustration.</p></div></article><section className="next-step"><span>KEEP EXPLORING</span><a href="/circuits">RETURN TO CIRCUIT ATLAS ↗</a></section></AtlasShell>;
}
