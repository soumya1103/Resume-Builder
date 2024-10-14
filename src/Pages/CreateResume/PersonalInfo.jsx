import React, { useEffect, useState } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import Input from "../../Components/Input/Input";
import "./CreateResume.css";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePersonalInfo } from "../../Redux/ResumeReducer/ResumeAction";

function PersonalInfo() {
  const resume = useSelector((state) => state.resume);

  const [firstName, setFirstName] = useState(resume.firstName || "");
  const [lastName, setLastName] = useState(resume.lastName || "");
  const [email, setEmail] = useState(resume.email || "");
  const [contactNo, setContactNo] = useState(resume.contactNo || "");
  const [objective, setObjective] = useState(resume.objective || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("auth")) || { name: "", email: "", userId: "" };

  const handleNextClick = () => {
    const obj = {
      ...resume,
      userId: user.userId,
      profileName: user.name,
      contactNo: contactNo,
      objective: objective,
    };

    dispatch(savePersonalInfo(obj));
    navigate("/education");
  };

  useEffect(() => {
    if (user.email) setEmail(user.email);
    const name = user.name.split(" ");
    if (name.length > 1) {
      setFirstName(name[0]);
      setLastName(name[1]);
    } else {
      setFirstName(name[0]);
      setLastName(""); // If there is no last name
    }
  }, [user]);

  return (
    <div className="resume-form">
      <h1 className="resume-form-title">Personal Information</h1>
      <div className="grid-container-2-col">
        <Input
          label="First Name"
          value={firstName}
          name="firstName"
          type="text"
          className="resume-form-input-field"
          onChange={(e) => setFirstName(e.target.value)}
          disabled="true"
        />
        <Input
          label="Last Name"
          value={lastName}
          name="lastName"
          type="text"
          className="resume-form-input-field"
          onChange={(e) => setLastName(e.target.value)}
          disabled="true"
        />
      </div>
      <div className="grid-container-2-col">
        <Input
          label="Email"
          value={email}
          name="email"
          type="email"
          className="resume-form-input-field"
          disabled="true"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Phone Number"
          value={contactNo}
          name="phoneNumber"
          type="tel"
          className="resume-form-input-field"
          onChange={(e) => setContactNo(e.target.value)}
        />
      </div>
      <div className="grid-container-1-col">
        <Input
          label="Objective"
          value={objective}
          name="objective"
          type="textarea"
          className="resume-form-input-field"
          margin="1%"
          onChange={(e) => setObjective(e.target.value)}
        />
      </div>
      <Button className="resume-form-btn-single" onClick={handleNextClick}>
        Next
      </Button>
    </div>
  );
}

export default ResumeHoc(PersonalInfo);
