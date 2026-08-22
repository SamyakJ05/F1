"use client";

import { useState } from "react";
import { AtlasShell } from "../components/AtlasShell";
import { AdSlot } from "../components/AdSlot";

const systems = [
  {
    num: "01",
    title: "FRONT WING & Y250 VORTICES",
    desc: "The first aerodynamic surface to meet undisturbed air. Flap angle controls front-axle bite and directs outward outwash around the front tires to shield the underfloor.",
  },
  {
    num: "02",
    title: "VENTURI FLOOR & UNDERBODY TUNNELS",
    desc: "Generates over 60% of the total vehicle downforce with minimal drag penalty through Bernoulli pressure drops and aggressive floor edge vortex sealing.",
  },
  {
    num: "03",
    title: "SUSPENSION PLATFORM & HEAVE DAMPER",
    desc: "Maintains a millimetric aerodynamic ride-height platform at 330 km/h, preventing underfloor boundary layer stalls and porpoising across track bumps.",
  },
  {
    num: "04",
    title: "ACTIVE REAR WING & BEAM WING",
    desc: "Provides critical high-speed braking stability and expands the diffuser exit volume, with dual-mode active flap trimming for straight-line efficiency.",
  },
];

export default function CarLabPage() {
  const [aeroMode, setAeroMode] = useState<"Z-Mode (High Downforce)" | "X-Mode (Low Drag)">("Z-Mode (High Downforce)");
  const [wingTrim, setWingTrim] = useState<number>(68);

  const calculatedDownforceKg = Math.round(
    aeroMode === "Z-Mode (High Downforce)" ? 1200 + wingTrim * 12 : 550 + wingTrim * 4
  );
  const calculatedTopSpeedKmh = Math.round(
    aeroMode === "Z-Mode (High Downforce)" ? 342 - wingTrim * 0.35 : 368 - wingTrim * 0.15
  );
  const corneringGForce = (
    aeroMode === "Z-Mode (High Downforce)" ? 4.2 + (wingTrim / 100) * 1.1 : 3.1 + (wingTrim / 100) * 0.5
  ).toFixed(2);

  return (
    <AtlasShell>
      <section className="car-lab-hero">
        <div>
          <p className="section-kicker">
            <span>02</span> AA–01 CONCEPT MACHINE &amp; TELEMETRY LAB
          </p>
          <h1>
            Every surface<br />
            <em>has a job.</em>
          </h1>
          <p>
            An interactive aerodynamics and chassis lab exploring the trade-off between downforce, top speed, and 2026 active aero regulations.
          </p>
          <small>3D CONCEPT TELEMETRY PLATFORM</small>
        </div>
        <div className="car-lab-stage">
          <img
            src="/media/apex-racecar-hero.png"
            alt="Apex Atlas open-wheel concept car with aero pressure mapping"
          />
        </div>
      </section>

      {/* Top Banner Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      {/* Interactive Aero Simulator */}
      <section className="aa-aero-sim-section">
        <div className="aa-sim-container">
          <div className="sim-head">
            <span className="aa-kicker"><span>AERODYNAMICS LAB</span> 2026 ACTIVE AERO SIMULATOR</span>
            <h2>Configure Downforce &amp; Active Wing Modes</h2>
          </div>

          <div className="sim-controls-grid">
            <div className="control-box">
              <label>ACTIVE AERO CONFIGURATION</label>
              <div className="aa-pill-selector">
                {(["Z-Mode (High Downforce)", "X-Mode (Low Drag)"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={aeroMode === mode ? "active" : ""}
                    onClick={() => setAeroMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-box">
              <div className="label-val-row">
                <label>REAR WING ANGLE OF ATTACK</label>
                <strong>{wingTrim}% TRIM</strong>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={wingTrim}
                onChange={(e) => setWingTrim(Number(e.target.value))}
                aria-label="Rear wing trim angle slider"
              />
              <div className="range-hints">
                <span>20% (Monza Trim)</span>
                <span>100% (Monaco Max Wing)</span>
              </div>
            </div>
          </div>

          <div className="sim-readout-grid">
            <div className="readout-card">
              <span>SIMULATED DOWNFORCE (AT 250 KM/H)</span>
              <strong>{calculatedDownforceKg} <small>KG</small></strong>
              <small>{aeroMode.startsWith("Z") ? "Cornering load active" : "Low drag straightaway state"}</small>
            </div>

            <div className="readout-card">
              <span>PROJECTED TOP SPEED</span>
              <strong>{calculatedTopSpeedKmh} <small>KM/H</small></strong>
              <small>{(calculatedTopSpeedKmh * 0.621371).toFixed(0)} MPH</small>
            </div>

            <div className="readout-card">
              <span>PEAK CORNERING LATERAL LOAD</span>
              <strong className="g-force">{corneringGForce} <small>G</small></strong>
              <small>Sustained lateral acceleration</small>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Systems Breakdown */}
      <section className="systems-section">
        <p className="section-kicker"><span>03</span> MACHINE SUBSYSTEMS</p>
        <div className="systems-list">
          {systems.map((s) => (
            <article key={s.title}>
              <span>{s.num}</span>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* In-Content Native Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="in-article" />
      </div>

      <section className="car-lab-note">
        <span>AA–01 DESIGN PRINCIPLE</span>
        <h2>
          Performance is not a single part.<br />
          <em>It is a conversation.</em>
        </h2>
        <p>
          A flap adjustment at the front wing transforms the underfloor suction; a 1mm change in rear ride height alters tire temperature balance across entire race stints.
        </p>
      </section>
    </AtlasShell>
  );
}
