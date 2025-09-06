import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
