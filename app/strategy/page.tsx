import type { Metadata } from "next";
import Link from "next/link";
import { StrategyStudio } from "../components/StrategyStudio";
import { AtlasShell } from "../components/AtlasShell";
import { AdSlot } from "../components/AdSlot";

export const metadata: Metadata = {
  title: "Race Strategy Studio & Tactical Masterclass — Apex Atlas",
  description: "Simulate Grand Prix pit stop timing, tire degradation curves, undercut mechanics, and Safety Car delta discounts with engineering precision.",
};

export default function StrategyPage() {
  return (
    <AtlasShell>
      <section className="atlas-hero strategy-hero">
        <p className="section-kicker">
          <span>04</span> STRATEGY STUDIO &amp; TACTICAL MASTERCLASS
        </p>
        <h1>
          Think in<br />
          <em>race distance.</em>
        </h1>
        <p>
          The overtake is only the visible surface of motorsport tactics. The true battle is calculated across 305 kilometers through tire degradation curves, pit lane transit deltas, and clean air execution.
        </p>
      </section>

      {/* Leaderboard Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      <section className="strategy-workspace">
        {/* Interactive Simulation Studio */}
        <StrategyStudio />

        {/* Deep Masterclass Curriculum */}
        <div className="strategy-explainer" style={{ marginTop: "3rem" }}>
          <article>
            <span>01</span>
            <h2>THE MATHEMATICS OF THE UNDERCUT</h2>
            <p>
              An undercut exploits the initial chemical and mechanical adhesion advantage of fresh rubber over aged tires. While an opponent remains on worn tires lapping at +1.8s over baseline, the pitting car rejoins on fresh tires capable of setting personal best sectors.
            </p>
            <p>
              To execute successfully, the trailing car must sit within the &quot;striking window&quot;—typically 1.5 to 2.2 seconds behind the leader. Pitting one lap earlier forces the leader into a dilemma: respond immediately on the following lap or risk track position loss.
            </p>
          </article>

          <article>
            <span>02</span>
            <h2>TRAFFIC RUNWAYS &amp; CLEAN AIR DELTAS</h2>
            <p>
              The most common failure mode of an aggressive pit strategy is traffic occlusion. Rejoining the circuit behind a slower DRS train immediately nullifies the fresh-tire pace delta.
            </p>
            <p>
              Following another racing car within 1.5 seconds destroys front-axle downforce by up to 35%, generating sliding, surface overheating, and severe cold graining. Strategists will intentionally sacrifice half a second of tire age to guarantee an empty 5-second runway on pit exit.
            </p>
          </article>

          <article>
            <span>03</span>
            <h2>SAFETY CAR &amp; VSC PIT ECONOMY</h2>
            <p>
              Under green flag conditions, traversing the pit lane at the 80 km/h speed limit costs approximately 21 to 24 seconds relative to cars traveling at racing speed (280+ km/h) on track.
            </p>
            <p>
              When a Virtual Safety Car (VSC) is deployed, all competitors must adhere to an FIA speed delta reducing pace by ~40%. Because the pit lane transit duration remains fixed, the relative distance lost drops to just 13 to 15 seconds. Under a full physical Safety Car, the loss shrinks further to 9 to 11 seconds, offering an irresistible &quot;cheap pit stop.&quot;
            </p>
          </article>

          <article>
            <span>04</span>
            <h2>WHEN THE OVERCUT PREVAILS</h2>
            <p>
              While the undercut is famous, the overcut is lethal under specific conditions. At circuits with low tire abrasion and cold track temperatures (such as Monaco, Baku, or Melbourne), brand new tires suffer from thermal lag, requiring up to two laps to reach their 100°C working window.
            </p>
            <p>
              The driver who stays out on warm rubber with a lightening fuel tank can set blistering personal bests while the rival slides on cold tires. Once the leader finally pits, they emerge comfortably ahead.
            </p>
          </article>

          <article>
            <span>05</span>
            <h2>TIRE COMPOUND DELTAS: SOFT VS MEDIUM VS HARD</h2>
            <p>
              Pirelli compounds (C1 through C5) represent a calculated compromise between peak mechanical keying and thermal endurance. The Soft compound provides roughly 0.8s to 1.2s per lap in qualifying pace, but degrades rapidly under high fuel loads.
            </p>
            <p>
              The Hard compound requires aggressive out-lap preparation to switch on, but offers a virtually flat degradation slope across 35+ laps, enabling flexible reactive strategy calls when late-race yellow flags occur.
            </p>
          </article>

          <article>
            <span>06</span>
            <h2>FUEL WEIGHT COEFFICIENT OVER RACE DISTANCE</h2>
            <p>
              Cars start the Grand Prix with up to 110kg of fuel and finish with ~2kg. Every 10kg of fuel mass imposes a lap time penalty of approximately 0.30 to 0.35 seconds per lap.
            </p>
            <p>
              Consequently, the natural pace of the car accelerates by roughly 0.06 seconds every lap purely due to mass burn. Strategists must decouple this natural weight acceleration from true tire degradation to accurately calculate pit windows.
            </p>
          </article>
        </div>

        {/* Native Ad Placement */}
        <div className="aa-page-ad-wrap">
          <AdSlot format="in-article" />
        </div>

        {/* Related Deep Dives */}
        <div style={{ marginTop: "3rem", padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Further Reading in the Technical Journal</h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "1rem" }}>
            Explore our deep mathematical breakdown of the undercut and tire polymer dynamics.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/stories/anatomy-of-an-undercut" className="aa-button aa-button-ghost" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
              Anatomy of the Undercut ↗
            </Link>
            <Link href="/stories/tire-chemistry-thermal-degradation" className="aa-button aa-button-ghost" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
              Tire Chemistry &amp; Degradation ↗
            </Link>
          </div>
        </div>
      </section>
    </AtlasShell>
  );
}
