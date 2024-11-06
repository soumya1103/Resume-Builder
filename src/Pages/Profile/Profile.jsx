import React, { useEffect, useState } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Input/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUserProfile, updateProfile } from "../../Api/apiService";

function Profile() {
  const user = JSON.parse(localStorage.getItem("auth"));
  const [password, setPassword] = useState("");
  const [profileDetailsData, setProfileDetailsData] = useState({});
  const [profileData, setProfileData] = useState({
    phone: "",
    address: "",
    dob: "",
    gender: "",
    bio: "",
  });

  const handlePassword = () => {
    // setShowEmailModal(true);
  };

  const handleChangePassword = async () => {
    const encodedPassword = btoa(password);
  };

  const handleInputChange = (field) => (e) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value,
    });
  };

  const name = user.name.split(" ");
  const firstName = name[0];
  const lastName = name[1];

  const handleSaveProfile = async () => {
    try {
      console.log(profileData);
      const response = await updateProfile(user.userId, profileData);
      if (response?.status === 200 || response?.status === 201) {
        setProfileDetailsData(profileData);
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

  const getProfileDetails = async (profileId) => {
    try {
      const response = await getUserProfile(profileId);
      setProfileDetailsData(response.data);
      setProfileData(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getProfileDetails(user.userId);
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <button className="sidebar">
          <Link to="/dashboard" className="sidebar-link">
            <FontAwesomeIcon icon={faArrowLeft} className="sidebar-back-icon" />
          </Link>
        </button>
        <div className="grid-container-2-col" style={{ alignItems: "baseline" }}>
          <Input label="First Name" disabled={true} value={firstName} type="text" margin="4%" className="profile-input-field" />
          <Input label="Last Name" disabled={true} value={lastName} type="text" margin="4%" className="profile-input-field" />
        </div>
        <div className="grid-container-2-col">
          <Input label="Email" disabled={true} value={user.email} type="email" margin="1%" className="profile-input-field" />
          <Input
            label="Contact No"
            value={profileData.phone}
            type="number"
            margin="1%"
            className="profile-input-field"
            onChange={handleInputChange("phone")}
          />
        </div>
        <div className="grid-container-1-col">
          <Input
            type="textarea"
            label="Address"
            value={profileData.address}
            className="profile-input-field"
            margin="1%"
            onChange={handleInputChange("address")}
          />
        </div>
        <div className="grid-container-2-col" style={{ alignItems: "baseline", gridTemplateColumns: "43% 47%" }}>
          <Input label="Date Of Birth" value={profileData.dob} type="date" className="profile-input-field" onChange={handleInputChange("dob")} />
          <div className="form-content">
            <label className="form-field-label">Gender</label>
            <select onChange={handleInputChange("gender")} value={profileData.gender} className="form-field-input profile-input-field">
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
        <div className="grid-container-1-col">
          <Input
            type="textarea"
            label="Bio"
            value={profileData.bio}
            onChange={handleInputChange("bio")}
            className="profile-input-field"
            margin="1%"
          />
        </div>
        <div className="profile-form-btn">
          <Button onClick={handlePassword}>Change Password</Button>
          <Button onClick={handleSaveProfile}>Save</Button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Profile;
