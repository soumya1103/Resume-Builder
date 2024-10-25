import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faUser, faEye, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Components/Modal/Modal.jsx";
import Input from "../../Components/Input/Input.jsx";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button.jsx";
import "./Dashboard.css";
import Card from "../../Components/Cards/Card";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import ResumesList from "../../Components/ResumeList/ResumeList.jsx";
import { useNavigate } from "react-router-dom";
import { saveResumeTitle } from "../../Api/apiService.js";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const navigate = useNavigate();

  const handleResumeClick = () => {
    setTitleModal(true);
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

  const onCloseTitleModal = () => {
    setTitleModal(false);
  };

  const handleTitleSave = async () => {
    try {
      const response = await saveResumeTitle(resumeTitle);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Resume Title Saved", {
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/personalInfo");
        }, 3000);
      }
      window.localStorage.setItem("profileId", response.data.id);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="dashboard-container-outer">
      <Navbar />
      <div className="dashboard-container">
        <Card icon={<FontAwesomeIcon icon={faFile} />} label="Create Resume" onClick={handleResumeClick} />
        <Card icon={<FontAwesomeIcon icon={faEye} />} label="View Resume" onClick={handleViewResume} />
        <Card icon={<FontAwesomeIcon icon={faChartColumn} />} label="ATS" />
        <Card icon={<FontAwesomeIcon icon={faUser} />} label="Profile" onClick={handleProfile} />
      </div>
      <ResumesList isOpen={isModalOpen} onClose={closeModal} />
      <Modal show={titleModal} onClose={onCloseTitleModal} height="100px" width="310px">
        <Input
          className="profile-input-field-password"
          type="text"
          label="Enter Resume Title"
          value={resumeTitle}
          onChange={(e) => setResumeTitle(e.target.value)}
        />
        <Button className="change-btn" onClick={handleTitleSave}>
          Save
        </Button>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;

