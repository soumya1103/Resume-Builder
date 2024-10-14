import React, { useState } from "react";
import "../Navbar/Navbar.css";
import NT from "../../Images/NucleusTeq Logo.png";
import { logout } from "../../Api/apiService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Authentication/AuthenticationAction";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);
  const { name } = user;

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials = nameParts[0][0];
    return initials.toUpperCase();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

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
      <h2 className="heading">Welcome {name}</h2>
      <div className="navbar-button" onMouseLeave={closeDropdown}>
        <button className="btn" onMouseEnter={toggleDropdown}>
          {getInitials(name)}
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
