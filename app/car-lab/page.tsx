"use client";

import { useState } from "react";
import Link from "next/link";
import { AtlasShell } from "../components/AtlasShell";
import { AdSlot } from "../components/AdSlot";

const systems = [
  {
    num: "01",
    title: "FRONT WING & Y250 VORTEX CONTROL",
    desc: "The primary aerodynamic structure meeting undisturbed free-stream air. Flap angle dictates front-axle vertical bite, while cascade winglets generate high-energy outward vortex structures to deflect turbulent front tire wake away from the underfloor Venturi inlets.",
  },
  {
    num: "02",
    title: "VENTURI FLOOR & UNDERBODY DIFFUSERS",
    desc: "Produces more than 60% of total vehicle downforce with minimal induced drag penalty. Air accelerates through constricted underfloor throats, creating intense Bernoulli low pressure that suctions the chassis onto the track surface.",
  },
  {
    num: "03",
    title: "HEAVE SPRINGS & SUSPENSION PLATFORM",
    desc: "Maintains a millimetric aerodynamic platform at speeds exceeding 330 km/h. Third heave dampers decouple straight-line vertical aero compression from lateral cornering roll, preventing underfloor boundary layer detachment and violent porpoising.",
  },
  {
    num: "04",
    title: "2026 ACTIVE REAR WING & BEAM FLAPS",
    desc: "Features dual-state active aerodynamic actuation. Under braking and cornering, flaps snap into high-downforce Z-Mode. On straightaways, the flaps flatten into low-drag X-Mode, slashing aerodynamic drag to maximize straight-line speed.",
  },
  {
    num: "05",
    title: "BRAKE COOLING DUCTS & INTERNAL CHEVRONS",
    desc: "Captures high-pressure ambient air through upright scoops to cool carbon-carbon discs operating above 1,000°C. Centrifugal rotation expels hot air through 1,400 micro-drilled chevron holes directly warming magnesium wheel rims.",
  },
  {
    num: "06",
    title: "FLOOR-EDGE PNEUMATIC CURTAIN VORTICES",
    desc: "Longitudinal floor edge vanes shed spiraling high-velocity vortices that function as invisible pneumatic side skirts. These vortices seal the underfloor vacuum from ambient high-pressure air attempting to bleed inward laterally.",
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
            <span>02</span> AA–01 CONCEPT MACHINE &amp; AERODYNAMICS LAB
          </p>
          <h1>
            Every surface<br />
            <em>has a job.</em>
          </h1>
          <p>
            An interactive chassis engineering laboratory exploring downforce trade-offs, aerodynamic boundary layers, and the 2026 active wing regulations.
          </p>
          <small>3D CONCEPT TELEMETRY &amp; CFD PLATFORM</small>
        </div>
        <div className="car-lab-stage">
          <img
            src="/media/apex-racecar-hero.png"
            alt="Apex Atlas open-wheel concept car with aero pressure mapping"
          />
        </div>
      </section>

      {/* Leaderboard Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      {/* Interactive Aero Simulator */}
      <section className="aa-aero-sim-section">
        <div className="aa-sim-container">
          <div className="sim-head">
            <span className="aa-kicker"><span>AERODYNAMICS LAB</span> 2026 ACTIVE AERO SIMULATOR</span>
            <h2>Configure Downforce &amp; Active Wing Modes</h2>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "0.5rem" }}>
              Toggle between Z-Mode (cornering downforce) and X-Mode (low-drag straightaway) to observe the dynamic trade-off between cornering G-load and projected terminal velocity.
            </p>
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
                <span>20% (Monza Skinny Trim)</span>
                <span>100% (Monaco Maximum Wing)</span>
              </div>
            </div>
          </div>

          <div className="sim-readout-grid">
            <div className="readout-card">
              <span>SIMULATED DOWNFORCE (AT 250 KM/H)</span>
              <strong>{calculatedDownforceKg} <small>KG</small></strong>
              <small>{aeroMode.startsWith("Z") ? "Cornering suction active" : "Low drag straightaway state"}</small>
            </div>

            <div className="readout-card">
              <span>PROJECTED TOP SPEED</span>
              <strong>{calculatedTopSpeedKmh} <small>KM/H</small></strong>
              <small>{(calculatedTopSpeedKmh * 0.621371).toFixed(0)} MPH TERMINAL</small>
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
        <p className="section-kicker"><span>03</span> CHASSIS &amp; AERODYNAMIC SUBSYSTEMS</p>
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

      {/* Technical Deep Dive Callout */}
      <section className="car-lab-note">
        <span>AA–01 DESIGN PRINCIPLE</span>
        <h2>
          Performance is not a single part.<br />
          <em>It is a conversation.</em>
        </h2>
        <p>
          A 0.5-degree flap adjustment at the front wing transforms the underfloor vortex seal; a 1mm change in rear ride height alters tire temperature balance across entire race stints.
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/stories/ground-effect-pressure-into-pace" className="aa-button aa-button-light">
            Read Ground Effect Explainer ↗
          </Link>
          <Link href="/stories/suspension-kinematics-aero-platform" className="aa-button aa-button-ghost">
            Suspension Kinematics Guide ↗
          </Link>
        </div>
      </section>
    </AtlasShell>
  );
}
