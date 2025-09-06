import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import QuizControls from "../components/QuizControls"; // ⬅️ Added
import questions from "../data/questions.json";

// Shuffle helper
function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function QuizPage() {
  const [quizQuestions] = useState(() => shuffleArray(questions));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  // ✅ Check answer & move next
  const handleNext = () => {
    if (selected === quizQuestions[current].answer) {
      setScore((s) => s + 1);
    }
    setSelected("");
    if (current + 1 < quizQuestions.length) {
      setCurrent((c) => c + 1);
    } else {
      navigate("/results", { state: { score, total: quizQuestions.length } });
    }
  };

  // ✅ Prev (no scoring, just navigation)
  const handlePrev = () => {
    setSelected("");
    setCurrent((c) => Math.max(0, c - 1));
  };

  // ✅ Skip (no scoring)
  const handleSkip = () => {
    setSelected("");
    setCurrent((c) => Math.min(quizQuestions.length - 1, c + 1));
  };

  // ✅ Submit (finish early)
  const handleSubmit = () => {
    navigate("/results", { state: { score, total: quizQuestions.length } });
  };

  const handleTimeUp = () => {
    handleNext(); // auto move on time up
  };

  return (
    <Card>
      <ProgressBar current={current + 1} total={quizQuestions.length} />
      <Timer duration={30} onTimeUp={handleTimeUp} />

      <h2>{quizQuestions[current].question}</h2>
      <div>
        {quizQuestions[current].options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selected === option}
                onChange={(e) => setSelected(e.target.value)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>

      {/* ✅ Controls (Prev / Next / Skip / Submit) */}
      <QuizControls
        total={quizQuestions.length}
        current={current}
        onPrev={handlePrev}
        onNext={handleNext}
        onSkip={handleSkip}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}

export default QuizPage;
