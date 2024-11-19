import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { saveProfessionalExperience } from "../../Redux/ResumeReducer/ResumeAction";
import { view_resume } from "../../Api/apiService";

function ProfessionalExperience() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profileId = new URLSearchParams(location.search).get("profileId");
  const user = JSON.parse(localStorage.getItem("auth")) || { userId: "" };
  const savedProfessionalExperience = useSelector(
    (state) => state.resume.profileData.professionalExperience || []
  );

  const [experienceFields, setExperienceFields] = useState([
    { jobTitle: "", companyName: "", projectName: "", startDate: "", endDate: "", techStack: "", details: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfessionalExperience = async () => {
      setLoading(true);
      try {
        const response = await view_resume(user.userId);
        console.log("API Response:", response); 

        const profiles = response.data;
        const selectedProfile = profiles.find((profile) => profile.id === parseInt(profileId));

        if (selectedProfile && selectedProfile.profileData && selectedProfile.profileData.professionalExperience) {
          const professionalExperienceData = selectedProfile.profileData.professionalExperience;

         
          const formattedFields = professionalExperienceData.map((exp) => ({
            jobTitle: exp.jobTitle || "",
            companyName: exp.companyName || "",
            projectName: exp.projectName || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            techStack: exp.techStack || "",
            details: exp.details || "",
          }));

          setExperienceFields(formattedFields.length > 0 ? formattedFields : experienceFields);
        } else {
          setError("Profile or professional experience data not found");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (profileId) fetchProfessionalExperience();
  }, [profileId, user.userId]);

  const handlePrevClick = () => {
    if (!profileId) {
      navigate("/education");
    } else {
      navigate(`/education?profileId=${profileId}`);
    }
  };

  const handleNextClick = () => {
    const currentFormData = { ...experienceFields[0] };

    const isCurrentFormDataEmpty = Object.values(currentFormData).every((val) => val === "");

    const tableData = experienceFields.slice(1);

    const allExperienceData = isCurrentFormDataEmpty ? tableData : [currentFormData, ...tableData];

    if (allExperienceData.length > 0) {
      dispatch(saveProfessionalExperience(allExperienceData));
    }

    navigate(`/skills?profileId=${profileId}`);
  };

  const handlePlusClick = () => {
    setExperienceFields([
      { jobTitle: "", companyName: "", projectName: "", startDate: "", endDate: "", techStack: "", details: "" },
      ...experienceFields,
    ]);
  };

  const handleDeleteClick = (index) => {
    const updatedFields = experienceFields.filter((_, i) => i !== index);
    setExperienceFields(updatedFields);
  };

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = experienceFields.map((field, i) => (i === index ? { ...field, [fieldName]: value } : field));
    setExperienceFields(updatedFields);
  };

  return (
    <div className="resume-form">
      <div>
        <h1 className="resume-form-title">Professional Experience</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div className="resume-professional-experience">
          <div className="resume-form-header">
            <FontAwesomeIcon icon={faPlus} className="resume-plus-icon" onClick={handlePlusClick} />
          </div>

          <div className="resume-entry">
            <div className="grid-container-2-col">
              <Input
                label="Job Title"
                name="jobTitle"
                type="text"
                className="resume-form-input-field"
                value={experienceFields[0].jobTitle}
                onChange={(e) => handleFieldChange(0, "jobTitle", e.target.value)}
              />
              <Input
                label="Company Name"
                name="companyName"
                type="text"
                className="resume-form-input-field"
                value={experienceFields[0].companyName}
                onChange={(e) => handleFieldChange(0, "companyName", e.target.value)}
              />
            </div>
            <div className="grid-container-1-col">
              <Input
                label="Project Name"
                name="projectName"
                type="text"
                className="resume-form-input-field"
                value={experienceFields[0].projectName}
                onChange={(e) => handleFieldChange(0, "projectName", e.target.value)}
                margin="0.5%"
              />
            </div>
            <div className="grid-container-2-col">
              <Input
                label="Start Date"
                name="startDate"
                type="month"
                className="resume-form-input-field"
                value={experienceFields[0].startDate}
                onChange={(e) => handleFieldChange(0, "startDate", e.target.value)}
              />
              <Input
                label="End Date"
                name="endDate"
                type="month"
                className="resume-form-input-field"
                value={experienceFields[0].endDate}
                onChange={(e) => handleFieldChange(0, "endDate", e.target.value)}
              />
            </div>
            <div className="grid-container-1-col">
              <Input
                label="Tech Stack"
                name="techStack"
                type="text"
                className="resume-form-input-field"
                value={experienceFields[0].techStack}
                onChange={(e) => handleFieldChange(0, "techStack", e.target.value)}
                margin="0.5%"
              />
            </div>
            <div className="grid-container-1-col">
              <Input
                label="Details"
                name="details"
                type="textarea"
                className="resume-form-input-field"
                value={experienceFields[0].details}
                onChange={(e) => handleFieldChange(0, "details", e.target.value)}
                margin="1%"
              />
            </div>
          </div>

          {experienceFields.length > 1 && (
            <div className="education-table-container professional-experience-container">
              <table className="education-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company Name</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Tech Stack</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {experienceFields.slice(1).map((field, index) => (
                    <tr key={index + 1}>
                      <td>{field.jobTitle}</td>
                      <td>{field.companyName}</td>
                      <td>{field.projectName}</td>
                      <td>{field.startDate}</td>
                      <td>{field.endDate}</td>
                      <td>{field.techStack}</td>
                      <td>
                        <FontAwesomeIcon icon={faTrash} className="resume-delete-icon" onClick={() => handleDeleteClick(index + 1)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="resume-form-btn">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={handleNextClick}>Save</Button>
      </div>
    </div>
  );
}

export default ResumeHoc(ProfessionalExperience);
