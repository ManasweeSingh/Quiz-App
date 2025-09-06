import React, { useState, useEffect } from "react";
import "./QuizControls.css";

export default function QuizControls({ total, current, onPrev, onNext, onSkip, onSubmit }) {
  const [timeLeft, setTimeLeft] = useState(60);

  // Timer countdown per question
  useEffect(() => {
    setTimeLeft(60); // reset when question changes
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          // auto move to next OR submit if last question
          if (current < total - 1) {
            onNext();
          } else {
            onSubmit();
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [current, total, onNext, onSubmit]); // ✅ fixed dependencies

  return (
    <div className="quiz-controls">
      {/* Status bar */}
      <div className="quiz-status">
        <span>
          Question {current + 1} of {total}
        </span>
        <progress value={current + 1} max={total}></progress>
        <span className="timer">
          ⏳ {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>

      {/* Buttons */}
      <div className="quiz-buttons">
        <button
          className="btn prev"
          onClick={onPrev}
          disabled={current === 0}
        >
          Previous
        </button>

        {current < total - 1 && (
          <>
            <button className="btn skip" onClick={onSkip}>
              Skip
            </button>
            <button className="btn next" onClick={onNext}>
              Next
            </button>
          </>
        )}

        {current === total - 1 && (
          <button className="btn submit" onClick={onSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
