import React, { useEffect, useState } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePersonalInfo } from "../../Redux/ResumeReducer/ResumeAction";
import { getCandidateProfileById, getUserById } from "../../Api/apiService";
import { ToastContainer, toast } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";
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
  const [userDetails, setUserDetails] = useState();
  const [candidateDetails, setCandidateDetails] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userDet = useSelector((state) => state.auth);
  const { userId } = userDet;

  const role = localStorage.getItem("selectedRole") || { selectedRole: "" };
  const candidateId = localStorage.getItem("profileId") || { profileId: "" };
  const employeeId = localStorage.getItem("employeeId") || {employeeId: ""};
  let [id, setId] = useState("");

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
      const response = await getUserById(user.userId);
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

  // avanti
  const handleNextClick = () => {
    const updatedProfile = {
      ...resume,
      userId: userId,
      profileId,
      profileName: userDet?.name,
      contactNo: contactNo,
      objective: objective,
    };

    dispatch(savePersonalInfo(updatedProfile));

    if (!profileId) {
      navigate("/education");
    } else {
      navigate(`/education/?profileId=${updatedProfile.profileId}`);
    }
  };
  const handleNextClickEmployee = () => {
    const obj = {
      ...resume,
      userId: user,
      profileId,
      profileName: userDetails?.name,
      contactNo: contactNo,
      objective: objective,
    };

    dispatch(savePersonalInfo(obj));
    if (!profileId) {
      navigate("/education");
    } else {
      navigate(`/education/?profileId=${obj.profileId}`);
    }
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

// avanti
  useEffect(() => {
    const fetchProfile = async () => {
      if(role === "employee"){
        id = employeeId;
      }else if(role=== "candidate"){
        id= candidateId;
      }else{
        id = user.userId;
      }
      setLoading(true);
      try {
        const response = await view_resume(id);
        console.log(response.data);
        const selectedProfile = response.data.find((profile) => profile.id === parseInt(profileId));

        if (selectedProfile) {
          const [first, last] = (selectedProfile.profileName || "").split(" ");

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
        <Input label="Objective" value={objective} name="objective" type="textarea" onChange={(e) => setObjective(e.target.value)}          className="resume-form-input-field"
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
