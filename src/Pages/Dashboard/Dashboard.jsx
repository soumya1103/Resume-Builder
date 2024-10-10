import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faHistory, faUser, faEye } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import Card from "../../Components/Cards/Card";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleResumeClick = () => {
    navigate("/personalInfo");
  };

  return (
    <div className="dashboard-container-outer">
      <Navbar />
      <div className="dashboard-container">
        <Card icon={<FontAwesomeIcon icon={faFile} />} label="Create Resume" onClick={handleResumeClick} />
        <Card icon={<FontAwesomeIcon icon={faEye} />} label="View Resume" />
        <Card icon={<FontAwesomeIcon icon={faHistory} />} label="History" />
        <Card icon={<FontAwesomeIcon icon={faUser} />} label="Profile" />
      </div>
    </div>
  );
}

export default Dashboard;
