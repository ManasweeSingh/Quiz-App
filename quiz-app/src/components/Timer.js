import React, { useEffect, useState } from "react";

function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div style={{ margin: "10px", fontWeight: "bold" }}>
      ⏱️ Time left: {timeLeft}s
    </div>
  );
}

export default Timer;
