import React, { useEffect, useState } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePersonalInfo } from "../../Redux/ResumeReducer/ResumeAction";
import { view_resume } from "../../Api/apiService";
import "./CreateResume.css";

function PersonalInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const profileId = new URLSearchParams(location.search).get("profileId");
  const user = JSON.parse(localStorage.getItem("auth")) || { name: "", email: "", userId: "" };

  const [firstName, setFirstName] = useState(resume.firstName || user.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(resume.lastName || user.name.split(" ")[1] || "");
  const [email, setEmail] = useState(resume.email || user.email || "");
  
  const [contactNo, setContactNo] = useState(resume.contactNo || "");
  const [objective, setObjective] = useState(resume.objective || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await view_resume(user.userId);
        const selectedProfile = response.data.find((profile) => profile.id === parseInt(profileId));
  
        if (selectedProfile) {
          const [first, last] = (selectedProfile.profileName || "").split(" ");
          
          // Set state only if not already set (to prevent overwriting)
          setFirstName((prev) => prev || first || "");
          setLastName((prev) => prev || last || "");
          setEmail((prev) => prev || selectedProfile.email || user.email || "");
          setContactNo((prev) => prev || selectedProfile.contactNo || "");
          setObjective((prev) => prev || selectedProfile.objective || "");
        } else {
          setError("Profile not found");
        }
      } catch (error) {
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };
  
    if (profileId) fetchProfile();
  }, [profileId]);
  
  const handleNextClick = () => {
    
    const updatedProfile = {
      userId: user.userId,
      profileId,
      profileName: `${firstName} ${lastName}`,
      contactNo,
      objective,
    };
  

    dispatch(savePersonalInfo(updatedProfile));
  
    if (!profileId) {
      navigate('/education');
    } else {
      navigate(`/education/?profileId=${updatedProfile.profileId}`);
    }
  };
  

  return (
    <div className="resume-form">
      <h1 className="resume-form-title">Personal Information</h1>
      <div className="grid-container-2-col">
        <Input label="First Name" value={firstName} name="firstName" onChange={(e) => setFirstName(e.target.value)} disabled/>
        <Input label="Last Name" value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)}disabled />
      </div>
      <div className="grid-container-2-col">
        <Input label="Email" value={email} name="email" disabled />
        <Input label="Phone Number" value={contactNo} name="phoneNumber" onChange={(e) => setContactNo(e.target.value)} />
      </div>
      <div className="grid-container-1-col">
        <Input label="Objective" value={objective} name="objective" type="textarea" onChange={(e) => setObjective(e.target.value)} />
      </div>
      <Button onClick={handleNextClick}>Save</Button>
    </div>
  );
}

export default ResumeHoc(PersonalInfo);
