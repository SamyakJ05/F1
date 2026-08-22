"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CircuitMap } from "./components/CircuitMap";

const PACE_BARS = [23, 40, 53, 40, 33, 14, 7, 17, 75, 65, 88, 75, 65, 47, 33, 88, 4, 7, 9, 14, 95, 65, 79, 37, 7, 40, 17, 20, 62, 47, 92, 72];

type Session = { name: string; startsAt: string; endsAt: string };
type Weekend = { meeting: { country: string; location: string; circuit: string }; sessions: Session[] };

const fallbackWeekend: Weekend = {
  meeting: { country: "Netherlands", location: "Zandvoort", circuit: "Zandvoort" },
  sessions: [
    { name: "Practice 1", startsAt: "2026-08-21T10:30:00Z", endsAt: "2026-08-21T11:30:00Z" },
    { name: "Sprint Qualifying", startsAt: "2026-08-21T14:30:00Z", endsAt: "2026-08-21T15:14:00Z" },
    { name: "Sprint", startsAt: "2026-08-22T10:00:00Z", endsAt: "2026-08-22T11:00:00Z" },
    { name: "Qualifying", startsAt: "2026-08-22T14:00:00Z", endsAt: "2026-08-22T15:00:00Z" },
    { name: "Race", startsAt: "2026-08-23T13:00:00Z", endsAt: "2026-08-23T15:00:00Z" },
  ],
};

function Animate({ children, delay = 0, direction = "up", className = "" }: { children: ReactNode; delay?: number; direction?: "up" | "down" | "scale"; className?: string }) {
  return <div className={`aa-reveal aa-reveal-${direction} ${className}`} style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}

function formatCountdown(milliseconds: number) {
  if (milliseconds <= 0) return "SESSION LIVE";
  const total = Math.floor(milliseconds / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return `${days ? `${days}D ` : ""}${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M ${String(seconds).padStart(2, "0")}S`;
}

function WeekendCard({ weekend, now }: { weekend: Weekend; now: number | null }) {
  const currentTime = now ?? 0;
  const nextSession = weekend.sessions.find((session) => Date.parse(session.endsAt) >= currentTime) ?? weekend.sessions.at(-1)!;
  const start = Date.parse(nextSession.startsAt);
  const live = now !== null && start <= now && Date.parse(nextSession.endsAt) >= now;
  const maxHeight = Math.max(...PACE_BARS);

  return <Animate delay={850} direction="scale" className="aa-weekend-card-wrap">
    <aside className="aa-weekend-card" aria-label="Current race weekend briefing">
      <div className="aa-card-label"><span><i /> NEXT WEEKEND</span><b>ROUND 12</b></div>
      <p className="aa-country">{weekend.meeting.country}</p>
      <h2>{weekend.meeting.circuit}</h2>
      <div className="aa-next-session"><span>{live ? "LIVE NOW" : `NEXT · ${nextSession.name.toUpperCase()}`}</span><strong>{now === null ? "SYNCING…" : live ? "SESSION LIVE" : formatCountdown(start - now)}</strong><small>{now === null ? "Times adjust to your device" : new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(start)}</small></div>
      <div className="aa-pace-chart" aria-label="Illustrative track evolution chart">
        <div className="aa-bars">{PACE_BARS.map((height, index) => <i key={index} style={{ height: `${height / maxHeight * 100}%`, animationDelay: `${1050 + index * 25}ms` }} />)}</div>
        <div className="aa-chart-axis"><span>FP1</span><span>SQ</span><span>SPRINT</span><span>QUALI</span><span>RACE</span></div>
      </div>
      <div className="aa-card-source">LIVE SESSIONS BY <a href="https://openf1.org/" target="_blank" rel="noreferrer">OPENF1 ↗</a></div>
    </aside>
  </Animate>;
}

function Navigation({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const links = [["Weekend", "#weekend"], ["Circuits", "/circuits"], ["Strategy", "/strategy"], ["Stories", "/stories"]];
  return <>
    <nav className="aa-nav" aria-label="Primary navigation">
      <Animate direction="down"><a className="aa-logo" href="#top"><i />APEX <span>ATLAS</span></a></Animate>
      <Animate delay={100} direction="down" className="aa-nav-pill">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</Animate>
      <Animate delay={200} direction="down" className="aa-nav-action"><a href="/circuits">2026 CALENDAR</a><a href="#weekend">OPEN BRIEF</a></Animate>
      <Animate delay={100} direction="down" className="aa-menu-wrap"><button className={open ? "aa-menu open" : "aa-menu"} type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}><i /><i /></button></Animate>
    </nav>
    <div className={open ? "aa-mobile-nav open" : "aa-mobile-nav"} aria-hidden={!open}>
      <button className="aa-mobile-backdrop" type="button" aria-label="Close navigation" onClick={() => setOpen(false)} />
      <div className="aa-mobile-panel">{links.map(([label, href], index) => <a key={label} href={href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${100 + index * 50}ms` : "0ms" }}>{label}<span>↗</span></a>)}</div>
    </div>
  </>;
}

function clamp(value: number, min: number, max: number) { return Math.max(min, Math.min(max, value)); }

export function StrategyLab() {
  const [stopLap, setStopLap] = useState(24);
  const [wear, setWear] = useState(62);
  const [mode, setMode] = useState<"Dry" | "Mixed">("Dry");
  const gain = clamp((28 - Math.abs(stopLap - 22)) * .2 - wear * .025 + (mode === "Mixed" ? 1.6 : 0), -3.2, 4.8);
  return <div className="strategy-panel"><div className="strategy-head"><div><span>SCENARIO 07</span><h3>UNDERCUT WINDOW</h3></div><div className="mode-switch" aria-label="Track conditions">{(["Dry", "Mixed"] as const).map((item) => <button type="button" className={mode === item ? "active" : ""} onClick={() => setMode(item)} key={item}>{item}</button>)}</div></div>
    <div className="strategy-body">
      <label><span><b>PIT LAP</b><output>{stopLap}</output></span><input aria-label="Pit stop lap" type="range" min="12" max="40" value={stopLap} onChange={(event) => setStopLap(Number(event.target.value))} /></label>
      <label><span><b>TYRE WEAR</b><output>{wear}%</output></span><input aria-label="Tyre wear" type="range" min="20" max="95" value={wear} onChange={(event) => setWear(Number(event.target.value))} /></label>
      <div className="strategy-chart" aria-label="Projected race pace chart">{[44,51,47,58,63,55,69,74,66,82,78,91].map((bar,index) => <i key={index} style={{height:`${bar - Math.abs(stopLap - 24) * (index > 6 ? .7 : .2)}%`}} />)}<span className="pit-line" style={{left:`${clamp((stopLap - 12) / 28 * 86 + 7, 7, 93)}%`}} /></div>
      <div className="strategy-result"><span>PROJECTED DELTA</span><strong className={gain >= 0 ? "positive" : "negative"}>{gain >= 0 ? "+" : ""}{gain.toFixed(1)}s</strong><small>{gain >= 0 ? "Position gained in pit cycle" : "Window compromised"}</small></div>
    </div>
  </div>;
}

export default function ApexExperience() {
  const [weekend, setWeekend] = useState<Weekend>(fallbackWeekend);
  const [now, setNow] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const timezone = useMemo(() => typeof Intl === "undefined" ? "Local time" : Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("_", " "), []);

  useEffect(() => {
    setNow(Date.now());
    fetch("/api/race-weekend").then((response) => response.ok ? response.json() : Promise.reject()).then(setWeekend).catch(() => undefined);
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <main className="aa-site">
    <section className="aa-hero" id="top">
      <div className="aa-hero-media" aria-hidden="true"><img src="/media/apex-racecar-hero.png" alt="" /><div className="aa-orbit aa-orbit-one" /><div className="aa-orbit aa-orbit-two" /></div>
      <Navigation open={menuOpen} setOpen={setMenuOpen} />
      <div className="aa-hero-row">
        <div className="aa-hero-copy">
          <Animate delay={250}><p className="aa-kicker"><span>●</span> THE RACE, MADE LEGIBLE</p></Animate>
          <Animate delay={350}><h1>Know the race<br />before <em>lights out.</em></h1></Animate>
          <Animate delay={520}><p className="aa-lede">A calm, visual briefing for every Formula racing weekend—sessions, circuit character and strategy in five focused minutes.</p></Animate>
          <Animate delay={680} className="aa-hero-actions"><a className="aa-button aa-button-light" href="#weekend">Open weekend brief</a><a className="aa-button aa-button-ghost" href="/circuits">Explore 2026 calendar</a></Animate>
          <Animate delay={780}><p className="aa-local-time">LIVE CONTEXT · {timezone.toUpperCase()} · SPOILER-SAFE READING</p></Animate>
        </div>
        <WeekendCard weekend={weekend} now={now} />
      </div>
      <a className="aa-scroll-cue" href="#purpose"><span /> SCROLL TO EXPLORE</a>
    </section>

    <section className="aa-purpose" id="purpose">
      <div className="aa-purpose-head"><p>WHY APEX ATLAS</p><h2>Everything that matters.<br /><em>Nothing that doesn’t.</em></h2><p>Built for the hour before a session, the second-screen check during qualifying, and the question you have after the chequered flag.</p></div>
      <div className="aa-purpose-grid">
        <article><span>01</span><h3>Arrive prepared</h3><p>Your local session times and one concise explanation of what will shape the weekend.</p><a href="#weekend">VIEW THIS WEEKEND ↗</a></article>
        <article><span>02</span><h3>Read the circuit</h3><p>Real track geometry with credited source data, essential dimensions and corner-by-corner context.</p><a href="/circuits">OPEN THE ATLAS ↗</a></article>
        <article><span>03</span><h3>Test the call</h3><p>Explore how tyre life, pit timing and race interruptions change the strategic window.</p><a href="/strategy">TRY STRATEGY STUDIO ↗</a></article>
      </div>
    </section>

    <section className="aa-weekend-proof" id="weekend">
      <div className="aa-proof-map"><CircuitMap slug="zandvoort" name="Circuit Zandvoort" /><div className="aa-map-index">12<span>/23</span></div></div>
      <div className="aa-proof-copy"><p className="aa-kicker"><span>●</span> THIS WEEKEND · ZANDVOORT</p><h2>A circuit that<br /><em>refuses to sit flat.</em></h2><p>Four kilometres of narrow, banked commitment. Apex Atlas turns the shape into a useful briefing: where track position matters, why the banking changes tyre load, and how a Sprint compresses every setup decision.</p><div className="aa-proof-stats"><span><b>4.259</b> KM</span><span><b>72</b> LAPS</span><span><b>14</b> TURNS</span></div><a className="aa-button aa-button-light" href="/circuits">Explore all 23 circuits</a><small>Geometry © <a href="https://www.openstreetmap.org/way/23285808" target="_blank" rel="noreferrer">OpenStreetMap contributors</a> · Facts: <a href="https://www.formula1.com/en/information/netherlands-zandvoort-circuit-zandvoort.6XdtPTIMZzx5wLKP9mm7Ev" target="_blank" rel="noreferrer">Formula 1</a></small></div>
    </section>

    <footer className="aa-footer"><a className="aa-logo" href="#top"><i />APEX <span>ATLAS</span></a><p>Independent. Unofficial. Built for the curious.</p><nav><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/ads.txt">Ads.txt</a></nav><small>© 2026 APEX ATLAS</small></footer>
  </main>;
}
