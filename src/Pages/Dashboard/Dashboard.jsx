import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faHistory, faUser, faEye } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import Card from "../../Components/Cards/Card";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import ResumesList from "../../Components/ResumeList/ResumeList.jsx"; 
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const navigate = useNavigate();

  const handleResumeClick = () => {
    navigate("/personalInfo");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleViewResume = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="dashboard-container-outer">
      <Navbar />
      <div className="dashboard-container">
        <Card icon={<FontAwesomeIcon icon={faFile} />} label="Create Resume" onClick={handleResumeClick} />
        <Card icon={<FontAwesomeIcon icon={faEye} />} label="View Resume" onClick={handleViewResume} />
        <Card icon={<FontAwesomeIcon icon={faHistory} />} label="History" />
        <Card icon={<FontAwesomeIcon icon={faUser} />} label="Profile" onClick={handleProfile} />
      </div>
      <ResumesList isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Dashboard;
