import React, { useRef, useState } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Input/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";

function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedGender, setSelectedGender] = useState(""); // State to store selected gender
  const fileInputRef = useRef(null);

  // Function to handle changes in the dropdown
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
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
        <div className="profile-inner-container">
          <div className="profile-picture-container">
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} ref={fileInputRef} />
            <button className="picture-btn" onClick={handleButtonClick}>
              <FontAwesomeIcon icon={faImage} />
            </button>
            {profileImage && (
              <div>
                <img src={profileImage} alt="Profile Preview" style={{ width: "133px", height: "131px", borderRadius: "50%" }} />
              </div>
            )}
          </div>
          <div>
            <div className="grid-container-2-col" style={{ alignItems: "baseline" }}>
              <Input label="First Name" type="text" margin="4%" className="profile-input-field" />
              <Input label="Last Name" type="text" margin="4%" className="profile-input-field" />
            </div>
            <div className="grid-container-2-col">
              <Input label="Email" type="email" margin="4%" className="profile-input-field" />
              <Input label="Contact No" type="number" margin="4%" className="profile-input-field" />
            </div>
          </div>
        </div>
        <div className="grid-container-1-col">
          <Input type="textarea" label="Address" className="profile-input-field" margin="2%" />
        </div>

        <div className="grid-container-2-col" style={{ alignItems: "baseline", gridTemplateColumns: "43% 47%" }}>
          <Input label="Date Of Birth" type="date" className="profile-input-field" />
          <div className="form-content">
            <label className="form-field-label">Gender</label>
            <select value={selectedGender} onChange={handleGenderChange} className="form-field-input profile-input-field">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="grid-container-1-col">
          <Input type="textarea" label="Bio" className="profile-input-field" margin="1%" />
        </div>
        <div className="profile-form-btn">
          <Button>Change Password</Button>
          <Button>Save</Button>
        </div>
      </div>
    </>
  );
}

export default Profile;
