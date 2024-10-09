import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Sidebar.css";

function Sidebar(props) {
    const location = useLocation();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    // const handleLogoutIcon = () => {
    //     setShowConfirmationModal(true);
    // };

    // const handleLogout = () => {
    //     logout();
    //     dispatch(logoutUser());
    //     setShowConfirmationModal(false);
    //     navigate("/login");
    // };

    return (
        <div className="sidebar-container">
            <div className="sidebar-inner-container">
                <Link
                    to="/dashboard"
                    className={`sidebar-icon ${
                        location.pathname === "/personalInfo" ? "active" : ""
                    }`}
                >
                    {/* <img src={dashboard} alt="dashboard" width="12%" /> */}
                    <h3>Personal Information</h3>
                </Link>
                <Link
                    to="/education"
                    className={`sidebar-icon ${
                        location.pathname === "/education" ? "active" : ""
                    }`}
                >
                    {/* <img src={categories} alt="categories" width="12%" /> */}
                    <h3>Education</h3>
                </Link>
                <Link
                    to="/professionalExperience"
                    className={`sidebar-icon ${
                        location.pathname === "/professionalExperience"
                            ? "active"
                            : ""
                    }`}
                >
                    {/* <img src={books} alt="books" width="12%" /> */}
                    <h3>Professional Experience</h3>
                </Link>
                <Link
                    to="/skills"
                    className={`sidebar-icon ${
                        location.pathname === "/skills" ? "active" : ""
                    }`}
                >
                    {/* <img src={users} alt="users" width="12%" /> */}
                    <h3>Skills</h3>
                </Link>
                <Link
                    to="/awardCerts"
                    className={`sidebar-icon ${
                        location.pathname === "/awardCerts" ? "active" : ""
                    }`}
                >
                    {/* <img src={issuances} alt="issuances" width="12%" /> */}
                    <h3>Award / Certification</h3>
                </Link>
                <Link
                    to="/professionalSummary"
                    className={`sidebar-icon ${
                        location.pathname === "/professionalSummary"
                            ? "active"
                            : ""
                    }`}
                >
                    {/* <img src={issuances} alt="issuances" width="12%" /> */}
                    <h3>Professional Summary</h3>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
