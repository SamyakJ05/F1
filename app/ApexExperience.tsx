"use client";

import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { WeekendCommandHub } from "./components/WeekendCommandHub";
import { StrategyStudio } from "./components/StrategyStudio";
import { DriverCompare } from "./components/DriverCompare";
import { MotorsportQuiz } from "./components/MotorsportQuiz";
import { CircuitMap } from "./components/CircuitMap";
import { AdSlot } from "./components/AdSlot";
import { circuits, stories } from "./site-data";

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function Animate({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "scale";
  className?: string;
}) {
  return (
    <div
      className={`aa-reveal aa-reveal-${direction} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Navigation({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const links = [
    ["Weekend Hub", "#weekend-hub"],
    ["Circuits", "/circuits"],
    ["Drivers H2H", "/drivers"],
    ["Strategy", "/strategy"],
    ["Car Lab", "/car-lab"],
    ["Journal", "/stories"],
    ["F1 Quiz", "/quiz"],
  ];

  return (
    <>
      <nav className="aa-nav" aria-label="Primary navigation">
        <Animate direction="down">
          <Link className="aa-logo" href="#top">
            <i />APEX <span>ATLAS</span>
          </Link>
        </Animate>
        <Animate delay={100} direction="down" className="aa-nav-pill">
          {links.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </Animate>
        <Animate delay={200} direction="down" className="aa-nav-action">
          <Link href="/circuits">2026 CALENDAR</Link>
          <a href="#weekend-hub" className="highlight">
            OPEN BRIEF
          </a>
        </Animate>
        <Animate delay={100} direction="down" className="aa-menu-wrap">
          <button
            className={open ? "aa-menu open" : "aa-menu"}
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <i />
            <i />
          </button>
        </Animate>
      </nav>

      <div className={open ? "aa-mobile-nav open" : "aa-mobile-nav"} aria-hidden={!open}>
        <button
          className="aa-mobile-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
        <div className="aa-mobile-panel">
          {links.map(([label, href], index) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${100 + index * 40}ms` : "0ms" }}
            >
              {label}
              <span>↗</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ApexExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const mounted = useMounted();

  const timezone = useMemo(() => {
    if (!mounted) return "LOCAL TIME";
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("_", " ");
    } catch {
      return "Local time";
    }
  }, [mounted]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <main className="aa-site">
      {/* Hero Section */}
      <section className="aa-hero" id="top">
        <div className="aa-hero-media" aria-hidden="true">
          <img src="/media/apex-racecar-hero.png" alt="" />
          <div className="aa-orbit aa-orbit-one" />
          <div className="aa-orbit aa-orbit-two" />
        </div>

        <Navigation open={menuOpen} setOpen={setMenuOpen} />

        <div className="aa-hero-row">
          <div className="aa-hero-copy">
            <Animate delay={250}>
              <p className="aa-kicker">
                <span>●</span> THE RACE, MADE LEGIBLE
              </p>
            </Animate>
            <Animate delay={350}>
              <h1>
                Know the race<br />
                before <em>lights out.</em>
              </h1>
            </Animate>
            <Animate delay={520}>
              <p className="aa-lede">
                A visual field briefing for every Grand Prix weekend—live session timetables, tire degradation curves, trackside weather, and strategic racecraft in five focused minutes.
              </p>
            </Animate>
            <Animate delay={680} className="aa-hero-actions">
              <a className="aa-button aa-button-light" href="#weekend-hub">
                Open weekend brief ↗
              </a>
              <Link className="aa-button aa-button-ghost" href="/circuits">
                Explore 23 circuits
              </Link>
            </Animate>
            <Animate delay={780}>
              <p className="aa-local-time" suppressHydrationWarning>
                LIVE TELEMETRY · {timezone.toUpperCase()} · SPOILER-SAFE READING
              </p>
            </Animate>
          </div>
        </div>

        <a className="aa-scroll-cue" href="#weekend-hub">
          <span /> SCROLL TO EXPLORE LIVE BRIEFING
        </a>
      </section>

      {/* Top Banner Ad Container */}
      <div className="aa-home-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      {/* Live Weekend Command Center */}
      <section className="aa-home-command-section">
        <WeekendCommandHub />
      </section>

      {/* Why Apex Atlas Value Pillars */}
      <section className="aa-purpose" id="purpose">
        <div className="aa-purpose-head">
          <p>ENGINEERING &amp; RACECRAFT INTELLIGENCE</p>
          <h2>
            Everything that matters.<br />
            <em>Nothing that doesn&apos;t.</em>
          </h2>
          <p>
            Built for the hour before a session, the second-screen check during qualifying, and the technical debate after the chequered flag.
          </p>
        </div>
        <div className="aa-purpose-grid">
          <article>
            <span>01</span>
            <h3>Arrive prepared</h3>
            <p>
              Your local session conversion, live track temperatures, and Pirelli tire allocations for this weekend.
            </p>
            <a href="#weekend-hub">VIEW THIS WEEKEND ↗</a>
          </article>
          <article>
            <span>02</span>
            <h3>Read the circuit</h3>
            <p>
              Real track geometry with sector breakdowns, DRS detection points, and corner-by-corner braking lessons.
            </p>
            <Link href="/circuits">OPEN CIRCUIT ATLAS ↗</Link>
          </article>
          <article>
            <span>03</span>
            <h3>Test the pit call</h3>
            <p>
              Simulate tire degradation curves, undercut timings, and safety car pit stop delta discounts.
            </p>
            <Link href="/strategy">TRY STRATEGY STUDIO ↗</Link>
          </article>
        </div>
      </section>

      {/* Driver Head to Head Battle Teaser */}
      <section className="aa-home-h2h-section">
        <DriverCompare />
      </section>

      {/* Mid-Page Native Ad Container */}
      <div className="aa-home-ad-wrap">
        <AdSlot format="in-article" />
      </div>

      {/* Interactive Strategy Studio */}
      <section className="aa-home-strategy-section">
        <StrategyStudio />
      </section>

      {/* Featured 2026 Circuit Grid */}
      <section className="aa-home-circuits-section">
        <div className="section-head-split">
          <div>
            <span className="aa-kicker"><span>01</span> 2026 WORLD CHAMPIONSHIP</span>
            <h2>Featured Grand Prix Tracks</h2>
          </div>
          <Link href="/circuits" className="aa-button aa-button-ghost">
            VIEW ALL 23 VENUES ↗
          </Link>
        </div>

        <div className="circuit-library">
          {circuits.slice(0, 3).map((circuit, index) => (
            <article className="circuit-library-card" key={circuit.slug}>
              <div className="circuit-card-art">
                <CircuitMap slug={circuit.slug} name={circuit.name} />
                <span>0{index + 1}</span>
                <b>{circuit.country.toUpperCase()}</b>
              </div>
              <p>{circuit.character.toUpperCase()}</p>
              <h2>{circuit.name}</h2>
              <div className="card-specs">
                <span>{circuit.distance}</span>
                <span>{circuit.turns}</span>
                <span>{circuit.lapType}</span>
              </div>
              <Link href={`/circuits/${circuit.slug}`}>
                OPEN CIRCUIT NOTE <span>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Motorsport IQ Challenge */}
      <section className="aa-home-quiz-section">
        <MotorsportQuiz />
      </section>

      {/* Technical Journal Field Notes */}
      <section className="aa-home-stories-section">
        <div className="section-head-split">
          <div>
            <span className="aa-kicker"><span>05</span> MOTORSPORT JOURNAL</span>
            <h2>Technical Field Notes</h2>
          </div>
          <Link href="/stories" className="aa-button aa-button-ghost">
            ALL EXPLAINERS ↗
          </Link>
        </div>

        <div className="stories-index">
          {stories.slice(0, 3).map((story, index) => (
            <article key={story.slug} className="story-card-item">
              <div className="story-card-meta">
                <span>0{index + 1} / {story.tag}</span>
                <time>{story.minutes} READ</time>
              </div>
              <h2>{story.title}</h2>
              <p className="story-deck">{story.deck}</p>
              <Link href={`/stories/${story.slug}`} className="read-note-link">
                READ FIELD NOTE <b>↗</b>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="aa-newsletter-section">
        <div className="aa-newsletter-wrap">
          <div className="aa-newsletter-copy">
            <span className="aa-kicker"><span>WEEKEND INTELLIGENCE</span> THE RACE, DELIVERED</span>
            <h2>Get the 5-minute pre-race briefing</h2>
            <p>
              Tire degradation charts, local weather forecasts, and key overtaking zones sent directly to your inbox before lights out.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="aa-newsletter-form">
            {subscribed ? (
              <div className="aa-newsletter-success">
                <span>✓</span> You&apos;re subscribed to the Race Weekend Briefing!
              </div>
            ) : (
              <div className="aa-input-btn-row">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  aria-label="Email address for motorsport newsletter"
                />
                <button type="submit" className="aa-button aa-button-light">
                  SUBSCRIBE FREE ↗
                </button>
              </div>
            )}
            <small>Spoiler-safe. 1 email per race weekend. Zero spam.</small>
          </form>
        </div>
      </section>

      {/* Footer Leaderboard Ad Placement */}
      <div className="aa-home-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      {/* Footer */}
      <footer className="aa-footer">
        <div className="aa-footer-brand">
          <Link className="aa-logo" href="#top">
            <i />APEX <span>ATLAS</span>
          </Link>
          <p>
            Independent motorsport field notes and racecraft analytics. Designed for fans, engineers, and curious minds who want to understand the race before lights out.
          </p>
          <small className="copyright">
            © 2026 APEX ATLAS · UNOFFICIAL &amp; INDEPENDENT PUBLICATION.
          </small>
        </div>

        <div className="aa-footer-nav-grid">
          <div className="footer-col">
            <b>ANALYTICS &amp; TOOLS</b>
            <Link href="/circuits">2026 Circuit Atlas</Link>
            <Link href="/drivers">Drivers Championship &amp; H2H</Link>
            <Link href="/strategy">Strategy &amp; Undercut Lab</Link>
            <Link href="/car-lab">Car Aerodynamics Lab</Link>
            <Link href="/quiz">Motorsport IQ Challenge</Link>
          </div>

          <div className="footer-col">
            <b>TECHNICAL JOURNAL</b>
            <Link href="/stories/ground-effect-pressure-into-pace">Ground Effect Aerodynamics</Link>
            <Link href="/stories/anatomy-of-an-undercut">Anatomy of the Undercut</Link>
            <Link href="/stories/active-aero-2026-regulations">2026 Active Aero Rules</Link>
            <Link href="/stories/tire-chemistry-thermal-degradation">Tire Chemistry &amp; Degradation</Link>
          </div>

          <div className="footer-col">
            <b>EDITORIAL &amp; TRUST</b>
            <Link href="/about">About &amp; Editorial Team</Link>
            <Link href="/contact">Contact &amp; Feedback</Link>
            <Link href="/privacy">Privacy Notice &amp; Cookies</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/ads.txt">Ads.txt Verification</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
