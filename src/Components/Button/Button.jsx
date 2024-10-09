import React from "react";
import "./Button.css";

function Button({ children, className }) {
  return (
    <button className={`btn button ${className}`}>
      <h4>{children}</h4>
    </button>
  );
}

export default Button;
