import type { Metadata } from "next";
import Link from "next/link";
import { AtlasShell } from "../components/AtlasShell";
import { MotorsportQuiz } from "../components/MotorsportQuiz";
import { AdSlot } from "../components/AdSlot";

export const metadata: Metadata = {
  title: "Motorsport IQ & Racecraft Assessment — Apex Atlas",
  description: "Test your knowledge of Formula 1 physics, aerodynamic ground effect, 2026 active regulations, tire polymer chemistry, and pit stop strategy.",
};

export default function QuizPage() {
  return (
    <AtlasShell>
      <section className="atlas-hero">
        <p className="section-kicker">
          <span>06</span> RACECRAFT INTELLIGENCE CHALLENGE
        </p>
        <h1>
          Test your<br />
          <em>Motorsport IQ.</em>
        </h1>
        <p>
          Challenge yourself on Grand Prix physics, tire degradation curves, aerodynamic ground effect, and the 2026 regulations.
          A rigorous 20-question telemetry and engineering assessment covering ground effect aerodynamics, tire polymer chemistry, hybrid power unit recovery, and 2026 sporting regulations.
        </p>
      </section>

      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      <section className="aa-section-pad">
        <MotorsportQuiz />
      </section>

      {/* Curriculum Guide */}
      <section style={{ maxWidth: "800px", margin: "3rem auto", padding: "0 1.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Assessment Domains &amp; Methodology</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          <div style={{ padding: "1.2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "0.95rem", color: "#e53e3e", marginBottom: "0.4rem" }}>AERODYNAMICS</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
              Venturi tunnel fluid mechanics, floor edge vortex sealing, boundary layer detachment, and high-altitude air density calculations.
            </p>
          </div>
          <div style={{ padding: "1.2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "0.95rem", color: "#3182ce", marginBottom: "0.4rem" }}>RACE STRATEGY</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
              Undercut vs overcut delta timing, Virtual Safety Car discounts, clean air pit runways, and tire degradation curves.
            </p>
          </div>
          <div style={{ padding: "1.2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "0.95rem", color: "#38a169", marginBottom: "0.4rem" }}>VEHICLE DYNAMICS</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
              Viscoelastic tire hysteresis, carbon-carbon thermal operating windows, heave damper kinematics, and anti-dive geometry.
            </p>
          </div>
          <div style={{ padding: "1.2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "0.95rem", color: "#d69e2e", marginBottom: "0.4rem" }}>2026 REGULATIONS</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
              Active aerodynamics (X-Mode vs Z-Mode), 350kW MGU-K hybrid surge, Manual Override Mode, and sustainable synthetic fuels.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.85rem", opacity: 0.75 }}>
            Need to brush up on telemetry and aerodynamics? Explore our <Link href="/stories" style={{ color: "#fff", textDecoration: "underline" }}>Technical Field Notes ↗</Link>
          </p>
        </div>
      </section>

      <div className="aa-page-ad-wrap">
        <AdSlot format="in-article" />
      </div>
    </AtlasShell>
  );
}
