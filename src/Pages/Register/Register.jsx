import React, { useState } from "react";
import "../Register/Register.css";
import Button from "../../Components/Button/Button";
import Navbar from "../../Components/Navbar/Navbar";
import Input from "../../Components/Input/Input";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../Api/apiService";
import { toast, ToastContainer } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleRegister = async () => {
    try {
      const encodedPassword = btoa(password);
      const response = await registerUser(name, email, encodedPassword, selectedRole);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "User registration successful.", {
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.href = "/dashboardHr";
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <button className="sidebar">
          <Link to="/dashboardHr" className="sidebar-link">
            <FontAwesomeIcon icon={faArrowLeft} className="sidebar-back-icon" />
          </Link>
        </button>
        <div className="grid-container-1-col" style={{ marginTop: "3%" }}>
          <Input type="text" label="Name" value={name} className="profile-input-field" margin="1%" onChange={(e) => setName(e.target.value)} />
        </div>
        <br />
        <div className="grid-container-1-col">
          <Input type="email" label="Email" value={email} className="profile-input-field" margin="1%" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br />

        <div className="grid-container-1-col">
          <Input
            type="password"
            label="Password"
            value={password}
            className="profile-input-field"
            margin="1%"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />

        <label htmlFor="role" className="form-field-label">
          Role
        </label>
        <br />
        <select
          id="role"
          value={selectedRole}
          onChange={handleChange}
          style={{ width: "100%", paddingLeft: "1%" }}
          className="form-field-input profile-input-field-password"
        >
          <option value="">Select a Role</option>
          <option value="ROLE_HR">HR</option>
          <option value="ROLE_EMPLOYEE">Employee</option>
        </select>
        <Button className="register-btn" onClick={handleRegister}>
          Register User
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
