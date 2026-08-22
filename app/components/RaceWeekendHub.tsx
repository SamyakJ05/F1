"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CircuitMap } from "./CircuitMap";

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

type Session = { name: string; startsAt: string; endsAt: string };
type Standing = { position: number; code: string; name: string; team: string; points: number; wins: number };
type WeekendData = {
  meeting: { country: string; location: string; circuit: string };
  sessions: Session[];
  standings: Standing[];
  updatedAt: string;
};

const fallback: WeekendData = {
  meeting: { country: "Netherlands", location: "Zandvoort", circuit: "Zandvoort" },
  sessions: [
    { name: "Practice 1", startsAt: "2026-08-21T10:30:00Z", endsAt: "2026-08-21T11:30:00Z" },
    { name: "Sprint Qualifying", startsAt: "2026-08-21T14:30:00Z", endsAt: "2026-08-21T15:14:00Z" },
    { name: "Sprint", startsAt: "2026-08-22T10:00:00Z", endsAt: "2026-08-22T11:00:00Z" },
    { name: "Qualifying", startsAt: "2026-08-22T14:00:00Z", endsAt: "2026-08-22T15:00:00Z" },
    { name: "Race", startsAt: "2026-08-23T13:00:00Z", endsAt: "2026-08-23T15:00:00Z" },
  ],
  standings: [
    { position: 1, code: "ANT", name: "Andrea Kimi Antonelli", team: "Mercedes", points: 224, wins: 6 },
    { position: 2, code: "HAM", name: "Lewis Hamilton", team: "Ferrari", points: 171, wins: 1 },
    { position: 3, code: "RUS", name: "George Russell", team: "Mercedes", points: 168, wins: 2 },
    { position: 4, code: "LEC", name: "Charles Leclerc", team: "Ferrari", points: 145, wins: 1 },
    { position: 5, code: "NOR", name: "Lando Norris", team: "McLaren", points: 134, wins: 1 },
  ],
  updatedAt: "2026-08-22T00:00:00Z",
};

const watchPoints = [
  ["01", "Track position compounds", "A narrow racing line makes qualifying and pit timing unusually valuable. Traffic can erase a tyre advantage before it becomes an overtake."],
  ["02", "Banking changes the load", "Turns 3 and 14 let drivers use different lines, but the sustained load asks more from the tyre and the car's platform."],
  ["03", "The Sprint compresses learning", "With less practice, teams must commit earlier. A setup mistake becomes harder to unwind before qualifying and the race."],
];

function formatCountdown(ms: number) {
  if (ms <= 0) return "SESSION LIVE";
  const seconds = Math.floor(ms / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days ? `${days}D ` : ""}${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M ${String(secs).padStart(2, "0")}S`;
}

export function RaceWeekendHub() {
  const [weekend, setWeekend] = useState(fallback);
  const [now, setNow] = useState<number>(0);
  const [spoilerFree, setSpoilerFree] = useState(false);
  const [stopLap, setStopLap] = useState(28);
  const [degradation, setDegradation] = useState<"Low" | "Medium" | "High">("Medium");
  const [safetyCar, setSafetyCar] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = window.localStorage.getItem("apex-spoiler-free");
        if (saved === "true") {
          setSpoilerFree(true);
        }
      } catch {
        // Safe no-op
      }
    }, 0);
    fetch("/api/race-weekend").then((response) => response.ok ? response.json() : null).then((data) => { if (data) setWeekend(data); }).catch(() => undefined);
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, []);

  const toggleSpoilers = () => {
    const next = !spoilerFree;
    setSpoilerFree(next);
    try {
      window.localStorage.setItem("apex-spoiler-free", String(next));
    } catch {
      // Safe no-op
    }
  };
  const currentTime = now > 0 ? now : 1787385600000;
  const nextSession = weekend.sessions.find((session) => Date.parse(session.endsAt) >= currentTime) ?? weekend.sessions.at(-1)!;
  const nextStart = Date.parse(nextSession.startsAt);
  const isLive = nextStart <= currentTime && Date.parse(nextSession.endsAt) >= currentTime;
  const timezone = useMemo(() => {
    if (!mounted) return "Local time";
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("_", " ");
    } catch {
      return "Local time";
    }
  }, [mounted]);
  const preferredLap = degradation === "High" ? 22 : degradation === "Medium" ? 29 : 36;
  const windowScore = Math.max(0, 100 - Math.abs(stopLap - preferredLap) * 7 + (safetyCar ? 10 : 0));
  const strategyLabel = windowScore > 82 ? "STRONG WINDOW" : windowScore > 58 ? "WORKABLE" : "HIGH RISK";

  return <header className="race-hub" id="top">
    <div className="race-hub-intro"><div><p className="eyebrow"><span>LIVE</span> YOUR FIVE-MINUTE RACE BRIEF</p><h1>UNDERSTAND<br />THE <em>RACE.</em></h1></div><div className="race-hub-promise"><p>The sessions, circuit and decisions that matter this weekend—translated into one clear visual briefing.</p><button type="button" className={spoilerFree ? "spoiler-toggle active" : "spoiler-toggle"} onClick={toggleSpoilers} aria-pressed={spoilerFree}><i /> SPOILER-FREE {spoilerFree ? "ON" : "OFF"}</button></div></div>

    <div className="race-command-grid">
      <section className="weekend-card"><div className="weekend-card-top"><span>2026 RACE WEEKEND</span><b className={isLive ? "pulse" : ""}>{isLive ? "SESSION LIVE" : `NEXT · ${nextSession.name.toUpperCase()}`}</b></div><p>{weekend.meeting.country.toUpperCase()} · {weekend.meeting.location.toUpperCase()}</p><h2>{weekend.meeting.circuit}</h2><div className="countdown"><span>{isLive ? "NOW RUNNING" : "LIGHTS OUT IN"}</span><strong suppressHydrationWarning>{isLive ? "SESSION LIVE" : formatCountdown(nextStart - currentTime)}</strong><small suppressHydrationWarning>Shown in your timezone · {timezone}</small></div><div className="session-strip">{weekend.sessions.map((session) => { const start = Date.parse(session.startsAt); const ended = Date.parse(session.endsAt) < currentTime; return <div className={session.name === nextSession.name ? "active" : ended ? "complete" : ""} key={session.name}><span>{ended ? "✓" : session.name}</span><time suppressHydrationWarning>{new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "2-digit", minute: "2-digit" }).format(start)}</time></div>; })}</div><div className="data-line">Session feed: <a href="https://openf1.org/" target="_blank" rel="noreferrer">OpenF1 ↗</a> · Schedule reference: <a href="https://www.formula1.com/en/racing/2026" target="_blank" rel="noreferrer">Formula 1 ↗</a></div></section>

      <aside className="weekend-track"><CircuitMap slug="zandvoort" name="Circuit Zandvoort" /><div className="track-facts"><span><b>4.259</b> KM</span><span><b>72</b> LAPS</span><span><b>14</b> TURNS</span><span><b>21.52</b> S PIT LOSS*</span></div><a href="https://www.formula1.com/en/information/netherlands-zandvoort-circuit-zandvoort.6XdtPTIMZzx5wLKP9mm7Ev" target="_blank" rel="noreferrer">OFFICIAL CIRCUIT REFERENCE ↗</a></aside>
    </div>

    <section className="watch-brief"><div className="watch-brief-title"><span>WHAT DECIDES THIS RACE</span><strong>03 SIGNALS</strong></div>{watchPoints.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</section>

    <div className="race-intelligence">
      <section className="standings-card"><div className="panel-title"><span>CHAMPIONSHIP CONTEXT</span><b>AFTER ROUND 11</b></div><div className={spoilerFree ? "standings-list spoiler-veil" : "standings-list"}>{weekend.standings.map((driver) => <div key={driver.code}><span>{String(driver.position).padStart(2, "0")}</span><b>{driver.code}</b><p>{driver.name}<small>{driver.team}</small></p><strong>{driver.points}<small>PTS</small></strong></div>)}</div>{spoilerFree && <button type="button" onClick={toggleSpoilers}>REVEAL STANDINGS</button>}<p className="data-line">Standings: <a href="https://api.jolpi.ca/ergast/f1/" target="_blank" rel="noreferrer">Jolpica F1 API ↗</a></p></section>
      <section className="weekend-strategy"><div className="panel-title"><span>STRATEGY SKETCH</span><b>ILLUSTRATIVE MODEL</b></div><label><span>PIT LAP <output>{stopLap}</output></span><input type="range" min="14" max="46" value={stopLap} onChange={(event) => setStopLap(Number(event.target.value))} /></label><div className="degradation-control"><span>DEGRADATION</span>{(["Low", "Medium", "High"] as const).map((level) => <button type="button" className={degradation === level ? "active" : ""} onClick={() => setDegradation(level)} key={level}>{level}</button>)}</div><button type="button" className={safetyCar ? "safety-car active" : "safety-car"} onClick={() => setSafetyCar(!safetyCar)} aria-pressed={safetyCar}>SAFETY CAR {safetyCar ? "IN WINDOW" : "OFF"}</button><div className="strategy-readout"><span>{strategyLabel}</span><strong>{windowScore}%</strong><p>{safetyCar ? "A neutralised pit stop reduces the effective time loss." : `This tyre-life assumption favours a stop near lap ${preferredLap}.`}</p></div></section>
    </div>
  </header>;
}
