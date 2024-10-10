import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faHistory, faUser, faEye } from '@fortawesome/free-solid-svg-icons'; 
import '../Dashboard/Dashboard.css'
import Card from '../../Components/Cards/Card.jsx';
import Navbar from '../../Components/Navbar/Navbar.jsx';

function Dashboard() {
  return (<div className='dashboard-container-outer'>
  <Navbar/>
  <div className="dashboard-container"> 
      <Card icon={<FontAwesomeIcon icon={faFile} />} label="Create Resume" />
      <Card icon={<FontAwesomeIcon icon={faEye} />}     label="View Resume" />
      <Card icon={<FontAwesomeIcon icon={faHistory} />} label="History" />
      <Card icon={<FontAwesomeIcon icon={faUser} />} label="Profile" />
    </div>
  </div>
    
  );
}

export default Dashboard;