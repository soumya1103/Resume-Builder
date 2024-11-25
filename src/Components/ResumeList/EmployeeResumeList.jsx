import React, { useState, useEffect } from "react";
import { getAllProfiles } from "../../Api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ResumeList.css";
import Navbar from "../Navbar/Navbar";
import ResumesListHr from "./ResumeListHr";

const EmployeeResumeList = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProfiles = async () => {
    try {
      const response = await getAllProfiles();
      if (response?.status === 200 || response?.status === 201) {
        setProfiles(response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  const groupedProfiles = profiles.reduce((acc, profile) => {
    const userId = profile.userId;
    window.localStorage.setItem("employeeId", userId)

    if (!acc[userId]) {
      acc[userId] = profile;
    }
    return acc;
  }, {});

  const handleViewClick = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <Link to={"/dashboardHr"} className="icon-button" title="back">
        <FontAwesomeIcon className="employee-resume-list-back-btn" icon={faArrowLeft} />
      </Link>
      <div className="resume-list-table-container">
        <h2 className="resume-list-table-heading">All Employee Resumes</h2>
        <table className="resume-list-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedProfiles).map((profile, index) => (
              <tr key={profile.userId}>
                <td>{index + 1}</td>
                <td>{profile.profileName || "Unknown"}</td>
                <td>{profile.profileName || "Unknown"}</td>
                <td>
                  <button className="resume-list-delete-button" onClick={() => handleViewClick(profile.userId)}>
                    <FontAwesomeIcon className="resume-eye" icon={faEye} />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ResumesListHr isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={selectedUserId} />
    </>
  );
};

export default EmployeeResumeList;
