import { AtlasShell } from "../components/AtlasShell";
import { MotorsportQuiz } from "../components/MotorsportQuiz";
import { AdSlot } from "../components/AdSlot";

export default function QuizPage() {
  return (
    <AtlasShell>
      <section className="atlas-hero">
        <p className="section-kicker">
          <span>06</span> RACECRAFT INTELLIGENCE CHALLENGE
        </p>
        <h1>
          Test your<br />
          <em>Motorsport IQ.</em>
        </h1>
        <p>
          Challenge yourself on Grand Prix physics, tire degradation curves, aerodynamic ground effect, and the 2026 regulations.
        </p>
      </section>

      <div className="aa-page-ad-wrap">
        <AdSlot format="horizontal" />
      </div>

      <section className="aa-section-pad">
        <MotorsportQuiz />
      </section>

      <div className="aa-page-ad-wrap">
        <AdSlot format="in-article" />
      </div>
    </AtlasShell>
  );
}
