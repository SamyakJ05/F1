"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CircuitMap } from "./CircuitMap";
import { WeatherWidget } from "./WeatherWidget";

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

type Session = { name: string; startsAt: string; endsAt: string };
type Standing = { position: number; code: string; name: string; team: string; points: number; wins: number };
type WeekendData = {
  meeting: { country: string; location: string; circuit: string; round: number };
  sessions: Session[];
  standings: Standing[];
  tireAllocation: { soft: string; medium: string; hard: string };
  updatedAt: string;
};

const fallbackWeekend: WeekendData = {
  meeting: { country: "Netherlands", location: "Zandvoort", circuit: "Circuit Zandvoort", round: 12 },
  sessions: [
    { name: "Practice 1", startsAt: "2026-08-21T10:30:00Z", endsAt: "2026-08-21T11:30:00Z" },
    { name: "Sprint Qualifying", startsAt: "2026-08-21T14:30:00Z", endsAt: "2026-08-21T15:14:00Z" },
    { name: "Sprint", startsAt: "2026-08-22T10:00:00Z", endsAt: "2026-08-22T11:00:00Z" },
    { name: "Qualifying", startsAt: "2026-08-22T14:00:00Z", endsAt: "2026-08-22T15:00:00Z" },
    { name: "Grand Prix", startsAt: "2026-08-23T13:00:00Z", endsAt: "2026-08-23T15:00:00Z" },
  ],
  standings: [
    { position: 1, code: "ANT", name: "Andrea Kimi Antonelli", team: "Mercedes", points: 224, wins: 6 },
    { position: 2, code: "HAM", name: "Lewis Hamilton", team: "Ferrari", points: 171, wins: 1 },
    { position: 3, code: "RUS", name: "George Russell", team: "Mercedes", points: 168, wins: 2 },
    { position: 4, code: "LEC", name: "Charles Leclerc", team: "Ferrari", points: 145, wins: 1 },
    { position: 5, code: "NOR", name: "Lando Norris", team: "McLaren", points: 134, wins: 1 },
  ],
  tireAllocation: { soft: "C4 (Red)", medium: "C3 (Yellow)", hard: "C2 (White)" },
  updatedAt: "2026-08-22T00:00:00Z",
};

function formatCountdown(ms: number) {
  if (ms <= 0) return "SESSION LIVE";
  const seconds = Math.floor(ms / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days ? `${days}D ` : ""}${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M ${String(secs).padStart(2, "0")}S`;
}

export function WeekendCommandHub() {
  const [weekend, setWeekend] = useState<WeekendData>(fallbackWeekend);
  const [now, setNow] = useState<number>(0);
  const [timezoneMode, setTimezoneMode] = useState<"local" | "track">("local");
  const [spoilerFree, setSpoilerFree] = useState(false);
  const mounted = useMounted();
  
  // Community Fan Poll State
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [pollVotes, setPollVotes] = useState({
    ANT: 42,
    HAM: 28,
    RUS: 14,
    LEC: 11,
    NOR: 5,
  });
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedVote = window.localStorage.getItem("apex-fan-poll-winner");
        if (savedVote) {
          setSelectedDriver(savedVote);
          setHasVoted(true);
        }
        const savedSpoiler = window.localStorage.getItem("apex-spoiler-free");
        if (savedSpoiler === "true") {
          setSpoilerFree(true);
        }
      } catch {
        // Safe no-op on private browsing
      }
    }, 0);

    fetch("/api/race-weekend")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.sessions) {
          setWeekend((prev) => ({
            ...prev,
            meeting: { ...prev.meeting, ...data.meeting },
            sessions: data.sessions,
            standings: data.standings || prev.standings,
          }));
        }
      })
      .catch(() => undefined);

    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, []);

  const handleVote = (driverCode: string) => {
    if (hasVoted) return;
    setSelectedDriver(driverCode);
    setHasVoted(true);
    try {
      window.localStorage.setItem("apex-fan-poll-winner", driverCode);
    } catch {
      // Safe no-op
    }
    setPollVotes((prev) => ({
      ...prev,
      [driverCode]: (prev[driverCode as keyof typeof prev] || 0) + 1,
    }));
  };

  const toggleSpoiler = () => {
    const next = !spoilerFree;
    setSpoilerFree(next);
    try {
      window.localStorage.setItem("apex-spoiler-free", String(next));
    } catch {
      // Safe no-op
    }
  };

  const currentTime = now > 0 ? now : 1787385600000;
  const nextSession =
    weekend.sessions.find((s) => Date.parse(s.endsAt) >= currentTime) ??
    weekend.sessions.at(-1)!;
  const nextStart = Date.parse(nextSession.startsAt);
  const isLive = nextStart <= currentTime && Date.parse(nextSession.endsAt) >= currentTime;
  const userTimezone = useMemo(() => {
    if (!mounted) return "UTC";
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("_", " ");
    } catch {
      return "UTC";
    }
  }, [mounted]);

  return (
    <section className="aa-command-hub" id="weekend-hub" aria-label="Race Weekend Command Center">
      <div className="aa-hub-header">
        <div className="aa-hub-kicker">
          <span className="aa-live-indicator"><i /> ROUND {weekend.meeting.round}</span>
          <span className="aa-hub-badge">2026 WORLD CHAMPIONSHIP</span>
        </div>
        <div className="aa-hub-title-row">
          <div>
            <h1>{weekend.meeting.circuit}</h1>
            <p className="aa-hub-sub">{weekend.meeting.country.toUpperCase()} · {weekend.meeting.location.toUpperCase()}</p>
          </div>
          <div className="aa-hub-controls">
            <button
              type="button"
              className={`aa-toggle-btn ${spoilerFree ? "active" : ""}`}
              onClick={toggleSpoiler}
              aria-label="Toggle spoiler protection"
            >
              <i /> SPOILERS {spoilerFree ? "HIDDEN" : "SHOWN"}
            </button>
            <div className="aa-tz-switch" role="group" aria-label="Timezone switcher">
              <button
                type="button"
                className={timezoneMode === "local" ? "active" : ""}
                onClick={() => setTimezoneMode("local")}
                suppressHydrationWarning
              >
                YOUR TIME ({mounted ? userTimezone.split("/").pop() : "LOCAL"})
              </button>
              <button
                type="button"
                className={timezoneMode === "track" ? "active" : ""}
                onClick={() => setTimezoneMode("track")}
              >
                TRACK TIME (CET/UTC+2)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="aa-hub-grid">
        {/* Session Countdown & Schedule Card */}
        <div className="aa-hub-card aa-session-card">
          <div className="aa-session-live-bar">
            <div className="aa-session-status">
              <span className={isLive ? "live-pulse" : "upcoming-dot"} />
              <b>{isLive ? "SESSION ACTIVE NOW" : `NEXT SESSION: ${nextSession.name.toUpperCase()}`}</b>
            </div>
            <strong className="aa-countdown-display" suppressHydrationWarning>
              {now === 0 ? "SYNCING..." : isLive ? "LIVE ON TRACK" : formatCountdown(nextStart - currentTime)}
            </strong>
          </div>

          <div className="aa-timetable-list">
            {weekend.sessions.map((session) => {
              const start = Date.parse(session.startsAt);
              const ends = Date.parse(session.endsAt);
              const isPast = ends < currentTime;
              const isCurrent = start <= currentTime && ends >= currentTime;

              const timeDisplay = mounted
                ? new Intl.DateTimeFormat(undefined, {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: timezoneMode === "track" ? "Europe/Amsterdam" : undefined,
                  }).format(start)
                : new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC",
                  }).format(start);

              return (
                <div
                  key={session.name}
                  className={`aa-timetable-row ${isCurrent ? "current" : isPast ? "past" : ""}`}
                >
                  <div className="aa-row-info">
                    <span className="aa-row-state">{isPast ? "✓" : isCurrent ? "●" : "○"}</span>
                    <strong className="aa-row-name">{session.name}</strong>
                  </div>
                  <time className="aa-row-time" suppressHydrationWarning>{timeDisplay}</time>
                </div>
              );
            })}
          </div>

          <div className="aa-tire-allocation">
            <div className="aa-tire-title">
              <span>PIRELLI TIRE ALLOCATIONS</span>
              <small>DRY SLICKS</small>
            </div>
            <div className="aa-tire-pills">
              <span className="tire-pill soft">🔴 SOFT {weekend.tireAllocation.soft}</span>
              <span className="tire-pill medium">🟡 MEDIUM {weekend.tireAllocation.medium}</span>
              <span className="tire-pill hard">⚪ HARD {weekend.tireAllocation.hard}</span>
            </div>
          </div>
        </div>

        {/* Track Geometry & Weather */}
        <div className="aa-hub-card aa-track-weather-card">
          <div className="aa-map-wrap">
            <CircuitMap slug="zandvoort" name="Circuit Zandvoort" className="aa-hub-map" />
            <div className="aa-quick-specs">
              <div><span>LENGTH</span><b>4.259 KM</b></div>
              <div><span>LAPS</span><b>72</b></div>
              <div><span>BANKING</span><b>19° / 18°</b></div>
              <div><span>PIT LOSS</span><b>21.5s</b></div>
            </div>
          </div>

          <WeatherWidget circuitSlug="zandvoort" />
        </div>

        {/* Championship Standings & Fan Prediction Poll */}
        <div className="aa-hub-card aa-intel-card">
          <div className="aa-standings-section">
            <div className="aa-card-subhead">
              <span>CHAMPIONSHIP STANDINGS</span>
              <small>TOP 5</small>
            </div>
            <div className={`aa-standings-table ${spoilerFree ? "blurred" : ""}`}>
              {weekend.standings.map((driver) => (
                <div key={driver.code} className="aa-driver-row">
                  <span className="pos">0{driver.position}</span>
                  <div className="driver-meta">
                    <b>{driver.name}</b>
                    <small>{driver.team}</small>
                  </div>
                  <strong className="pts">{driver.points} <small>PTS</small></strong>
                </div>
              ))}
            </div>
            {spoilerFree && (
              <div className="aa-reveal-overlay">
                <button type="button" onClick={toggleSpoiler}>REVEAL STANDINGS</button>
              </div>
            )}
          </div>

          {/* Fan Prediction Poll */}
          <div className="aa-fan-poll">
            <div className="aa-card-subhead">
              <span>FAN PREDICTION POLL</span>
              <small>{hasVoted ? "YOUR VOTE RECORDED" : "SELECT WINNER"}</small>
            </div>
            <p className="aa-poll-q">Who takes the victory this weekend?</p>
            <div className="aa-poll-options">
              {weekend.standings.map((d) => {
                const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);
                const count = pollVotes[d.code as keyof typeof pollVotes] || 0;
                const percent = Math.round((count / totalVotes) * 100);
                const isSelected = selectedDriver === d.code;

                return (
                  <button
                    key={d.code}
                    type="button"
                    className={`aa-poll-btn ${isSelected ? "selected" : ""}`}
                    onClick={() => handleVote(d.code)}
                  >
                    <div className="aa-poll-bar" style={{ width: `${percent}%` }} />
                    <span className="aa-poll-driver">
                      <b>{d.code}</b> {d.name.split(" ").pop()}
                    </span>
                    <span className="aa-poll-percent">{percent}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
