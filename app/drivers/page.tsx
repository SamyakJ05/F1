"use client";

import { useState } from "react";
import { AtlasShell } from "../components/AtlasShell";
import { DriverCompare } from "../components/DriverCompare";
import { AdSlot } from "../components/AdSlot";
import { getDriversBySeason, getTeamsBySeason } from "../site-data";

export default function DriversPage() {
  const [season, setSeason] = useState<"2026" | "2024">("2026");

  const drivers = getDriversBySeason(season);
  const teams = getTeamsBySeason(season);

  return (
    <AtlasShell>
      <section className="atlas-hero">
        <p className="section-kicker">
          <span>02</span> WORLD CHAMPIONSHIP STANDINGS &amp; BATTLES
        </p>
        <h1>
          Drivers &amp;<br />
          <em>Telemetry.</em>
        </h1>
        <p>
          Championship standings, constructor points, teammate qualifying head-to-heads, and interactive telemetry comparison.
        </p>

        {/* Interactive Season Switcher */}
        <div className="aa-season-switch-bar" style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className={`aa-button ${season === "2026" ? "aa-button-light" : "aa-button-ghost"}`}
            onClick={() => setSeason("2026")}
            style={{ fontSize: "0.82rem", padding: "0.55rem 1.1rem" }}
          >
            ● 2026 Active Season (Live Hub)
          </button>
          <button
            type="button"
            className={`aa-button ${season === "2024" ? "aa-button-light" : "aa-button-ghost"}`}
            onClick={() => setSeason("2024")}
            style={{ fontSize: "0.82rem", padding: "0.55rem 1.1rem" }}
          >
            🏆 2024 Season Standings (Verstappen / McLaren)
          </button>
        </div>
      </section>

      {/* Leaderboard Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      {/* Head to Head Comparison Component */}
      <section className="aa-section-pad">
        <DriverCompare season={season} />
      </section>

      {/* Constructor Championship Standings Table */}
      <section className="aa-constructors-section">
        <div className="aa-constructors-head">
          <div>
            <span className="aa-kicker"><span>CHAMPIONSHIP</span> CONSTRUCTORS BATTLE</span>
            <h2>{season} Constructors Championship</h2>
          </div>
          <p>Scoring points on both sides of the garage dictates development prize payouts.</p>
        </div>

        <div className="aa-teams-grid">
          {teams.map((team, idx) => (
            <article key={team.id} className="aa-team-card">
              <div className="team-top">
                <span className="rank">{String(idx + 1).padStart(2, "0")}</span>
                <span className="engine">{team.engine}</span>
              </div>
              <h3>{team.name}</h3>
              <p className="drivers">Drivers: {team.leadDrivers}</p>
              <div className="team-stats">
                <div><span>POINTS</span><b>{team.points}</b></div>
                <div><span>WINS</span><b>{team.wins}</b></div>
                <div><span>PODIUMS</span><b>{team.podiums}</b></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* In-Content Native Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="in-article" />
      </div>

      {/* Full Driver Roster Table */}
      <section className="aa-driver-roster-section">
        <div className="aa-roster-head">
          <h2>Official {season} Driver Standings</h2>
          <small>{season === "2026" ? "Live Standings after Round 11" : "Final Official FIA Championship Standings"}</small>
        </div>

        <div className="aa-roster-table">
          <div className="roster-header-row">
            <span>POS</span>
            <span>DRIVER</span>
            <span>TEAM</span>
            <span>WINS</span>
            <span>PODIUMS</span>
            <span>POINTS</span>
          </div>
          {drivers.map((d, i) => (
            <div key={d.id} className="roster-data-row">
              <span className="pos">{String(i + 1).padStart(2, "0")}</span>
              <span className="driver-name">
                <b>#{d.number} {d.name}</b> <small>({d.country})</small>
              </span>
              <span className="team">{d.team}</span>
              <span className="wins">{d.wins}</span>
              <span className="podiums">{d.podiums}</span>
              <strong className="points">{d.points} PTS</strong>
            </div>
          ))}
        </div>
      </section>
    </AtlasShell>
  );
}
