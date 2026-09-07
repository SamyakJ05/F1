import type { Metadata } from "next";
import Link from "next/link";
import { AtlasShell } from "../components/AtlasShell";

export const metadata: Metadata = {
  title: "About Apex Atlas — Editorial Standards, Methodology & Team",
  description: "Learn about the mission, engineering methodology, peer-reviewed telemetry sources, and editorial standards behind Apex Atlas.",
};

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
            Apex Atlas is an independent digital publication and telemetry laboratory dedicated to making motorsport engineering, racecraft strategy, and circuit architecture legible, engaging, and rigorously factual.
          </p>

          <h2>Our Editorial Mission</h2>
          <p>
            Formula 1 is one of the world&apos;s most technologically complex sports. Every Grand Prix is shaped by hundreds of interrelated variables: aerodynamic boundary layers, tire polymer viscoelasticity, pit lane transit deltas, and split-second driver decisions. Our mission is to translate this mountain of telemetry into clear, visual briefings, authoritative engineering field notes, and interactive tools that empower fans to understand what will happen before lights out.
          </p>

          <h2>Editorial Team &amp; Contributors</h2>
          <div className="aa-author-bios-grid">
            <div className="aa-bio-card">
              <h3>Elena Rostova</h3>
              <span className="role">Chief Aerodynamics Analyst</span>
              <p>
                Specializes in computational fluid dynamics (CFD), ground effect floor optimization, Venturi throat boundary layers, and the 2026 active aerodynamics regulations.
              </p>
            </div>
            <div className="aa-bio-card">
              <h3>Marcus Vance</h3>
              <span className="role">Race Strategy Director</span>
              <p>
                Former telemetry engineer focusing on non-linear tire thermal degradation models, undercut timing algorithms, and safety car probability matrices.
              </p>
            </div>
            <div className="aa-bio-card">
              <h3>Dr. Alistair Finch</h3>
              <span className="role">Technical &amp; Powertrain Consultant</span>
              <p>
                Researches hybrid power unit thermodynamics, 350kW kinetic energy recovery (MGU-K), pre-chamber combustion, and sustainable drop-in racing fuels.
              </p>
            </div>
          </div>

          <h2>Fact-Checking &amp; Verification Methodology</h2>
          <p>
            Accuracy and technical fidelity are the bedrock of Apex Atlas. Every article, calculation, and circuit guide adheres to strict verification protocols:
          </p>
          <ul>
            <li><strong>Primary Source Grounding:</strong> All regulatory discussions cite official FIA Sporting and Technical Regulations directly.</li>
            <li><strong>Mathematical &amp; Physics Validation:</strong> Telemetry curves, downforce calculations, and tire degradation models are derived from standard fluid mechanics (Bernoulli, Navier-Stokes approximations) and vehicle dynamics literature (Milliken &amp; Milliken).</li>
            <li><strong>Cross-Referencing:</strong> Race timing, sector speeds, and weather telemetry are cross-verified against verified open data streams (OpenF1, Ergast, OpenStreetMap).</li>
          </ul>

          <h2>Editorial Independence &amp; Advertising Ethics</h2>
          <p>
            Apex Atlas maintains a strict firewall between editorial content and advertising or sponsorship:
          </p>
          <ul>
            <li>Advertisers, sponsors, and third-party ad networks (including Google AdSense) have zero influence over our technical analysis, driver evaluations, or editorial opinions.</li>
            <li>All commercial ad placements are distinctly separated and visibly labeled with standard &quot;ADVERTISEMENT&quot; tags in compliance with Google Publisher Policies and the Better Ads Standards.</li>
            <li>We do not publish undisclosed sponsored articles, pay-to-play rankings, or biased commercial reviews.</li>
          </ul>

          <h2>Corrections &amp; Updates Policy</h2>
          <p>
            Despite our rigorous review standards, telemetry models and regulations evolve rapidly. When an error or clarification is warranted:
          </p>
          <ul>
            <li>We promptly issue an inline editorial correction note specifying the revised data and date of correction.</li>
            <li>Readers and engineers are encouraged to submit technical observations or corrections directly to our desk via our <Link href="/contact">Contact Page</Link> or by emailing <a href="mailto:corrections@apexatlas.racing">corrections@apexatlas.racing</a>.</li>
          </ul>

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
            Apex Atlas is an independent editorial website and is not affiliated with, endorsed by, or sponsored by Formula 1, Formula One Licensing B.V., the FIA, or any racing team, manufacturer, or circuit. All trademarks, logos, team names, and brand names belong to their respective owners and are used purely editorially for descriptive purposes under fair use.
          </p>

          <h2>Contact &amp; Inquiries</h2>
          <p>
            Editorial Desk: <a href="mailto:editorial@apexatlas.racing">editorial@apexatlas.racing</a><br />
            Technical Corrections: <a href="mailto:corrections@apexatlas.racing">corrections@apexatlas.racing</a><br />
            Privacy &amp; Compliance: <a href="mailto:privacy@apexatlas.racing">privacy@apexatlas.racing</a>
          </p>

          <Link className="back-link" href="/">← RETURN TO APEX ATLAS</Link>
        </article>
      </main>
    </AtlasShell>
  );
}
