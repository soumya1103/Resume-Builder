import React from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import Input from "../../Components/Input/Input";
import "./CreateResume.css";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

function PersonalInfo() {
  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate("/education");
  };

  return (
    <div className="resume-form">
      <h1 className="resume-form-title">Personal Information</h1>
      <div className="grid-container-2-col">
        <Input label="First Name" name="firstName" type="text" className="resume-form-input-field" />
        <Input label="Last Name" name="lastName" type="text" className="resume-form-input-field" />
      </div>
      <div className="grid-container-2-col">
        <Input label="Email" name="email" type="email" className="resume-form-input-field" />
        <Input label="Phone Number" name="phoneNumber" type="tel" className="resume-form-input-field" />
      </div>
      <div className="grid-container-1-col">
        <Input label="Objective" name="objective" type="textarea" className="resume-form-input-field" />
      </div>
      <Button className="resume-form-btn-single" onClick={handleNextClick}>
        Next
      </Button>
    </div>
  );
}

export default ResumeHoc(PersonalInfo);
