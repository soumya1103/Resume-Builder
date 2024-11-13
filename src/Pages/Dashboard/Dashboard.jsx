import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faUpload, faEye, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Components/Modal/Modal.jsx";
import Input from "../../Components/Input/Input.jsx";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button.jsx";
import "./Dashboard.css";
import Card from "../../Components/Cards/Card";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import ResumesList from "../../Components/ResumeList/ResumeList.jsx";
import { useNavigate } from "react-router-dom";
import { saveResumeTitle, uploadResume } from "../../Api/apiService.js";
import { useSelector } from "react-redux";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth);

  const handleResumeClick = () => {
    setTitleModal(true);
  };

  const handleUploadResume = async (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      toast.error("Please select a file to upload.", {
        autoClose: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await uploadResume(formData);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "PDF Resume uploaded successfully!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    }
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
      const response = await saveResumeTitle(resumeTitle, userId.userId);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Resume Title Saved", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/personalInfo");
        }, 3000);
      }
      window.localStorage.setItem("profileId", response.data.id);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="dashboard-container-outer">
      <Navbar />
      <div className="dashboard-container">
        <Card icon={<FontAwesomeIcon icon={faFile} />} label="Create Resume" onClick={handleResumeClick} />
        <Card icon={<FontAwesomeIcon icon={faEye} />} label="View Resume" onClick={handleViewResume} />
        <Card icon={<FontAwesomeIcon icon={faChartColumn} />} label="ATS" />
        <Card icon={<FontAwesomeIcon icon={faUpload} />} label="Profile" onClick={handleProfile} />
      </div>

      <input id="resume" type="file" accept="application/pdf" style={{ display: "none" }} onChange={handleUploadResume} />

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
