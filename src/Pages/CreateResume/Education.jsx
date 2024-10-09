import React, { useState } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Education() {
  const [educationFields, setEducationFields] = useState([{ institutionName: "", course: "", startDate: "", endDate: "", collapsed: false }]);

  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate("/personalInfo");
  };

  const handleNextClick = () => {
    navigate("/professionalExperience");
  };

  const handlePlusClick = () => {
    const updatedFields = educationFields.map((field, index) => (index === 0 ? { ...field, collapsed: true } : field));
    setEducationFields([{ institutionName: "", course: "", startDate: "", endDate: "", collapsed: false }, ...updatedFields]);
  };

  const handleDeleteClick = (index) => {
    const updatedFields = educationFields.filter((_, i) => i !== index);
    setEducationFields(updatedFields);
  };

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = educationFields.map((field, i) => (i === index ? { ...field, [fieldName]: value } : field));
    setEducationFields(updatedFields);
  };

  return (
    <div className="resume-form">
      <h1 className="resume-form-title">Education</h1>
      <div className="resume-form-header">
        <FontAwesomeIcon icon={faPlus} className="resume-plus-icon" onClick={handlePlusClick} />
      </div>

      <div className="resume-entry">
        {!educationFields[0].collapsed && (
          <>
            <div className="grid-container-2-col">
              <Input
                label="Institution Name"
                name="institutionName"
                type="text"
                className="resume-form-input-field"
                value={educationFields[0].institutionName}
                onChange={(e) => handleFieldChange(0, "institutionName", e.target.value)}
              />
              <Input
                label="Course"
                name="course"
                type="text"
                className="resume-form-input-field"
                value={educationFields[0].course}
                onChange={(e) => handleFieldChange(0, "course", e.target.value)}
              />
            </div>
            <div className="grid-container-2-col">
              <Input
                label="Start Date"
                name="startDate"
                type="date"
                className="resume-form-input-field"
                value={educationFields[0].startDate}
                onChange={(e) => handleFieldChange(0, "startDate", e.target.value)}
              />
              <Input
                label="End Date"
                name="endDate"
                type="date"
                className="resume-form-input-field"
                value={educationFields[0].endDate}
                onChange={(e) => handleFieldChange(0, "endDate", e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {educationFields.slice(1).map((field, index) => (
        <div key={index + 1} className="resume-entry">
          <div className="resume-form-header">
            <Input
              label="Institution Name"
              name={`institutionName-${index + 1}`}
              type="text"
              className="resume-form-input-field"
              value={field.institutionName}
              onChange={(e) => handleFieldChange(index + 1, "institutionName", e.target.value)}
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

export default ResumeHoc(Education);
