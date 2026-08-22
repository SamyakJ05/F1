"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AdSlot } from "./AdSlot";
import { circuits, stories } from "../site-data";

export function AtlasShell({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredCircuits = searchQuery.trim()
    ? circuits.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredStories = searchQuery.trim()
    ? stories.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <main className="atlas-page">
      <header className="atlas-header">
        <Link className="wordmark" href="/">
          <i />APEX <span>ATLAS</span>
        </Link>

        <nav aria-label="Primary navigation">
          <Link href="/circuits">Circuits</Link>
          <Link href="/drivers">Drivers H2H</Link>
          <Link href="/strategy">Strategy</Link>
          <Link href="/car-lab">Car Lab</Link>
          <Link href="/stories">Journal</Link>
          <Link href="/quiz">F1 Quiz</Link>
        </nav>

        <div className="atlas-header-actions">
          <button
            type="button"
            className="aa-search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label="Search circuits and technical articles"
          >
            <span>🔍 Search Atlas...</span>
            <kbd>⌘K</kbd>
          </button>
          <Link className="atlas-header-cta" href="/circuits">
            2026 CALENDAR ↗
          </Link>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="aa-search-modal-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="aa-search-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="aa-search-input-wrap">
              <input
                type="text"
                placeholder="Search circuits, technical stories, aerodynamics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)}>ESC</button>
            </div>

            <div className="aa-search-results">
              {searchQuery.trim() === "" ? (
                <div className="aa-search-suggestions">
                  <span>POPULAR SEARCHES:</span>
                  <div className="pills">
                    <button type="button" onClick={() => setSearchQuery("Suzuka")}>Suzuka Circuit</button>
                    <button type="button" onClick={() => setSearchQuery("Ground Effect")}>Ground Effect</button>
                    <button type="button" onClick={() => setSearchQuery("Undercut")}>Undercut Strategy</button>
                    <button type="button" onClick={() => setSearchQuery("Active Aero")}>2026 Active Aero</button>
                  </div>
                </div>
              ) : (
                <div className="aa-search-result-groups">
                  {filteredCircuits.length > 0 && (
                    <div className="result-group">
                      <h4>CIRCUITS</h4>
                      {filteredCircuits.map((c) => (
                        <Link key={c.slug} href={`/circuits/${c.slug}`} onClick={() => setSearchOpen(false)}>
                          <strong>{c.name}</strong> <span>{c.country} ({c.distance})</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {filteredStories.length > 0 && (
                    <div className="result-group">
                      <h4>TECHNICAL JOURNAL</h4>
                      {filteredStories.map((s) => (
                        <Link key={s.slug} href={`/stories/${s.slug}`} onClick={() => setSearchOpen(false)}>
                          <strong>{s.title}</strong> <span>{s.tag} · {s.minutes}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {filteredCircuits.length === 0 && filteredStories.length === 0 && (
                    <p className="no-results">No matches found for &quot;{searchQuery}&quot;</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {children}

      {/* Newsletter Signup & Engagement Section */}
      <section className="aa-newsletter-section">
        <div className="aa-newsletter-wrap">
          <div className="aa-newsletter-copy">
            <span className="aa-kicker"><span>WEEKEND INTELLIGENCE</span> THE RACE, DELIVERED</span>
            <h2>Get the 5-minute pre-race briefing</h2>
            <p>Tire degradation charts, local weather forecasts, and key overtaking zones sent to your inbox before lights out.</p>
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
      <div className="aa-footer-ad-wrap">
        <AdSlot format="horizontal" label="SPONSOR SPOTLIGHT" />
      </div>

      <footer className="atlas-footer">
        <div className="atlas-footer-brand">
          <Link className="wordmark" href="/">
            <i />APEX <span>ATLAS</span>
          </Link>
          <p>
            Independent motorsport field notes and racecraft analytics. Designed for fans, engineers, and curious minds who want to understand the race before lights out.
          </p>
          <small className="copyright">
            © 2026 APEX ATLAS · UNOFFICIAL &amp; INDEPENDENT PUBLICATION.
          </small>
        </div>

        <div className="atlas-footer-nav-grid">
          <div className="footer-col">
            <b>ANALYTICS &amp; TOOLS</b>
            <Link href="/circuits">2026 Circuit Atlas</Link>
            <Link href="/drivers">Drivers Championship &amp; H2H</Link>
            <Link href="/strategy">Strategy &amp; Undercut Lab</Link>
            <Link href="/car-lab">Car Aerodynamics Lab</Link>
            <Link href="/quiz">Motorsport IQ Challenge</Link>
          </div>

          <div className="footer-col">
            <b>JOURNAL &amp; GUIDES</b>
            <Link href="/stories/ground-effect-pressure-into-pace">Ground Effect Aerodynamics</Link>
            <Link href="/stories/anatomy-of-an-undercut">Anatomy of the Undercut</Link>
            <Link href="/stories/active-aero-2026-regulations">2026 Active Aero Rules</Link>
            <Link href="/stories/tire-chemistry-thermal-degradation">Tire Chemistry &amp; Degradation</Link>
            <Link href="/stories/telemetry-decoded-trail-braking">Telemetry &amp; Trail Braking</Link>
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
