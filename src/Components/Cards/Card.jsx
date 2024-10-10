import React from 'react';

function Card({ icon, label }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-icons">{icon}</div>
      <h2 className='card-label'>{label}</h2>
    </div>
  );
}

export default Card;