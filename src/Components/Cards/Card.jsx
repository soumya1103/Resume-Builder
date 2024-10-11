import React from 'react';

function Card({ icon, label }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-icons">{icon}</div>
      <div className='card-label'>{label}</div>
    </div>
  );
}

export default Card;