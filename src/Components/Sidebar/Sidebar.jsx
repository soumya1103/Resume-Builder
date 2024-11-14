import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faUserGraduate, faUserTie, faWindowRestore, faList, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { addCandidate, addUser } from "../../Api/apiService";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function Sidebar() {
  const location = useLocation();

  const userData = useSelector((state) => state.resume);

  const role = useSelector((state) => state.auth);

  const selectedRole = localStorage.getItem("selectedRole") || { selectedRole: "" };

  const profileId = JSON.parse(localStorage.getItem("profileId"));

  const handleSubmit = async () => {
    if (selectedRole === "candidate") {
      try {
        const response = await addCandidate(profileId, userData);
        if (response.status === 200 || response.status === 201) {
          toast.success(response?.data?.message, {
            autoClose: 2000,
          });
        }
        setTimeout(() => {
          window.location.href = role.role === "ROLE_HR" ? "dashboardHr" : "/dashboard";
        }, 3000);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.", {
          autoClose: 2000,
        });
      }
    } else {
      try {
        const response = await addUser(profileId, userData);
        if (response.status === 200 || response.status === 201) {
          toast.success(response?.data?.message, {
            autoClose: 2000,
          });
        }
        setTimeout(() => {
          window.location.href = role.role === "ROLE_HR" ? "dashboardHr" : "/dashboard";
        }, 3000);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.", {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-inner-container">
        <div style={{ marginLeft: "3%" }}>
          <button className="sidebar" onClick={() => (window.location.href = role.role === "ROLE_HR" ? "/dashboardHr" : "/dashboard")}>
            <FontAwesomeIcon icon={faArrowLeft} className="sidebar-back-icon" />
          </button>
          <div style={{ marginTop: "11%" }}>
            <button className="sidebar">
              <Link to="/personalInfo" className={`sidebar-link ${location.pathname === "/personalInfo" ? "active" : ""}`}>
                <FontAwesomeIcon icon={faCircleInfo} className="sidebar-icon" />
                <h3 className="sidebar-heading">Personal Information</h3>
              </Link>
            </button>
            <button className="sidebar">
              <Link to="/education" className={`sidebar-link ${location.pathname === "/education" ? "active" : ""}`}>
                <FontAwesomeIcon icon={faUserGraduate} className="sidebar-icon" />
                <h3 className="sidebar-heading">Education</h3>
              </Link>
            </button>
            <button className="sidebar">
              <Link to="/professionalExperience" className={`sidebar-link ${location.pathname === "/professionalExperience" ? "active" : ""}`}>
                <FontAwesomeIcon icon={faWindowRestore} className="sidebar-icon" />
                <h3 className="sidebar-heading">Professional Experience</h3>
              </Link>
            </button>
            <button className="sidebar">
              <Link to="/skills" className={`sidebar-link ${location.pathname === "/skills" ? "active" : ""}`}>
                <FontAwesomeIcon icon={faList} className="sidebar-icon" />
                <h3 className="sidebar-heading">Skills</h3>
              </Link>
            </button>
            <button className="sidebar">
              <Link to="/professionalSummary" className={`sidebar-link ${location.pathname === "/professionalSummary" ? "active" : ""}`}>
                <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" />
                <h3 className="sidebar-heading">Professional Summary</h3>
              </Link>
            </button>
          </div>
        </div>
        <Button className="sidebar-submit-btn" onClick={handleSubmit}>
          <h4>Submit</h4>
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
