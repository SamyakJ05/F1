import { StrategyStudio } from "../components/StrategyStudio";
import { AtlasShell } from "../components/AtlasShell";
import { AdSlot } from "../components/AdSlot";

export default function StrategyPage() {
  return (
    <AtlasShell>
      <section className="atlas-hero strategy-hero">
        <p className="section-kicker">
          <span>04</span> STRATEGY STUDIO &amp; SIMULATION
        </p>
        <h1>
          Think in<br />
          <em>race distance.</em>
        </h1>
        <p>
          The overtake is only the visible surface of strategy. The real battle begins with tire thermal degradation, pit lane delta loss, and undercut execution.
        </p>
      </section>

      {/* Top Banner Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      <section className="strategy-workspace">
        <StrategyStudio />

        {/* In-Article Native Ad */}
        <div className="aa-page-ad-wrap">
          <AdSlot format="in-article" />
        </div>

        <div className="strategy-explainer">
          <article>
            <span>01</span>
            <h2>CREATE AN UNDERCUT WINDOW</h2>
            <p>
              A good first stint protects your tactical options. Stay within 1.8s to trigger an undercut, while managing front-tire graining in dirty air turbulence.
            </p>
          </article>
          <article>
            <span>02</span>
            <h2>SECURE CLEAN AIR ON EXIT</h2>
            <p>
              Fresh tire grip is only valuable when the driver can push unhindered. Exiting behind midfield traffic immediately destroys the 2.5s fresh-rubber delta.
            </p>
          </article>
          <article>
            <span>03</span>
            <h2>EXPLOIT SAFETY CAR DISCOUNTS</h2>
            <p>
              A pit stop under green flags costs ~21.5 seconds. Pitting under a Virtual Safety Car (VSC) drops net loss to 16.2s, while a full Safety Car saves over 8.7 seconds.
            </p>
          </article>
        </div>
      </section>
    </AtlasShell>
  );
}
