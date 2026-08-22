"use client";

import { useState } from "react";
import { quizQuestions, QuizQuestion } from "../site-data";

export function MotorsportQuiz() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion = quizQuestions[currentIdx];
  const selected = selectedAnswers[currentQ.id];
  const isAnswered = selected !== undefined;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  // Score calculation
  const correctCount = quizQuestions.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePercent = Math.round((correctCount / quizQuestions.length) * 100);

  const getRankBadge = (score: number) => {
    if (score >= 85) return { title: "CHIEF RACE STRATEGIST", desc: "Supreme racecraft mastery and engineering acumen." };
    if (score >= 60) return { title: "SENIOR RACE ENGINEER", desc: "Strong tactical intuition and telemetry fluency." };
    if (score >= 40) return { title: "PADDOCK OBSERVER", desc: "Solid grasp of Grand Prix fundamentals." };
    return { title: "TRAINEE ROOKIE", desc: "Keep studying the telemetry and circuit notes!" };
  };

  const rank = getRankBadge(scorePercent);

  return (
    <div className="aa-quiz-widget" aria-label="Motorsport IQ and Racecraft Assessment">
      <div className="aa-quiz-head">
        <div>
          <span className="aa-kicker"><span>06</span> RACECRAFT INTELLIGENCE ASSESSMENT</span>
          <h2>Motorsport IQ Challenge</h2>
          <p>Test your understanding of aerodynamics, tire chemistry, pit strategy, and the 2026 regulations.</p>
        </div>
      </div>

      {!quizFinished ? (
        <div className="aa-quiz-card">
          <div className="aa-quiz-progress-bar">
            <div
              className="aa-quiz-progress-fill"
              style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          <div className="aa-quiz-meta">
            <span className="q-tag">{currentQ.category.toUpperCase()}</span>
            <span className="q-count">
              QUESTION {currentIdx + 1} OF {quizQuestions.length}
            </span>
          </div>

          <h3 className="aa-quiz-question">{currentQ.question}</h3>

          <div className="aa-quiz-options">
            {currentQ.options.map((option, idx) => {
              const isSelected = selected === idx;
              const isCorrect = currentQ.correctIndex === idx;
              let btnClass = "aa-quiz-opt";

              if (isAnswered) {
                if (isCorrect) btnClass += " correct";
                else if (isSelected) btnClass += " incorrect";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={btnClass}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                >
                  <span className="opt-letter">{["A", "B", "C", "D"][idx]}</span>
                  <span className="opt-text">{option}</span>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`aa-quiz-expl ${selected === currentQ.correctIndex ? "correct" : "incorrect"}`}>
              <b>{selected === currentQ.correctIndex ? "✓ ACCURATE READ" : "✗ STRATEGIC ERROR"}</b>
              <p>{currentQ.explanation}</p>
              <button type="button" className="aa-next-btn" onClick={handleNext}>
                {currentIdx === quizQuestions.length - 1 ? "FINISH ASSESSMENT ↗" : "NEXT QUESTION →"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="aa-quiz-result-card">
          <span className="aa-result-eyebrow">ASSESSMENT COMPLETE</span>
          <div className="aa-rank-badge">
            <span className="rank-label">CERTIFIED RACECRAFT RANK</span>
            <h3>{rank.title}</h3>
            <p>{rank.desc}</p>
          </div>

          <div className="aa-result-score-strip">
            <div className="score-metric">
              <span>SCORE</span>
              <strong>{scorePercent}%</strong>
            </div>
            <div className="score-metric">
              <span>CORRECT ANSWERS</span>
              <strong>{correctCount} / {quizQuestions.length}</strong>
            </div>
          </div>

          <div className="aa-result-actions">
            <button type="button" className="aa-button aa-button-light" onClick={handleRestart}>
              RETAKE CHALLENGE ↺
            </button>
            <a href="/strategy" className="aa-button aa-button-ghost">
              EXPLORE STRATEGY LAB ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
