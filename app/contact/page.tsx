"use client";

import { useState } from "react";
import Link from "next/link";
import { AtlasShell } from "../components/AtlasShell";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Editorial Inquiry");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message) {
      setSubmitted(true);
    }
  };

  return (
    <AtlasShell>
      <main className="legal-page">
        <article className="legal-wrap">
          <p className="section-kicker">
            <span>EDITORIAL</span> CONTACT &amp; CORRECTIONS
          </p>
          <h1>Get in touch.</h1>
          <p>
            We welcome editorial suggestions, technical corrections, sponsorship inquiries, and reader feedback. Apex Atlas is committed to accuracy and transparency.
          </p>

          {submitted ? (
            <div className="aa-contact-success">
              <h3>✓ Message Received</h3>
              <p>Thank you for reaching out to the Apex Atlas editorial desk. We will review your message and respond within 24–48 hours.</p>
              <Link className="back-link" href="/">← RETURN TO APEX ATLAS</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="aa-contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Inquiry Type</label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="General Editorial Inquiry">General Editorial Inquiry</option>
                  <option value="Technical or Telemetry Correction">Technical or Telemetry Correction</option>
                  <option value="Advertising & Sponsorship">Advertising &amp; Sponsorship</option>
                  <option value="Copyright or Licensing">Copyright &amp; OpenStreetMap Licensing</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Provide details about your query or observation..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="aa-button aa-button-light">
                SEND MESSAGE ↗
              </button>
            </form>
          )}

          <h2>Editorial Office &amp; Address</h2>
          <p>
            <strong>Apex Atlas Editorial Desk</strong><br />
            Email: <a href="mailto:editorial@apexatlas.racing">editorial@apexatlas.racing</a><br />
            Corrections: <a href="mailto:corrections@apexatlas.racing">corrections@apexatlas.racing</a>
          </p>

          <Link className="back-link" href="/">← RETURN TO THE ATLAS</Link>
        </article>
      </main>
    </AtlasShell>
  );
}
