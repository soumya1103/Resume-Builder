import React, { useEffect, useState } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import Input from "../../Components/Input/Input";
import "./CreateResume.css";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePersonalInfo } from "../../Redux/ResumeReducer/ResumeAction";
import { getCandidateProfileById, getUserById } from "../../Api/apiService";
import { ToastContainer, toast } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";

function PersonalInfo() {
  const resume = useSelector((state) => state.resume);

  const [firstName, setFirstName] = useState(resume.firstName || "");
  const [lastName, setLastName] = useState(resume.lastName || "");
  const [email, setEmail] = useState(resume.email || "");
  const [contactNo, setContactNo] = useState(resume.contactNo || "");
  const [objective, setObjective] = useState(resume.objective || "");
  const [userDetails, setUserDetails] = useState();
  const [candidateDetails, setCandidateDetails] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDet = useSelector((state) => state.auth);
  const { userId } = userDet;
  const user = JSON.parse(localStorage.getItem("selectedEmployeeId")) || { userId: "" };
  const role = localStorage.getItem("selectedRole") || { selectedRole: "" };
  const candidateId = localStorage.getItem("profileId") || { profileId: "" };

  const getCandidateDetails = async () => {
    try {
      const response = await getCandidateProfileById(candidateId);
      if (response?.status === 200 || response?.status === 201) {
        setCandidateDetails(response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    }
  };

  const getUserDetails = async () => {
    if (role === "employee") {
      const response = await getUserById(user);
      try {
        if (response?.status === 200 || response?.status === 201) {
          setUserDetails(response.data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.", {
          autoClose: 2000,
        });
      }
    } else {
      const response = await getUserById(userId);
      try {
        if (response?.status === 200 || response?.status === 201) {
          setUserDetails(response.data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.", {
          autoClose: 2000,
        });
      }
    }
  };

  const handleNextClick = () => {
    const obj = {
      ...resume,
      userId: userId,
      profileName: userDet?.name,
      contactNo: contactNo,
      objective: objective,
    };

    dispatch(savePersonalInfo(obj));
    navigate("/education");
  };

  const handleNextClickEmployee = () => {
    const obj = {
      ...resume,
      userId: user,
      profileName: userDetails?.name,
      contactNo: contactNo,
      objective: objective,
    };

    dispatch(savePersonalInfo(obj));
    navigate("/education");
  };

  const handleNextClickCandidate = () => {
    const obj = {
      ...resume,
      id: candidateId,
      email: email,
      name: candidateDetails?.name,
      contactNo: contactNo,
      objective: objective,
    };

    dispatch(savePersonalInfo(obj));
    navigate("/education");
  };

  useEffect(() => {
    if (role !== "candidate") {
      getUserDetails();
    } else {
      getCandidateDetails();
    }
  }, []);

  useEffect(() => {
    if (role !== "candidate") {
      if (userDetails?.email) setEmail(userDetails?.email);
      const name = userDetails?.name?.split(" ") || [];
      if (name?.length > 1) {
        setFirstName(name[0]);
        setLastName(name[1]);
      } else {
        setFirstName(name[0]);
        setLastName("");
      }
    } else {
      const name = candidateDetails?.name?.split(" ") || [];
      if (name?.length > 1) {
        setFirstName(name[0]);
        setLastName(name[1]);
      } else {
        setFirstName(name[0]);
        setLastName("");
      }
    }
  }, [userDetails, candidateDetails]);

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
          disabled="true"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="grid-container-2-col">
        <Input
          label="Email"
          value={email}
          candidate
          name="email"
          disabled={role === "candidate" ? false : true}
          type="email"
          className="resume-form-input-field"
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
      <Button
        className="resume-form-btn-single"
        onClick={role !== "candidate" ? (role === "employee" ? handleNextClickEmployee : handleNextClick) : handleNextClickCandidate}
      >
        Save
      </Button>
      <ToastContainer />
    </div>
  );
}

export default ResumeHoc(PersonalInfo);
