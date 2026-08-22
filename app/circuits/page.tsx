import { AtlasShell } from "../components/AtlasShell";
import { circuits } from "../site-data";

export default function CircuitsPage() {
  return <AtlasShell><section className="atlas-hero"><p className="section-kicker"><span>01</span> CIRCUIT ATLAS</p><h1>Read the track<br /><em>before the apex.</em></h1><p>Each guide turns a circuit into a collection of decisions: where the grip changes, what the car needs, and why one line works better than another.</p></section><section className="atlas-grid-section"><div className="circuit-library">{circuits.map((circuit, index) => <article className="circuit-library-card" key={circuit.slug}><div className="circuit-card-art"><img src={`/media/${circuit.slug}-diorama.png`} alt={`${circuit.name} aerial circuit illustration`} /><span>0{index + 1}</span><b>{circuit.country.toUpperCase()}</b></div><p>{circuit.character.toUpperCase()}</p><h2>{circuit.name}</h2><div className="card-specs"><span>{circuit.distance}</span><span>{circuit.turns}</span><span>{circuit.lapType}</span></div><a href={`/circuits/${circuit.slug}`}>OPEN CIRCUIT NOTE <span>↗</span></a></article>)}</div></section></AtlasShell>;
}
