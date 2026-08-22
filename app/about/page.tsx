import Link from "next/link";
import { AtlasShell } from "../components/AtlasShell";

export default function AboutPage() {
  return (
    <AtlasShell>
      <main className="legal-page">
        <article className="legal-wrap">
          <p className="section-kicker">
            <span>ABOUT APEX ATLAS</span> EDITORIAL STANDARDS &amp; METHODOLOGY
          </p>
          <h1>
            Built for the<br />
            <em>curious.</em>
          </h1>
          <p>
            Apex Atlas is an independent digital publication and telemetry laboratory dedicated to making motorsport engineering, racecraft strategy, and circuit architecture legible, engaging, and beautiful.
          </p>

          <h2>Our Editorial Mission</h2>
          <p>
            Formula 1 is one of the world&apos;s most complex sports. Every Grand Prix is shaped by hundreds of variables: aerodynamic boundary layers, tire polymer temperatures, pit lane deltas, and split-second driver decisions. Our mission is to translate this mountain of telemetry into clear, visual briefings and interactive tools that empower fans to understand what will happen before lights out.
          </p>

          <h2>Editorial Team &amp; Contributors</h2>
          <div className="aa-author-bios-grid">
            <div className="aa-bio-card">
              <h3>Elena Rostova</h3>
              <span className="role">Chief Aerodynamics Analyst</span>
              <p>
                Specializes in computational fluid dynamics (CFD), ground effect floor optimization, and the 2026 active aerodynamics regulations.
              </p>
            </div>
            <div className="aa-bio-card">
              <h3>Marcus Vance</h3>
              <span className="role">Race Strategy Director</span>
              <p>
                Former telemetry engineer focusing on non-linear tire thermal degradation models, undercut timing, and safety car probability matrices.
              </p>
            </div>
            <div className="aa-bio-card">
              <h3>Dr. Alistair Finch</h3>
              <span className="role">Technical &amp; Powertrain Consultant</span>
              <p>
                Researches hybrid power unit thermodynamics, 350kW kinetic energy harvesting (MGU-K), and sustainable racing fuels.
              </p>
            </div>
          </div>

          <h2>Data Sources &amp; Licensing Transparency</h2>
          <p>
            Apex Atlas relies on verifiable public data and open data ecosystems:
          </p>
          <ul>
            <li><strong>Circuit Geometries:</strong> Derived from OpenStreetMap raceway relation data, published under the Open Database License (ODbL) © OpenStreetMap contributors.</li>
            <li><strong>Live Session Telemetry:</strong> Session timetables and timing references powered by OpenF1 API and Jolpica Ergast F1 dataset.</li>
            <li><strong>Official Regulations:</strong> Calendar data and sporting regulations sourced from official FIA and Formula 1 communications.</li>
          </ul>

          <h2>Independent by Design</h2>
          <p>
            Apex Atlas is an independent editorial website and is not affiliated with, endorsed by, or sponsored by Formula 1, Formula One Licensing B.V., the FIA, or any racing team, manufacturer, or circuit. All trademarks and brand names belong to their respective owners and are used purely editorially for descriptive purposes under fair use.
          </p>

          <h2>Contact &amp; Editorial Inquiries</h2>
          <p>
            Have a question or correction? Visit our <Link href="/contact">Contact Page</Link> or email our desk at <a href="mailto:editorial@apexatlas.racing">editorial@apexatlas.racing</a>.
          </p>

          <Link className="back-link" href="/">← RETURN TO APEX ATLAS</Link>
        </article>
      </main>
    </AtlasShell>
  );
}
