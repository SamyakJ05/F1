import { CircuitSlug, trackGeometry } from "../circuit-map-data";

type Props = {
  slug: CircuitSlug;
  name: string;
  className?: string;
};

export function CircuitMap({ slug, name, className = "" }: Props) {
  const track = trackGeometry[slug];
  const relationUrl = `https://www.openstreetmap.org/relation/${track.osmRelationId}`;

  return <figure className={`circuit-map ${className}`}>
    <svg viewBox="0 0 100 100" role="img" aria-label={`${name} circuit layout, derived from OpenStreetMap raceway geometry`}>
      <title>{name} circuit layout</title>
      <defs>
        <filter id={`glow-${slug}`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.4" /></filter>
      </defs>
      <rect width="100" height="100" className="map-grid-base" />
      {[20, 40, 60, 80].map((mark) => <g key={mark} className="map-grid-lines"><line x1={mark} x2={mark} y1="0" y2="100" /><line x1="0" x2="100" y1={mark} y2={mark} /></g>)}
      {track.paths.map((points, index) => {
        const pointList = points.map(([x, y]) => `${x},${y}`).join(" ");
        return <g key={index}><polyline points={pointList} className="track-glow" filter={`url(#glow-${slug})`} /><polyline points={pointList} className="track-casing" /><polyline points={pointList} className="track-line" /></g>;
      })}
    </svg>
    <figcaption>Track geometry <a href={relationUrl} target="_blank" rel="noreferrer">© OpenStreetMap contributors</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">ODbL</a></figcaption>
  </figure>;
}
