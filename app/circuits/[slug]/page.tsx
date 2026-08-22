import { notFound } from "next/navigation";
import Link from "next/link";
import { AtlasShell } from "../../components/AtlasShell";
import { CircuitMap } from "../../components/CircuitMap";
import { AdSlot } from "../../components/AdSlot";
import { WeatherWidget } from "../../components/WeatherWidget";
import { circuits, getCircuit } from "../../site-data";

export function generateStaticParams() {
  return circuits.map(({ slug }) => ({ slug }));
}

export default async function CircuitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const circuit = getCircuit(slug);
  if (!circuit) notFound();

  return (
    <AtlasShell>
      <section className={`circuit-detail-hero ${circuit.slug}`}>
        <CircuitMap slug={circuit.slug} name={circuit.name} className="circuit-detail-map" />
        <div className="circuit-detail-copy">
          <p className="section-kicker">
            <span>TRACK BRIEFING</span> {circuit.country.toUpperCase()} · {circuit.city.toUpperCase()}
          </p>
          <h1>{circuit.name}</h1>
          <p>{circuit.character}</p>
          <b>
            {circuit.distance}
            <small>
              {circuit.turns} · {circuit.laps} Laps ({circuit.totalDistanceKm} km)
            </small>
          </b>
        </div>
      </section>

      {/* Top Banner Ad */}
      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      <article className="reading-layout">
        <aside>
          <span>CIRCUIT FIELD GUIDE</span>
          <a href="#overview">Overview &amp; Character</a>
          <a href="#telemetry">Telemetry &amp; Specs</a>
          <a href="#sectors">Sector Breakdown</a>
          <a href="#lessons">Driving Lessons</a>
          <a href="#weather">Track Weather</a>
          <a href="#note">Field Note</a>

          <div className="aa-sidebar-ad-wrap">
            <AdSlot format="rectangle" label="SPONSOR" />
          </div>
        </aside>

        <div>
          <section id="overview">
            <p className="lead">{circuit.intro}</p>
          </section>

          {/* Quick Telemetry & Tactical Specs Strip */}
          <section id="telemetry" className="aa-circuit-specs-grid">
            <div className="spec-box">
              <span>LAP RECORD</span>
              <strong>{circuit.lapRecord.time}</strong>
              <small>{circuit.lapRecord.driver} ({circuit.lapRecord.year})</small>
            </div>
            <div className="spec-box">
              <span>DRS ACTIVATION</span>
              <strong>{circuit.drsZones} ZONES</strong>
              <small>Detection points verified</small>
            </div>
            <div className="spec-box">
              <span>DOWNFORCE LEVEL</span>
              <strong>{circuit.downforceLevel.toUpperCase()}</strong>
              <small>Wing &amp; floor load package</small>
            </div>
            <div className="spec-box">
              <span>TIRE STRESS</span>
              <strong className={circuit.tireStress === "Very High" ? "stress-high" : ""}>
                {circuit.tireStress.toUpperCase()}
              </strong>
              <small>Lateral &amp; thermal loading</small>
            </div>
          </section>

          {/* Sector by Sector Breakdown */}
          <section id="sectors" className="aa-sector-breakdown">
            <p className="section-kicker"><span>01</span> SECTOR BY SECTOR GUIDE</p>
            <div className="sector-list">
              {circuit.sectors.map((sec, i) => (
                <div key={sec.name} className="sector-card">
                  <div className="sec-head">
                    <span className="sec-num">0{i + 1}</span>
                    <h3>{sec.name}</h3>
                    <b className="sec-focus">{sec.focus}</b>
                  </div>
                  <p>{sec.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* In-Content Native Ad */}
          <div className="aa-article-ad-wrap">
            <AdSlot format="in-article" />
          </div>

          {/* Key Driving Lessons */}
          <section id="lessons">
            <p className="section-kicker"><span>02</span> DRIVER CRAFT &amp; TELEMETRY LESSONS</p>
            {circuit.lessons.map((lesson, index) => (
              <div className="lesson" key={lesson.title}>
                <span>0{index + 1}</span>
                <h2>{lesson.title}</h2>
                <p>{lesson.text}</p>
              </div>
            ))}
          </section>

          <section id="weather" className="aa-circuit-weather-embed">
            <p className="section-kicker"><span>03</span> TRACK METEOROLOGY</p>
            <WeatherWidget circuitSlug={circuit.slug} />
          </section>

          <blockquote id="note">“{circuit.fieldNote}”</blockquote>

          <p className="source-note">
            Track geometry: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors (ODbL) ↗</a>. Circuit facts: <a href={circuit.sourceUrl} target="_blank" rel="noreferrer">Formula 1 circuit guide ↗</a>. Official circuit: <a href={circuit.officialUrl} target="_blank" rel="noreferrer">{circuit.name} official site ↗</a>.
          </p>
        </div>
      </article>

      <section className="next-step">
        <span>KEEP EXPLORING</span>
        <Link href="/circuits">RETURN TO CIRCUIT ATLAS ↗</Link>
      </section>
    </AtlasShell>
  );
}
