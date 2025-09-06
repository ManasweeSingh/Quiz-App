import React from "react";

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div style={{ margin: "20px auto", width: "80%", background: "#ddd", borderRadius: "8px" }}>
      <div
        style={{
          width: `${percentage}%`,
          height: "12px",
          background: "#4caf50",
          borderRadius: "8px"
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
