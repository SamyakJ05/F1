"use client";

import { useState } from "react";
import Link from "next/link";
import { AtlasShell } from "../components/AtlasShell";
import { CircuitMap } from "../components/CircuitMap";
import { AdSlot } from "../components/AdSlot";
import { calendar2026, calendar2026SourceUrl, circuits } from "../site-data";

export default function CircuitsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCircuits = circuits.filter((circuit) => {
    const matchesRegion = selectedRegion === "All" || circuit.region === selectedRegion;
    const matchesSearch =
      circuit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circuit.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circuit.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <AtlasShell>
      <section className="atlas-hero">
        <p className="section-kicker">
          <span>01</span> 2026 WORLD CHAMPIONSHIP CIRCUIT ATLAS
        </p>
        <h1>
          Read the track<br />
          <em>before the apex.</em>
        </h1>
        <p>
          Real-geometry circuit notes, corner-by-corner analysis, DRS zones, and strategic telemetry for all 23 Grand Prix venues.
        </p>
      </section>

      {/* Top Leaderboard Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      <section className="atlas-grid-section">
        {/* Filter & Search Bar */}
        <div className="aa-circuit-filter-bar">
          <div className="aa-region-pills">
            {(["All", "Europe", "Americas", "Asia-Pacific", "Middle East"] as const).map((region) => (
              <button
                key={region}
                type="button"
                className={selectedRegion === region ? "active" : ""}
                onClick={() => setSelectedRegion(region)}
              >
                {region.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="aa-circuit-search">
            <input
              type="text"
              placeholder="Search circuits by name or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter circuits"
            />
          </div>
        </div>

        {/* 23 Circuit Cards Grid */}
        <div className="circuit-library">
          {filteredCircuits.map((circuit, index) => (
            <article className="circuit-library-card" key={circuit.slug}>
              <div className="circuit-card-art">
                <CircuitMap slug={circuit.slug} name={circuit.name} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{circuit.country.toUpperCase()}</b>
              </div>
              <p>{circuit.character.toUpperCase()}</p>
              <h2>{circuit.name}</h2>
              <div className="card-specs">
                <span>{circuit.distance}</span>
                <span>{circuit.turns}</span>
                <span>{circuit.lapType}</span>
                <span>{circuit.drsZones} DRS ZONES</span>
              </div>
              <Link href={`/circuits/${circuit.slug}`}>
                OPEN CIRCUIT NOTE <span>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* In-Article Native Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="in-article" />
      </div>

      {/* 2026 Full Season Calendar */}
      <section className="calendar-section">
        <div className="calendar-heading">
          <div>
            <p className="section-kicker"><span>02</span> FULL 2026 SCHEDULE</p>
            <h2>
              2026 championship<br />
              <em>calendar.</em>
            </h2>
          </div>
          <div>
            <b>23 GRAND PRIX ROUNDS</b>
            <p>
              Official 2026 FIA World Championship schedule with verified venues. Circuit names are for editorial identification.
            </p>
            <a href={calendar2026SourceUrl} target="_blank" rel="noreferrer">
              VIEW OFFICIAL F1 CALENDAR ↗
            </a>
          </div>
        </div>

        <div className="calendar-grid">
          {calendar2026.map((race) => (
            <article key={race.round}>
              <span>ROUND {String(race.round).padStart(2, "0")}</span>
              <time>{race.date}</time>
              <h3>
                <Link href={`/circuits/${race.slug}`}>{race.circuit}</Link>
              </h3>
              <p>
                {race.country} <i>·</i> {race.city}
              </p>
              {race.note && <b>{race.note}</b>}
            </article>
          ))}
        </div>

        <p className="calendar-credit">
          Calendar data: <a href={calendar2026SourceUrl} target="_blank" rel="noreferrer">Formula 1 official schedule ↗</a>. Sepang venue replacement credited to <a href="https://www.formula1.com/en/latest/article/formula-1-and-fia-confirm-malaysia-will-join-2026-calendar-as-host-venue-for-bahrain-grand-prix.6lL7vjFEM2VVynRHvg1TCf" target="_blank" rel="noreferrer">Formula 1 and FIA announcement ↗</a>.
        </p>
      </section>
    </AtlasShell>
  );
}
