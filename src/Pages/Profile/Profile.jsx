import React, { useState } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Input/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { updateProfile } from "../../Api/apiService";

function Profile() {
  const [showModal, setShowModal] = useState(false);

  var profileData = {
    phone: "",
    address: "",
    dob: "",
    gender: "",
    bio: "",
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleChangePassword = () => {
    setShowModal(true);
  };

  const handleNumberChange = (e) => {
    profileData = {
      ...profileData,
      phone: e.target.value,
    };
  };

  const handleAddressChange = (e) => {
    profileData = {
      ...profileData,
      address: e.target.value,
    };
  };

  const handleDobChange = (e) => {
    profileData = {
      ...profileData,
      dob: e.target.value,
    };
  };

  const handleGenderChange = (e) => {
    profileData = {
      ...profileData,
      gender: e.target.value,
    };
  };

  const handleBioChange = (e) => {
    profileData = {
      ...profileData,
      bio: e.target.value,
    };
  };

  const user = JSON.parse(localStorage.getItem("auth"));
  const name = user.name.split(" ");
  const firstName = name[0];
  const lastName = name[1];

  const handleSaveProfile = async () => {
    try {
      console.log(profileData);

      const response = await updateProfile(user.userId, profileData);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Profile updated successfully.", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <button className="sidebar">
          <Link to="/dashboard" className={`sidebar-link`}>
            <FontAwesomeIcon icon={faArrowLeft} className="sidebar-back-icon" />
          </Link>
        </button>
        <div className="grid-container-2-col" style={{ alignItems: "baseline" }}>
          <Input label="First Name" disabled={true} value={firstName} type="text" margin="4%" className="profile-input-field" />
          <Input label="Last Name" disabled={true} value={lastName} type="text" margin="4%" className="profile-input-field" />
        </div>
        <div className="grid-container-2-col">
          <Input label="Email" disabled={true} value={user.email} type="email" margin="1%" className="profile-input-field" />
          <Input label="Contact No" type="number" margin="1%" className="profile-input-field" onChange={handleNumberChange} />
        </div>
        <div className="grid-container-1-col">
          <Input type="textarea" label="Address" className="profile-input-field" margin="1%" onChange={handleAddressChange} />
        </div>

        <div className="grid-container-2-col" style={{ alignItems: "baseline", gridTemplateColumns: "43% 47%" }}>
          <Input label="Date Of Birth" type="date" className="profile-input-field" onChange={handleDobChange} />
          <div className="form-content">
            <label className="form-field-label">Gender</label>
            <select onChange={handleGenderChange} className="form-field-input profile-input-field">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="grid-container-1-col">
          <Input type="textarea" label="Bio" onChange={handleBioChange} className="profile-input-field" margin="1%" />
        </div>
        <div className="profile-form-btn">
          <Button onClick={handleChangePassword}>Change Password</Button>
          <Button onClick={handleSaveProfile}>Save</Button>
        </div>
      </div>
      <Modal show={showModal} onClose={onCloseModal} height="100px" width="300px">
        <Input className="profile-input-field-password" type="text" label="Enter new password" />
        <Button className="change-btn">Change</Button>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Profile;
