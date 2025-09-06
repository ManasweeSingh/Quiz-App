import React from "react";
import { useLocation, Link } from "react-router-dom";

function ResultsPage() {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Quiz Completed 🎉</h1>
      <h2>Your Score: {score} / {total}</h2>
      <Link to="/">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default ResultsPage;
