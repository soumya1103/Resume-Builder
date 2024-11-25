import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faUserGraduate, faUserTie, faWindowRestore, faList, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function Sidebar() {
  const location = useLocation();

  const role = useSelector((state) => state.auth);

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
      </div>
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
  