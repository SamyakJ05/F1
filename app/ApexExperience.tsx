"use client";

import { useEffect, useRef, useState } from "react";

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

const circuitPaths = {
  Suzuka: "M40,170 C25,100 70,30 138,58 C185,79 210,24 268,45 C324,67 274,114 238,128 C203,141 200,191 247,201 C298,211 330,166 356,185 C384,204 349,241 310,245 C252,251 222,212 184,202 C139,191 120,247 75,229 C38,215 63,181 40,170Z",
  Spa: "M38,205 C69,187 54,125 94,119 C135,113 135,54 185,46 C233,38 239,91 286,91 C341,91 373,126 350,161 C330,190 284,173 270,211 C255,250 210,240 185,210 C157,175 126,232 88,238 C62,241 52,219 38,205Z",
  Silverstone: "M52,191 C90,180 66,130 107,118 L150,96 C180,78 189,42 224,54 C252,64 237,99 270,111 C312,126 357,107 364,146 C371,184 329,180 308,208 C281,244 235,213 201,224 C165,236 143,211 119,216 C80,224 70,202 52,191Z",
};
type CircuitName = keyof typeof circuitPaths;

function CircuitExplorer() {
  const [circuit, setCircuit] = useState<CircuitName>("Suzuka");
  const info = { Suzuka: ["5.8 KM", "18 TURNS", "FIGURE EIGHT"], Spa: ["7.0 KM", "19 TURNS", "HIGH SPEED"], Silverstone: ["5.9 KM", "18 TURNS", "AERO LOAD"] }[circuit];
  return <div className="circuit-console">
    <div className="console-topline"><span>TRACK MODEL / 01</span><span className="live-dot">INTERACTIVE</span></div>
    <div className="track-stage"><div className="track-grid" />
      <svg className="track-map" viewBox="0 0 400 280" aria-label={`Stylized ${circuit} circuit map`}><path className="track-shadow" d={circuitPaths[circuit]} /><path className="track-line" d={circuitPaths[circuit]} /><path className="track-progress" d={circuitPaths[circuit]} /></svg>
      <span className="track-marker marker-one">T1</span><span className="track-marker marker-two">APEX</span>
      <div className="track-title"><span>FEATURED CIRCUIT</span><strong>{circuit.toUpperCase()}</strong></div>
    </div>
    <div className="circuit-stats">{info.map((stat) => <span key={stat}>{stat}</span>)}</div>
    <div className="circuit-tabs" aria-label="Select a circuit">{(Object.keys(circuitPaths) as CircuitName[]).map((name, index) => <button type="button" key={name} className={circuit === name ? "active" : ""} onClick={() => setCircuit(name)}><span>0{index + 1}</span>{name}</button>)}</div>
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
    <nav className="nav-shell" aria-label="Primary navigation"><a className="wordmark" href="#top" aria-label="Apex Atlas home"><i />APEX <span>ATLAS</span></a><div className={`nav-links ${menuOpen ? "open" : ""}`}><a href="/circuits" onClick={() => setMenuOpen(false)}>Circuits</a><a href="/car-lab" onClick={() => setMenuOpen(false)}>Machine</a><a href="/strategy" onClick={() => setMenuOpen(false)}>Strategy</a><a href="/stories" onClick={() => setMenuOpen(false)}>Journal</a></div><a className="nav-cta" href="/circuits">Enter the atlas <span>↗</span></a><button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button></nav>
    <header className="hero" id="top"><div className="hero-noise" /><div className="hero-copy"><p className="eyebrow"><span>01</span> THE INDEPENDENT MOTORSPORT FIELD GUIDE</p><h1><span>RACECRAFT,</span><br />DECODED.</h1><p className="hero-lede">Go beneath the bodywork. Read the racing line. Understand the split-second decisions that turn velocity into victory.</p><div className="hero-actions"><a href="#circuits" className="button-primary">EXPLORE THE ATLAS <span>↗</span></a><span className="micro-copy">CIRCUITS / MACHINES / STRATEGY</span></div></div>
      <div className="hero-visual"><CarCanvas /><div className="visual-label label-a"><span>01</span> FRONT WING<br /><b>LOAD VECTOR</b></div><div className="visual-label label-b"><span>02</span> FLOOR EDGE<br /><b>PRESSURE ZONE</b></div><div className="visual-index">AA–01<br /><span>CONCEPT MACHINE</span></div><div className="drag-note">DRAG TO INSPECT <span>↔</span></div></div>
      <div className="hero-rail"><div><span>FIELD NOTE</span><strong>Air is invisible.<br />Its consequences aren&apos;t.</strong></div><div className="scroll-mark"><i /> SCROLL TO EXPLORE</div></div>
    </header>
    <section className="manifesto section-pad"><p className="section-kicker"><span>02</span> THE APEX ATLAS</p><div><h2>Motorsport moves fast.<br /><em>We slow it down.</em></h2><p>A living visual archive of the circuits, machines and decisions that define racing. Built for the curious—whether you&apos;re learning your first apex or chasing the final tenth.</p></div><div className="manifesto-stats"><span><b>03</b> CIRCUIT MODELS</span><span><b>01</b> CONCEPT MACHINE</span><span><b>∞</b> RACING LINES</span></div></section>
    <section className="circuits section-pad" id="circuits"><div className="section-heading"><div><p className="section-kicker"><span>03</span> CIRCUIT ATLAS</p><h2>Every corner<br />has a <em>reason.</em></h2></div><p>Rotate the map. Trace the ideal line. Discover why one sequence rewards patience while the next demands commitment.</p></div><CircuitExplorer /></section>
    <section className="machine section-pad" id="machine"><div className="machine-copy"><p className="section-kicker light"><span>04</span> THE MACHINE</p><h2>Designed by air.<br /><em>Defined by detail.</em></h2><p>Explore a fictional open-wheel concept car, engineered to teach the principles without borrowing a badge, livery or secret.</p><a href="/car-lab" className="text-link">OPEN THE CAR LAB <span>↗</span></a></div><div className="machine-diagram"><div className="aero-ring ring-one" /><div className="aero-ring ring-two" /><div className="aero-ring ring-three" /><div className="machine-silhouette"><i className="wing front" /><i className="body" /><i className="cockpit" /><i className="wing rear" /></div><span className="callout callout-one">DOWNFORCE<br /><b>1,140 KG</b></span><span className="callout callout-two">AIRFLOW<br /><b>240 KM/H</b></span><span className="callout callout-three">DRAG COEFF.<br /><b>0.73</b></span></div><div className="principles"><div><span>01</span><h3>CONTROL THE FLOW</h3><p>Shape pressure around the car to create grip without carrying unnecessary resistance.</p></div><div><span>02</span><h3>MANAGE THE PLATFORM</h3><p>Keep the floor in its operating window as speed, fuel load and corners change.</p></div><div><span>03</span><h3>TRUST THE DETAIL</h3><p>Small surfaces work as one aerodynamic system. Nothing operates in isolation.</p></div></div></section>
    <section className="strategy section-pad" id="strategy"><div className="section-heading strategy-heading"><div><p className="section-kicker"><span>05</span> STRATEGY STUDIO</p><h2>Win the race<br /><em>before the pass.</em></h2></div><p>Move the pit window and tyre wear controls. See how a single decision changes the shape of the race.</p></div><StrategyLab /></section>
    <section className="journal section-pad" id="journal"><div className="journal-head"><div><p className="section-kicker"><span>06</span> FIELD JOURNAL</p><h2>Read the race<br /><em>differently.</em></h2></div><a className="text-link dark" href="/stories">VIEW ALL STORIES <span>↗</span></a></div><div className="story-grid" id="stories">{stories.map((story) => <article className={`story-card ${story.className}`} key={story.number}><div className="story-art"><span>{story.number}</span><i /></div><p>{story.tag}</p><h3>{story.title}</h3><a href={`/stories/${story.slug}`} aria-label={`Read ${story.title}`}>READ FIELD NOTE <span>↗</span></a></article>)}</div></section>
    <section className="closing"><p>THE CHEQUERED FLAG IS ONLY THE BEGINNING.</p><h2>FIND THE<br /><em>RACING LINE.</em></h2><a href="#circuits" className="button-primary">ENTER THE ATLAS <span>↗</span></a><div className="closing-line" /></section>
    <footer><div className="footer-brand"><a className="wordmark" href="#top"><i />APEX <span>ATLAS</span></a><p>An independent field guide to motorsport technology, circuits and racecraft.</p></div><div className="footer-links"><div><b>EXPLORE</b><a href="/circuits">Circuit Atlas</a><a href="/car-lab">Car Lab</a><a href="/strategy">Strategy Studio</a></div><div><b>ABOUT</b><a href="/about">Our approach</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div><div className="footer-meta"><span>© 2026 APEX ATLAS</span><span>INDEPENDENT. UNOFFICIAL. BUILT FOR THE CURIOUS.</span></div></footer>
  </main>;
}
