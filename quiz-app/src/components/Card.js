import React from "react";

function Card({ children }) {
  return (
    <div style={{
      margin: "20px auto",
      padding: "20px",
      maxWidth: "600px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      {children}
    </div>
  );
}

export default Card;
