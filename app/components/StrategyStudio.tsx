"use client";

import { useMemo, useState } from "react";

type Compound = "Soft" | "Medium" | "Hard" | "Inters";
type TrackState = "Standard Dry" | "High Thermal Deg" | "Damp Crossover";
type PitStopCondition = "Green Flag (21.5s)" | "Virtual Safety Car (16.2s)" | "Full Safety Car (12.8s)";

export function StrategyStudio() {
  const [startCompound, setStartCompound] = useState<Compound>("Medium");
  const [secondCompound, setSecondCompound] = useState<Compound>("Hard");
  const [pitLap, setPitLap] = useState<number>(26);
  const [trackCondition, setTrackCondition] = useState<TrackState>("Standard Dry");
  const [pitCondition, setPitCondition] = useState<PitStopCondition>("Green Flag (21.5s)");
  const [rivalStopsLater, setRivalStopsLater] = useState<number>(3); // laps later

  const totalLaps = 72; // Zandvoort default

  // Calculate degradation curves
  const stintData = useMemo(() => {
    const compBasePace: Record<Compound, number> = {
      Soft: 72.2,
      Medium: 73.0,
      Hard: 73.8,
      Inters: 78.5,
    };

    const compDegRate: Record<Compound, number> = {
      Soft: trackCondition === "High Thermal Deg" ? 0.14 : 0.09,
      Medium: trackCondition === "High Thermal Deg" ? 0.08 : 0.05,
      Hard: trackCondition === "High Thermal Deg" ? 0.04 : 0.025,
      Inters: 0.12,
    };

    let totalRaceTime = 0;
    const lapTimes: number[] = [];

    // Stint 1
    for (let lap = 1; lap <= pitLap; lap++) {
      const tireAge = lap;
      const deg = Math.pow(tireAge * compDegRate[startCompound], 1.2);
      const time = compBasePace[startCompound] + deg;
      lapTimes.push(time);
      totalRaceTime += time;
    }

    // Pit loss
    const pitLossSeconds =
      pitCondition === "Full Safety Car (12.8s)"
        ? 12.8
        : pitCondition === "Virtual Safety Car (16.2s)"
        ? 16.2
        : 21.5;
    totalRaceTime += pitLossSeconds;

    // Stint 2
    for (let lap = pitLap + 1; lap <= totalLaps; lap++) {
      const tireAge = lap - pitLap;
      const deg = Math.pow(tireAge * compDegRate[secondCompound], 1.2);
      const time = compBasePace[secondCompound] + deg;
      lapTimes.push(time);
      totalRaceTime += time;
    }

    // Undercut calculation
    const outLapGainPerLap = compBasePace[startCompound] + Math.pow(pitLap * compDegRate[startCompound], 1.2) - compBasePace[secondCompound];
    const netUndercutGain = outLapGainPerLap * rivalStopsLater;

    return {
      lapTimes,
      totalRaceTime,
      pitLossSeconds,
      netUndercutGain,
    };
  }, [startCompound, secondCompound, pitLap, trackCondition, pitCondition, rivalStopsLater]);

  return (
    <div className="aa-strategy-studio" aria-label="Interactive Race Strategy Studio">
      <div className="aa-strategy-header">
        <div>
          <span className="aa-kicker"><span>04</span> TACTICAL DECISION ENGINE</span>
          <h2>Race Strategy &amp; Undercut Simulator</h2>
          <p>Model non-linear tire thermal degradation, pit delta windows, and undercut efficacy in real time.</p>
        </div>
      </div>

      <div className="aa-strategy-grid">
        {/* Controls Panel */}
        <div className="aa-strategy-controls">
          <div className="aa-control-group">
            <label>STARTING TIRE COMPOUND</label>
            <div className="aa-compound-selector">
              {(["Soft", "Medium", "Hard"] as Compound[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`compound-btn ${c.toLowerCase()} ${startCompound === c ? "active" : ""}`}
                  onClick={() => setStartCompound(c)}
                >
                  <span className="dot" /> {c}
                </button>
              ))}
            </div>
          </div>

          <div className="aa-control-group">
            <label>SECOND STINT COMPOUND</label>
            <div className="aa-compound-selector">
              {(["Soft", "Medium", "Hard"] as Compound[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`compound-btn ${c.toLowerCase()} ${secondCompound === c ? "active" : ""}`}
                  onClick={() => setSecondCompound(c)}
                >
                  <span className="dot" /> {c}
                </button>
              ))}
            </div>
          </div>

          <div className="aa-control-group">
            <div className="label-val-row">
              <label>PLANNED PIT STOP LAP</label>
              <strong>LAP {pitLap} <small>/ {totalLaps}</small></strong>
            </div>
            <input
              type="range"
              min="10"
              max="58"
              value={pitLap}
              onChange={(e) => setPitLap(Number(e.target.value))}
              aria-label="Planned pit stop lap slider"
            />
            <div className="range-hints">
              <span>Lap 10 (Early Undercut)</span>
              <span>Lap 58 (Long Overcut)</span>
            </div>
          </div>

          <div className="aa-control-group">
            <div className="label-val-row">
              <label>RIVAL PIT OFFSET</label>
              <strong>+{rivalStopsLater} LAPS LATER</strong>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={rivalStopsLater}
              onChange={(e) => setRivalStopsLater(Number(e.target.value))}
              aria-label="Rival pit offset laps"
            />
            <div className="range-hints">
              <span>+1 Lap (Immediate cover)</span>
              <span>+8 Laps (Extended overcut)</span>
            </div>
          </div>

          <div className="aa-control-group">
            <label>TRACK ENVIRONMENT &amp; DEGRADATION</label>
            <div className="aa-pill-selector">
              {(["Standard Dry", "High Thermal Deg", "Damp Crossover"] as TrackState[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={trackCondition === t ? "active" : ""}
                  onClick={() => setTrackCondition(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="aa-control-group">
            <label>PIT LANE NEUTRALIZATION STATE</label>
            <div className="aa-pill-selector">
              {(["Green Flag (21.5s)", "Virtual Safety Car (16.2s)", "Full Safety Car (12.8s)"] as PitStopCondition[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={pitCondition === p ? "active" : ""}
                  onClick={() => setPitCondition(p)}
                >
                  {p.split(" ")[0]} ({p.match(/\((.*?)\)/)?.[1]})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visualizer & Metrics */}
        <div className="aa-strategy-visualizer">
          <div className="aa-telemetry-box">
            <div className="aa-telemetry-head">
              <span>PROJECTED STINT PACE CURVE</span>
              <small>LAPS 1 TO {totalLaps}</small>
            </div>
            <div className="aa-pace-visual">
              {stintData.lapTimes.filter((_, idx) => idx % 3 === 0).map((time, idx) => {
                const lapNum = idx * 3 + 1;
                const isPit = Math.abs(lapNum - pitLap) < 2;
                const heightPercent = Math.min(100, Math.max(15, (time - 71) * 16));
                return (
                  <div key={lapNum} className={`aa-pace-bar ${isPit ? "pit-bar" : ""}`}>
                    <div className="bar-fill" style={{ height: `${heightPercent}%` }} />
                    {isPit && <span className="pit-flag">PIT</span>}
                  </div>
                );
              })}
            </div>
            <div className="aa-visual-legend">
              <span>STINT 1: {startCompound.toUpperCase()} (Laps 1–{pitLap})</span>
              <span className="pit-marker">● PIT WINDOW</span>
              <span>STINT 2: {secondCompound.toUpperCase()} (Laps {pitLap + 1}–{totalLaps})</span>
            </div>
          </div>

          <div className="aa-metrics-strip">
            <div className="aa-metric-card">
              <span>UNDERCUT DELTA</span>
              <strong className={stintData.netUndercutGain >= 0 ? "positive" : "negative"}>
                {stintData.netUndercutGain >= 0 ? "+" : ""}{stintData.netUndercutGain.toFixed(2)}s
              </strong>
              <small>Over rival pitting {rivalStopsLater} laps later</small>
            </div>

            <div className="aa-metric-card">
              <span>EFFECTIVE PIT LOSS</span>
              <strong>{stintData.pitLossSeconds.toFixed(1)}s</strong>
              <small>{pitCondition.split(" ")[0]} conditions</small>
            </div>

            <div className="aa-metric-card">
              <span>STRATEGY RATING</span>
              <strong className="score">
                {pitLap >= 22 && pitLap <= 34 ? "OPTIMAL 96%" : pitLap < 20 ? "AGGRESSIVE 82%" : "RISKY 68%"}
              </strong>
              <small>
                {pitLap >= 22 && pitLap <= 34
                  ? "Balanced tire life & traffic exit"
                  : pitLap < 20
                  ? "Vulnerable to high end-of-race tire degradation"
                  : "High risk of losing track position"}
              </small>
            </div>
          </div>

          <div className="aa-strategy-field-note">
            <b>RACE STRATEGIST VERDICT:</b>
            <p>
              Starting on {startCompound} and swapping to {secondCompound} on Lap {pitLap} creates a{" "}
              <strong>{stintData.netUndercutGain.toFixed(1)}s delta advantage</strong> over cars holding track position.
              {pitCondition.includes("Safety") && " A safety car deployment during this window saves over 8 seconds in the pit cycle."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
