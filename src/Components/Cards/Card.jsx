import React from "react";

function Card({ icon, label, onClick }) {
  return (
    <div className="dashboard-card" onClick={onClick}>
      <div className="dashboard-icons">{icon}</div>
      <div className="card-label">{label}</div>
    </div>
  );
}

export default Card;