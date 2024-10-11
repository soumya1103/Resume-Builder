import React, { useState } from "react";
import "../Navbar/Navbar.css";
import NT from "../../Images/NucleusTeq Logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Api/apiService";
import { logoutUser } from "../../Redux/Authentication/AuthenticationAction";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={NT} alt="Logo" />
      </div>
      <h2 className="heading">Welcome User</h2>
      <div className="navbar-button" onMouseLeave={closeDropdown}>
        <button className="btn" onMouseEnter={toggleDropdown}>
          T
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item">Profile</button>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
