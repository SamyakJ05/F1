"use client";

import { useEffect, useRef, useState } from "react";
import { CircuitMap } from "./components/CircuitMap";
import { RaceWeekendHub } from "./components/RaceWeekendHub";

type Point3 = [number, number, number];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function CarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0.28, y: -0.12 });
  const drag = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (point: Point3, yaw: number, pitch: number) => {
      const [x, y, z] = point;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const rx = x * cy - z * sy;
      const rz = x * sy + z * cy;
      const ry = y * cp - rz * sp;
      const rz2 = y * sp + rz * cp;
      const scale = Math.min(width, height) * 0.155;
      const perspective = 5.8 / (6.3 + rz2);
      return {
        x: width * 0.53 + rx * scale * perspective,
        y: height * 0.52 - ry * scale * perspective,
        depth: rz2,
      };
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      const yaw = -0.62 + pointer.current.x * 0.32 + Math.sin(time * 0.00022) * 0.08;
      const pitch = -0.05 + pointer.current.y * 0.16;
      const glow = context.createRadialGradient(width * 0.58, height * 0.52, 10, width * 0.58, height * 0.52, width * 0.42);
      glow.addColorStop(0, "rgba(198,255,49,.11)");
      glow.addColorStop(0.55, "rgba(198,255,49,.025)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.strokeStyle = "rgba(198,255,49,.12)";
      context.lineWidth = 1;
      for (let i = 0; i < 6; i += 1) {
        context.beginPath();
        context.ellipse(width * 0.52, height * 0.82, width * (0.2 + i * 0.08), height * (0.035 + i * 0.012), -0.06, 0, Math.PI * 2);
        context.stroke();
      }
      context.restore();

      const faces: { points: Point3[]; fill: string; stroke: string }[] = [
        { points: [[-1.2, .1, 1.55], [1.2, .1, 1.55], [.82, .12, 1.9], [-.82, .12, 1.9]], fill: "#c7ff31", stroke: "#e7ff93" },
        { points: [[-.16, .08, -2.55], [.16, .08, -2.55], [.46, .18, -.3], [-.46, .18, -.3]], fill: "#d8dde0", stroke: "#ffffff" },
        { points: [[-.46, .18, -.3], [.46, .18, -.3], [.58, .4, .9], [-.58, .4, .9]], fill: "#596064", stroke: "#aeb8bc" },
        { points: [[-.58, .4, .9], [.58, .4, .9], [.42, .62, 1.25], [-.42, .62, 1.25]], fill: "#1b2022", stroke: "#7b868a" },
        { points: [[-.34, .5, .5], [.34, .5, .5], [.25, .85, 1.18], [-.25, .85, 1.18]], fill: "#080a0b", stroke: "#c7ff31" },
        { points: [[-.58, .22, .1], [-1.05, .12, .45], [-.82, .22, 1.3], [-.5, .42, .95]], fill: "#303638", stroke: "#788084" },
        { points: [[.58, .22, .1], [1.05, .12, .45], [.82, .22, 1.3], [.5, .42, .95]], fill: "#303638", stroke: "#788084" },
        { points: [[-.72, .55, 1.25], [.72, .55, 1.25], [.95, .58, 1.45], [-.95, .58, 1.45]], fill: "#24292b", stroke: "#c7ff31" },
      ];

      faces.map((face) => ({
        ...face,
        projected: face.points.map((point) => project(point, yaw, pitch)),
        depth: face.points.reduce((sum, point) => sum + project(point, yaw, pitch).depth, 0) / face.points.length,
      })).sort((a, b) => a.depth - b.depth).forEach((face) => {
        context.beginPath();
        face.projected.forEach((point, index) => index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
        context.closePath();
        context.fillStyle = face.fill;
        context.fill();
        context.strokeStyle = face.stroke;
        context.lineWidth = 1.1;
        context.stroke();
      });

      const wheels: Point3[] = [[-.9, .08, -1.15], [.9, .08, -1.15], [-1.02, .12, 1.08], [1.02, .12, 1.08]];
      wheels.forEach((wheel) => {
        const p = project(wheel, yaw, pitch);
        const radius = clamp((Math.min(width, height) * 0.055) * (5.8 / (6.3 + p.depth)), 12, 38);
        context.save();
        context.translate(p.x, p.y);
        context.rotate(yaw * .22);
        context.fillStyle = "#050606";
        context.strokeStyle = "#697174";
        context.lineWidth = 2;
        context.beginPath();
        context.ellipse(0, 0, radius * .52, radius, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.strokeStyle = "rgba(199,255,49,.7)";
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(0, 0, radius * .31, radius * .68, 0, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      });

      const nose = project([0, .1, -2.58], yaw, pitch);
      context.fillStyle = "#ff4b36";
      context.shadowColor = "#ff4b36";
      context.shadowBlur = 18;
      context.beginPath();
      context.arc(nose.x, nose.y, 2.4, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(frame); };
  }, []);

  const updatePointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drag.current && event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: clamp((event.clientX - rect.left) / rect.width - .5, -.5, .5),
      y: clamp((event.clientY - rect.top) / rect.height - .5, -.5, .5),
    };
  };

  return <canvas ref={canvasRef} className="car-canvas" aria-label="Interactive three-dimensional concept racing car. Drag to inspect the form." role="img" tabIndex={0}
    onPointerDown={(event) => { drag.current = true; event.currentTarget.setPointerCapture(event.pointerId); updatePointer(event); }}
    onPointerMove={updatePointer} onPointerUp={() => { drag.current = false; }} onPointerLeave={() => { drag.current = false; }} />;
}

const circuitOptions = ["Suzuka", "Spa", "Silverstone"] as const;
type CircuitName = typeof circuitOptions[number];

function CircuitExplorer() {
  const [circuit, setCircuit] = useState<CircuitName>("Suzuka");
  const info = { Suzuka: ["5.8 KM", "18 TURNS", "FIGURE EIGHT"], Spa: ["7.0 KM", "19 TURNS", "HIGH SPEED"], Silverstone: ["5.9 KM", "18 TURNS", "AERO LOAD"] }[circuit];
  const slug = { Suzuka: "suzuka", Spa: "spa", Silverstone: "silverstone" }[circuit] as const;
  return <div className="circuit-console">
    <div className="console-topline"><span>TRACK MODEL / 01</span><span className="live-dot">INTERACTIVE</span></div>
    <div className="track-stage"><CircuitMap slug={slug} name={circuit} className="track-render" />
      <span className="track-marker marker-one">TRACK NOTE</span><span className="track-marker marker-two">OSM DATA</span>
      <div className="track-title"><span>FEATURED CIRCUIT</span><strong>{circuit.toUpperCase()}</strong></div>
    </div>
    <div className="circuit-stats">{info.map((stat) => <span key={stat}>{stat}</span>)}</div>
    <div className="circuit-tabs" aria-label="Select a circuit">{circuitOptions.map((name, index) => <button type="button" key={name} className={circuit === name ? "active" : ""} onClick={() => setCircuit(name)}><span>0{index + 1}</span>{name}</button>)}</div>
  </div>;
}

export function StrategyLab() {
  const [stopLap, setStopLap] = useState(24);
  const [wear, setWear] = useState(62);
  const [mode, setMode] = useState<"Dry" | "Mixed">("Dry");
  const gain = Math.max(-3.2, Math.min(4.8, (28 - Math.abs(stopLap - 22)) * .2 - wear * .025 + (mode === "Mixed" ? 1.6 : 0)));
  return <div className="strategy-panel"><div className="strategy-head"><div><span>SCENARIO 07</span><h3>UNDERCUT WINDOW</h3></div><div className="mode-switch" aria-label="Track conditions">{(["Dry", "Mixed"] as const).map((item) => <button type="button" className={mode === item ? "active" : ""} onClick={() => setMode(item)} key={item}>{item}</button>)}</div></div>
    <div className="strategy-body">
      <label><span><b>PIT LAP</b><output>{stopLap}</output></span><input aria-label="Pit stop lap" type="range" min="12" max="40" value={stopLap} onChange={(event) => setStopLap(Number(event.target.value))} /></label>
      <label><span><b>TYRE WEAR</b><output>{wear}%</output></span><input aria-label="Tyre wear" type="range" min="20" max="95" value={wear} onChange={(event) => setWear(Number(event.target.value))} /></label>
      <div className="strategy-chart" aria-label="Projected race pace chart">{[44,51,47,58,63,55,69,74,66,82,78,91].map((bar,index) => <i key={index} style={{height:`${bar - Math.abs(stopLap - 24) * (index > 6 ? .7 : .2)}%`}} />)}<span className="pit-line" style={{left:`${clamp((stopLap - 12) / 28 * 86 + 7, 7, 93)}%`}} /></div>
      <div className="strategy-result"><span>PROJECTED DELTA</span><strong className={gain >= 0 ? "positive" : "negative"}>{gain >= 0 ? "+" : ""}{gain.toFixed(1)}s</strong><small>{gain >= 0 ? "Position gained in pit cycle" : "Window compromised"}</small></div>
    </div>
  </div>;
}

const stories = [
  { tag: "AERODYNAMICS / 08 MIN", title: "How ground effect turns pressure into pace", number: "01", className: "story-aero", slug: "ground-effect-pressure-into-pace" },
  { tag: "RACECRAFT / 06 MIN", title: "The anatomy of a perfectly timed undercut", number: "02", className: "story-strategy", slug: "anatomy-of-an-undercut" },
  { tag: "CIRCUITS / 11 MIN", title: "Why rhythm matters more than speed at Suzuka", number: "03", className: "story-track", slug: "why-rhythm-matters-at-suzuka" },
];

export default function ApexExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <main>
    <nav className="nav-shell" aria-label="Primary navigation"><a className="wordmark" href="#top" aria-label="Apex Atlas home"><i />APEX <span>ATLAS</span></a><div className={`nav-links ${menuOpen ? "open" : ""}`}><a href="#top" onClick={() => setMenuOpen(false)}>Race weekend</a><a href="/circuits" onClick={() => setMenuOpen(false)}>Circuits</a><a href="/strategy" onClick={() => setMenuOpen(false)}>Strategy</a><a href="/stories" onClick={() => setMenuOpen(false)}>Journal</a></div><a className="nav-cta" href="#top">Open live brief <span>↗</span></a><button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button></nav>
    <RaceWeekendHub />
    <section className="manifesto section-pad"><p className="section-kicker"><span>02</span> THE APEX ATLAS</p><div><h2>Motorsport moves fast.<br /><em>We make it legible.</em></h2><p>A race-weekend companion for people who want the meaning behind the timing screen: what matters, why it matters and what to watch next.</p></div><div className="manifesto-stats"><span><b>23</b> 2026 ROUNDS</span><span><b>LIVE</b> SESSION CONTEXT</span><span><b>05</b> MINUTE BRIEF</span></div></section>
    <section className="circuits section-pad" id="circuits"><div className="section-heading"><div><p className="section-kicker"><span>03</span> CIRCUIT ATLAS</p><h2>Every corner<br />has a <em>reason.</em></h2></div><p>Trace the real circuit geometry, compare its demands and discover why one sequence rewards patience while the next demands commitment.</p></div><CircuitExplorer /></section>
    <section className="machine section-pad" id="machine"><div className="machine-copy"><p className="section-kicker light"><span>04</span> THE MACHINE</p><h2>Designed by air.<br /><em>Defined by detail.</em></h2><p>Explore a fictional open-wheel concept car, engineered to teach the principles without borrowing a badge, livery or secret.</p><a href="/car-lab" className="text-link">OPEN THE CAR LAB <span>↗</span></a></div><div className="machine-diagram"><img className="machine-render" src="/media/apex-racecar-hero.png" alt="Apex Atlas open-wheel concept car" /><span className="callout callout-one">DOWNFORCE<br /><b>ACTIVE LOAD</b></span><span className="callout callout-two">AIRFLOW<br /><b>CARBON FLOOR</b></span><span className="callout callout-three">CHASSIS<br /><b>AA–01</b></span></div><div className="principles"><div><span>01</span><h3>CONTROL THE FLOW</h3><p>Shape pressure around the car to create grip without carrying unnecessary resistance.</p></div><div><span>02</span><h3>MANAGE THE PLATFORM</h3><p>Keep the floor in its operating window as speed, fuel load and corners change.</p></div><div><span>03</span><h3>TRUST THE DETAIL</h3><p>Small surfaces work as one aerodynamic system. Nothing operates in isolation.</p></div></div></section>
    <section className="strategy section-pad" id="strategy"><div className="section-heading strategy-heading"><div><p className="section-kicker"><span>05</span> STRATEGY STUDIO</p><h2>Win the race<br /><em>before the pass.</em></h2></div><p>Move the pit window and tyre wear controls. See how a single decision changes the shape of the race.</p></div><StrategyLab /></section>
    <section className="journal section-pad" id="journal"><div className="journal-head"><div><p className="section-kicker"><span>06</span> FIELD JOURNAL</p><h2>Read the race<br /><em>differently.</em></h2></div><a className="text-link dark" href="/stories">VIEW ALL STORIES <span>↗</span></a></div><div className="story-grid" id="stories">{stories.map((story) => <article className={`story-card ${story.className}`} key={story.number}><div className="story-art"><span>{story.number}</span><i /></div><p>{story.tag}</p><h3>{story.title}</h3><a href={`/stories/${story.slug}`} aria-label={`Read ${story.title}`}>READ FIELD NOTE <span>↗</span></a></article>)}</div></section>
    <section className="closing"><p>THE CHEQUERED FLAG IS ONLY THE BEGINNING.</p><h2>FIND THE<br /><em>RACING LINE.</em></h2><a href="#circuits" className="button-primary">ENTER THE ATLAS <span>↗</span></a><div className="closing-line" /></section>
    <footer><div className="footer-brand"><a className="wordmark" href="#top"><i />APEX <span>ATLAS</span></a><p>An independent field guide to motorsport technology, circuits and racecraft.</p></div><div className="footer-links"><div><b>EXPLORE</b><a href="/circuits">Circuit Atlas</a><a href="/car-lab">Car Lab</a><a href="/strategy">Strategy Studio</a></div><div><b>ABOUT</b><a href="/about">Our approach</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div><div className="footer-meta"><span>© 2026 APEX ATLAS</span><span>INDEPENDENT. UNOFFICIAL. BUILT FOR THE CURIOUS.</span></div></footer>
  </main>;
}
