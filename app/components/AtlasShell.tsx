import type { ReactNode } from "react";

export function AtlasShell({ children }: { children: ReactNode }) {
  return <main className="atlas-page">
    <header className="atlas-header">
      <a className="wordmark" href="/"><i />APEX <span>ATLAS</span></a>
      <nav aria-label="Primary navigation"><a href="/circuits">Circuits</a><a href="/car-lab">Car Lab</a><a href="/strategy">Strategy</a><a href="/stories">Journal</a></nav>
      <a className="atlas-header-cta" href="/circuits">ENTER ATLAS ↗</a>
    </header>
    {children}
    <footer className="atlas-footer"><div><a className="wordmark" href="/"><i />APEX <span>ATLAS</span></a><p>Independent motorsport field notes for people who want to see more in every lap.</p></div><div className="atlas-footer-links"><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><small>© 2026 APEX ATLAS · INDEPENDENT. UNOFFICIAL.</small></footer>
  </main>;
}
