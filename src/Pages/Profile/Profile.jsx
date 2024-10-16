import React, { useRef, useState } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Components/Input/Input";

function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

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
    <div className="profile-container">
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
          <Input label="First Name" margin="4%" className="profile-input-field" />
          <Input label="Last Name" margin="4%" className="profile-input-field" />
        </div>
        <div className="grid-container-1-col">
          <Input label="Email" margin="1.5%" className="profile-input-field" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
