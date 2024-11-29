import React, { useState, useEffect } from "react";
import { getAllCandidates } from "../../Api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./ResumeList.css";
import Navbar from "../Navbar/Navbar";

const CandidateResumeList = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  const getProfiles = async () => {
    try {
      const response = await getAllCandidates();
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
    const userId = profile.id;

    if (!acc[userId]) {
      acc[userId] = profile;
    }
    return acc;
  }, {});

  const handleViewClick = (userId) => {
    navigate(`/viewResumeCandidate/${userId}`);
  };

  const handleEdit = (profile) => {
    navigate(`/personalInfo/?profileId=${profile.id}`);
    window.localStorage.removeItem("profileId");
    window.localStorage.setItem("profileId", profile.id);
    
  };

  return (
    <>
      <Navbar />
      <Link to={"/dashboardHr"} className="icon-button" title="back">
        <FontAwesomeIcon className="employee-resume-list-back-btn" icon={faArrowLeft} />
      </Link>
      <div className="resume-list-table-container">
        <h2 className="resume-list-table-heading">All Candidate Resumes</h2>
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
              <tr key={profile.id}>
                <td>{index + 1}</td>
                <td>{profile.name || "Unknown"}</td>
                <td>{profile.email || "Unknown"}</td>
                <td>
                  <button className="resume-list-delete-button" onClick={() => handleViewClick(profile.id)}>
                    <FontAwesomeIcon className="resume-eye" icon={faEye} />
                  </button>
                  <button className="resume-list-delete-button" onClick={() => handleEdit(profile)}>
                    <FontAwesomeIcon className="resume-eye" icon={faEdit}/>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CandidateResumeList;
