# Architecture / Design Notes

- Enhancements are loaded via `quiz-enhancements.js`.
- They integrate with existing app using:
  - `window.questions` → array of questions
  - `showQuestion(index)` → (optional) function to display a question
  - `evaluateQuiz()` → (optional) function to calculate score
