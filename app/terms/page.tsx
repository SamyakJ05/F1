import Link from "next/link";
import { AtlasShell } from "../components/AtlasShell";

export default function TermsPage() {
  return (
    <AtlasShell>
      <main className="legal-page">
        <article className="legal-wrap">
          <p className="section-kicker">
            <span>LEGAL</span> TERMS OF SERVICE
          </p>
          <h1>Terms of Use.</h1>
          <p>
            Last updated: August 22, 2026. By accessing and using Apex Atlas (&quot;the Site&quot;), you agree to be bound by these Terms of Service.
          </p>

          <h2>1. Unofficial &amp; Independent Publication</h2>
          <p>
            Apex Atlas is an independent editorial publication and motorsport analysis platform. Apex Atlas is not affiliated with, endorsed by, sponsored by, or connected to Formula One Group, Formula One Licensing B.V., the Fédération Internationale de l&apos;Automobile (FIA), Formula One World Championship Limited, or any Formula 1 team, driver, or venue.
          </p>
          <p>
            All names, trademarks, team names, driver names, circuit names, and championship titles belong to their respective trademark holders and are used solely editorially for descriptive and commentary purposes.
          </p>

          <h2>2. Educational &amp; Interactive Models</h2>
          <p>
            All calculations, strategy simulations, telemetry diagrams, downforce models, and weather projections provided on this site are for educational, journalistic, and entertainment purposes. While we strive for engineering fidelity, models are simplified abstractions and should not be relied upon for competitive, betting, or technical safety applications.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            Unless otherwise stated, all written articles, original concept illustrations, custom UI designs, and software code on Apex Atlas are the copyrighted intellectual property of Apex Atlas.
          </p>
          <p>
            Track geometry data is derived from OpenStreetMap data and is licensed under the Open Database License (ODbL) © OpenStreetMap contributors.
          </p>

          <h2>4. User Conduct &amp; Community Integrity</h2>
          <p>
            Users agree not to scrape, reverse engineer, disrupt, or misuse our interactive simulation tools or automated APIs.
          </p>

          <h2>5. Contact Information</h2>
          <p>
            For questions regarding these Terms, please contact us via <Link href="/contact">our Contact Page</Link> or email <a href="mailto:legal@apexatlas.racing">legal@apexatlas.racing</a>.
          </p>

          <Link className="back-link" href="/">← RETURN TO APEX ATLAS</Link>
        </article>
      </main>
    </AtlasShell>
  );
}
