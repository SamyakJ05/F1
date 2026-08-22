"use client";

import { useMemo } from "react";
import { getTrackGeometry } from "../circuit-map-data";

type Props = {
  slug: string;
  name: string;
  className?: string;
};

// Generates smooth, high-precision SVG path data from high-density GPS coordinates with fail-safe validation
function pointsToSvgPath(points: [number, number][]): string {
  if (!Array.isArray(points) || points.length < 2) return "";

  const validPoints = points.filter(
    (p) => Array.isArray(p) && p.length === 2 && Number.isFinite(p[0]) && Number.isFinite(p[1])
  );

  const n = validPoints.length;
  if (n < 2) return "";

  try {
    let d = `M ${validPoints[0][0]},${validPoints[0][1]} `;

    for (let i = 0; i < n; i++) {
      const p0 = validPoints[(i - 1 + n) % n];
      const p1 = validPoints[i];
      const p2 = validPoints[(i + 1) % n];
      const p3 = validPoints[(i + 2) % n];

      if (!p0 || !p1 || !p2 || !p3) continue;

      const tension = 0.15;
      const cp1x = p1[0] + ((p2[0] - p0[0]) * tension);
      const cp1y = p1[1] + ((p2[1] - p0[1]) * tension);
      const cp2x = p2[0] - ((p3[0] - p1[0]) * tension);
      const cp2y = p2[1] - ((p3[1] - p1[1]) * tension);

      if (Number.isFinite(cp1x) && Number.isFinite(cp1y) && Number.isFinite(cp2x) && Number.isFinite(cp2y)) {
        d += `C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0]},${p2[1]} `;
      } else {
        d += `L ${p2[0]},${p2[1]} `;
      }
    }

    d += "Z";
    return d;
  } catch {
    // Fallback to simple line-to path
    return `M ${validPoints.map((p) => `${p[0]},${p[1]}`).join(" L ")} Z`;
  }
}

export function CircuitMap({ slug, name, className = "" }: Props) {
  const track = useMemo(() => getTrackGeometry(slug), [slug]);
  const relationUrl =
    track.osmUrl ??
    (track.osmRelationId
      ? `https://www.openstreetmap.org/relation/${track.osmRelationId}`
      : "https://www.openstreetmap.org/copyright");

  const startFinishPoint = track.startFinish || (track.paths && track.paths[0] && track.paths[0][0]);

  return (
    <figure className={`circuit-map ${className}`}>
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${name} official circuit layout`}
      >
        <title>{`${name} circuit layout`}</title>
        <defs>
          <filter id={`glow-${slug}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
        </defs>

        {/* Technical Coordinate Grid Background */}
        <rect width="100" height="100" className="map-grid-base" />
        {[20, 40, 60, 80].map((mark) => (
          <g key={mark} className="map-grid-lines">
            <line x1={mark} x2={mark} y1="0" y2="100" />
            <line x1="0" x2="100" y1={mark} y2={mark} />
          </g>
        ))}

        {/* Real GPS Track Paths */}
        {track.paths && track.paths.map((points, index) => {
          const pathD = pointsToSvgPath(points);
          if (!pathD) return null;

          return (
            <g key={index} className="circuit-track-group">
              {/* Outer Neon Glow */}
              <path
                d={pathD}
                className="track-glow"
                filter={`url(#glow-${slug})`}
              />
              {/* Asphalt Casing */}
              <path
                d={pathD}
                className="track-casing"
              />
              {/* Primary Racing Line */}
              <path
                d={pathD}
                className="track-line"
              />
            </g>
          );
        })}

        {/* Start / Finish Gate Marker */}
        {startFinishPoint && Number.isFinite(startFinishPoint[0]) && Number.isFinite(startFinishPoint[1]) && (
          <g className="track-start-finish-marker" transform={`translate(${startFinishPoint[0]}, ${startFinishPoint[1]})`}>
            <circle r="2.8" fill="#c7ff31" opacity="0.35" />
            <circle r="1.5" fill="#c7ff31" />
            <line x1="-2" y1="-2" x2="2" y2="2" stroke="#080a0a" strokeWidth="0.8" />
          </g>
        )}
      </svg>

      <figcaption>
        Track telemetry{" "}
        <a href={relationUrl} target="_blank" rel="noreferrer">
          © OpenStreetMap contributors
        </a>{" "}
        ·{" "}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
          ODbL
        </a>
      </figcaption>
    </figure>
  );
}
