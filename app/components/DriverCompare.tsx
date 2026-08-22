"use client";

import { useState } from "react";
import { getDriversBySeason } from "../site-data";

type Props = {
  season?: "2026" | "2024";
};

export function DriverCompare({ season = "2026" }: Props) {
  const drivers = getDriversBySeason(season);
  const [customDriverAId, setCustomDriverAId] = useState<string | null>(null);
  const [customDriverBId, setCustomDriverBId] = useState<string | null>(null);

  // Safely resolve distinct Driver A and Driver B
  const driverA =
    drivers.find((d) => d.id === customDriverAId) ||
    drivers[0];

  const driverB =
    drivers.find((d) => d.id === customDriverBId && d.id !== driverA?.id) ||
    drivers.find((d) => d.id !== driverA?.id) ||
    drivers[1] ||
    drivers[0];

  if (!driverA || !driverB) return null;

  const compareStats = [
    { label: "Points", valA: driverA.points, valB: driverB.points, unit: "PTS" },
    { label: "Grand Prix Wins", valA: driverA.wins, valB: driverB.wins, unit: "" },
    { label: "Podiums", valA: driverA.podiums, valB: driverB.podiums, unit: "" },
    { label: "Pole Positions", valA: driverA.poles, valB: driverB.poles, unit: "" },
    { label: "Fastest Laps", valA: driverA.fastestLaps, valB: driverB.fastestLaps, unit: "" },
    { label: "Driver Rating", valA: driverA.rating, valB: driverB.rating, unit: "/100" },
    { label: "World Championships", valA: driverA.careerChampionships, valB: driverB.careerChampionships, unit: "TITLES" },
  ];

  return (
    <div className="aa-driver-compare" aria-label={`${season} Driver Head to Head Comparison`}>
      <div className="aa-compare-header">
        <div>
          <span className="aa-kicker"><span>03</span> HEAD-TO-HEAD INTELLIGENCE</span>
          <h2>{season} Driver Telemetry &amp; Battle Analysis</h2>
          <p>Compare one-lap pace, racecraft metrics, and championship points between any two drivers on the grid.</p>
        </div>
      </div>

      <div className="aa-selectors-row">
        <div className="aa-select-box">
          <label>DRIVER 1</label>
          <select
            value={driverA.id}
            onChange={(e) => setCustomDriverAId(e.target.value)}
            aria-label="Select first driver for comparison"
          >
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                #{d.number} {d.name} ({d.team})
              </option>
            ))}
          </select>
        </div>

        <div className="aa-vs-badge">VS</div>

        <div className="aa-select-box">
          <label>DRIVER 2</label>
          <select
            value={driverB.id}
            onChange={(e) => setCustomDriverBId(e.target.value)}
            aria-label="Select second driver for comparison"
          >
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                #{d.number} {d.name} ({d.team})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="aa-comparison-cards-grid">
        {/* Driver A Card */}
        <div className="aa-driver-profile">
          <div className="profile-top">
            <span>#{driverA.number}</span>
            <span>{driverA.country}</span>
          </div>
          <h3>{driverA.name}</h3>
          <p className="driver-team">{driverA.team}</p>

          <div className="driver-rating-badge">
            <span>RACE PACE INDEX</span>
            <strong>{driverA.rating}</strong>
          </div>

          <div className="driver-style-note">
            <b>DRIVING CHARACTERISTICS</b>
            <p>{driverA.drivingStyle}</p>
          </div>

          <div className="driver-teammate-battle">
            <span>QUALI: <b>{driverA.teammateH2HQuali}</b></span>
            <span>RACE: <b>{driverA.teammateH2HRace}</b></span>
          </div>
        </div>

        {/* Comparison Radar / Bar Center */}
        <div className="aa-comparison-table-wrap">
          <div className="aa-stats-table">
            {compareStats.map((stat) => {
              const isAWinner = stat.valA > stat.valB;
              const isBWinner = stat.valB > stat.valA;
              const maxVal = Math.max(stat.valA, stat.valB, 1);
              const pctA = Math.round((stat.valA / maxVal) * 100);
              const pctB = Math.round((stat.valB / maxVal) * 100);

              return (
                <div key={stat.label} className="aa-stat-row">
                  <div className="aa-bar-a-wrap">
                    <span className={`val ${isAWinner ? "winner" : ""}`}>
                      {stat.valA} {stat.unit}
                    </span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${pctA}%` }} />
                    </div>
                  </div>

                  <span className="stat-label">{stat.label.toUpperCase()}</span>

                  <div className="aa-bar-b-wrap">
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${pctB}%` }} />
                    </div>
                    <span className={`val ${isBWinner ? "winner" : ""}`}>
                      {stat.valB} {stat.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Driver B Card */}
        <div className="aa-driver-profile">
          <div className="profile-top">
            <span>#{driverB.number}</span>
            <span>{driverB.country}</span>
          </div>
          <h3>{driverB.name}</h3>
          <p className="driver-team">{driverB.team}</p>

          <div className="driver-rating-badge">
            <span>RACE PACE INDEX</span>
            <strong>{driverB.rating}</strong>
          </div>

          <div className="driver-style-note">
            <b>DRIVING CHARACTERISTICS</b>
            <p>{driverB.drivingStyle}</p>
          </div>

          <div className="driver-teammate-battle">
            <span>QUALI: <b>{driverB.teammateH2HQuali}</b></span>
            <span>RACE: <b>{driverB.teammateH2HRace}</b></span>
          </div>
        </div>
      </div>
    </div>
  );
}
