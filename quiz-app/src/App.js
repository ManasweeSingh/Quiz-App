import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
