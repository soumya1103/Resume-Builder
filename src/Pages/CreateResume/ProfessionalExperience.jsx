import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { saveProfessionalExperience } from "../../Redux/ResumeReducer/ResumeAction";

function ProfessionalExperience() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const professionalExperience = useSelector((state) => state.resume.profileData.professionalExperience || []);

  const [experienceFields, setExperienceFields] = useState([
    { jobTitle: "", companyName: "", projectName: "", startDate: "", endDate: "", techStack: "", details: "" },
  ]);

  useEffect(() => {
    if (professionalExperience.length > 0) {
      setExperienceFields(professionalExperience);
    }
  }, [professionalExperience]);

  const handlePrevClick = () => {
    navigate("/education");
  };

  const handleNextClick = () => {
    const currentFormData = { ...experienceFields[0] };

    const isCurrentFormDataEmpty = Object.values(currentFormData).every((val) => val === "");

    const tableData = experienceFields.slice(1);

    const allExperienceData = isCurrentFormDataEmpty ? tableData : [currentFormData, ...tableData];

    if (allExperienceData.length > 0) {
      dispatch(saveProfessionalExperience(allExperienceData));
    }

    navigate("/skills");
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
      <h1 className="resume-form-title">Professional Experience</h1>
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
            />
          </div>
        </div>

        {experienceFields.length > 1 && (
          <div className="education-table-container">
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

      <div className="resume-form-btn">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
}

export default ResumeHoc(ProfessionalExperience);
