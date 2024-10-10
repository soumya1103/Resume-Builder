import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";

function ProfessionalExperience() {
  const [experienceFields, setExperienceFields] = useState([
    { jobTitle: "", companyName: "", projectName: "", startDate: "", endDate: "", techStack: "", details: "", collapsed: false },
  ]);

  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate("/education");
  };

  const handleNextClick = () => {
    navigate("/skills");
  };

  const handlePlusClick = () => {
    const updatedFields = experienceFields.map((field, index) => (index === 0 ? { ...field, collapsed: true } : field));
    setExperienceFields([
      { jobTitle: "", companyName: "", projectName: "", startDate: "", endDate: "", techStack: "", details: "", collapsed: false },
      ...updatedFields,
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
      <h1 className="resume-form-title">Professional Experience</h1>
      <div className="resume-form-header">
        <FontAwesomeIcon icon={faPlus} className="resume-plus-icon" onClick={handlePlusClick} />
      </div>

      <div className="resume-entry">
        {!experienceFields[0].collapsed && (
          <>
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
                margin="1%"
              />
            </div>
            <div className="grid-container-2-col">
              <Input
                label="Start Date"
                name="startDate"
                type="date"
                className="resume-form-input-field"
                value={experienceFields[0].startDate}
                onChange={(e) => handleFieldChange(0, "startDate", e.target.value)}
              />
              <Input
                label="End Date"
                name="endDate"
                type="date"
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
                margin="1%"
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
          </>
        )}
      </div>

      {experienceFields.slice(1).map((field, index) => (
        <div key={index + 1} className="resume-entry">
          <div className="resume-form-header">
            <Input
              label="Job Title"
              name={`jobTitle-${index + 1}`}
              type="text"
              className="resume-form-input-field"
              value={field.jobTitle}
              onChange={(e) => handleFieldChange(index + 1, "jobTitle", e.target.value)}
            />
            <FontAwesomeIcon icon={faTrash} className="resume-delete-icon" onClick={() => handleDeleteClick(index + 1)} />
          </div>
        </div>
      ))}

      <div className="resume-form-btn">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
}

export default ResumeHoc(ProfessionalExperience);
