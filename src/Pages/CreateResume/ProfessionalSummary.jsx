import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation} from 'react-router-dom'
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { addCandidate, addUser } from "../../Api/apiService";
import { saveProfessionalSummary, saveCertificates } from "../../Redux/ResumeReducer/ResumeAction";
import { view_resume } from "../../Api/apiService";

function ProfessionalSummary() {
  const location = useLocation();

  const userData = useSelector((state) => state.resume);
 

  const selectedRole = localStorage.getItem("selectedRole") || { selectedRole: "" };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("auth")) || { name: "", email: "", userId: "" };
  const profileId = localStorage.getItem("profileId") || new URLSearchParams(window.location.search).get("profileId");
  const profileName = user.name;
  const employeeId = localStorage.getItem("employeeId") || {employeeId: ""};
  const role = localStorage.getItem("selectedRole") || { selectedRole: "" };
  let [id, setId] = useState("");

  const { professionalSummary, certificates } = useSelector((state) => state.resume.profileData);

  const [summary, setSummary] = useState(professionalSummary || "");
  const [certification, setCertification] = useState(
    certificates?.length > 0 ? certificates.map((cert) => ({ certification: cert, collapsed: false })) : [{ certification: "", collapsed: false }]
  );

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if(role === "employee"){
      id = employeeId;
    }else{
      id = user.userId;
    }
    const fetchProfileData = async () => {
      try {
        const response = await view_resume(id);
        console.log("API Response:", response.data);
        const selectedProfile = response.data.find((profile) => profile.id === parseInt(profileId));
        if (selectedProfile) {
          const { professionalSummary, certificates } = selectedProfile.profileData || {};
    
          setSummary(professionalSummary || "");
          setCertification(
            certificates?.length > 0
              ? certificates.map((cert) => ({ certification: cert, collapsed: false }))
              : [{ certification: "", collapsed: false }]
          );
        } else {
          console.error("Profile with the specified ID not found");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    if (profileId) {
      fetchProfileData();
    }
  }, [profileId, user.userId]);
  


  useEffect(() => {
    setSummary(professionalSummary || "");
    setCertification(
      certificates?.length > 0 ? certificates.map((cert) => ({ certification: cert, collapsed: false })) : [{ certification: "", collapsed: false }]
    );
  }, [professionalSummary, certificates]);

  const handlePrevClick = () => {
    if (!profileId) {
      navigate("/skills");
    } else {
      navigate(`/skills?profileId=${profileId}`);
    }
  };
  const handleSaveClick = async () => {
    const filteredCertifications = certification
      .filter((certField) => certField.certification.trim() !== "")
      .map((certField) => certField.certification);

    dispatch(saveProfessionalSummary(summary));
    dispatch(saveCertificates(filteredCertifications));
    setIsSaved(true);
  };

  const handlePlusClick = () => {
    const updatedFields = certification.map((field) => ({ ...field, collapsed: true }));
    setCertification([{ certification: "", collapsed: false }, ...updatedFields]);
  };

  const handleDeleteClick = (index) => {
    const updatedFields = certification.filter((_, i) => i !== index);
    setCertification(updatedFields.length > 0 ? updatedFields : [{ certification: "", collapsed: false }]);
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = certification.map((field, i) => (i === index ? { ...field, certification: value } : field));
    setCertification(updatedFields);
  };

  const handleSubmit = async () => {
    const updatedUserData = {
        ...userData,
        userId: userData.userId?.userId, 
        profileId,
        profileName,
    };

    if (selectedRole === "candidate") {
        try {
            const response = await addCandidate(profileId, updatedUserData);
            if (response.status === 200 || response.status === 201) {
                toast.success(response?.data?.message, {
                    autoClose: 2000,
                });
            }
            setTimeout(() => {
                window.location.href = role.role === "ROLE_HR" ? "dashboardHr" : "/dashboard";
            }, 3000);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong.", {
                autoClose: 2000,
            });
        }
    } else { 
        try {
            const response = await addUser(profileId, updatedUserData); 
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                toast.success(response?.data?.message, {
                    autoClose: 2000,
                });
            }
            setTimeout(() => {
                window.location.href = role.role === "ROLE_HR" ? "dashboardHr" : "/dashboard";
            }, 3000);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong.", {
                autoClose: 2000,
            });
        }
    }
};


  return (
    <div className="resume-form">
      <div className="resume-professional-experience">
        <h1 className="resume-form-title">Professional Summary</h1>
        <div className="grid-container-1-col">
          <Input
            label="Summary"
            name="summary"
            type="textarea"
            className="resume-form-input-field"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            margin="1%"
          />
        </div>

        <h1 className="resume-form-title">Awards / Certifications</h1>
        <div className="resume-form-header">
          <FontAwesomeIcon icon={faPlus} className="resume-plus-icon" onClick={handlePlusClick} />
        </div>

        <div className="resume-entry">
          {!certification[0].collapsed && (
            <div className="grid-container-1-col">
              <Input
                label="Certification"
                name="certification"
                type="text"
                className="resume-form-input-field"
                value={certification[0].certification}
                onChange={(e) => handleFieldChange(0, e.target.value)}
                margin="1%"
              />
            </div>
          )}
        </div>

        {certification.slice(1).map((field, index) => (
          <div key={index + 1} className="resume-entry">
            <div className="resume-form-header">
              <Input
                margin="2%"
                label="Certification"
                name={`certification-${index + 1}`}
                type="text"
                className="resume-form-input-field"
                value={field.certification}
                onChange={(e) => handleFieldChange(index + 1, e.target.value)}
              />
              <FontAwesomeIcon icon={faTrash} className="resume-delete-icon" onClick={() => handleDeleteClick(index + 1)} />
            </div>
          </div>
        ))}
      </div>
      <div className="professional-summary-container">
        <div className="resume-form-btn">
          <Button onClick={handlePrevClick}>Previous</Button>
          {!isSaved ? (
            <Button onClick={handleSaveClick}>Save</Button>
          ) : (
            <Button onClick={handleSubmit}>
              <h4>Submit</h4>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeHoc(ProfessionalSummary);
