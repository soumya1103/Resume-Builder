import React, { useState } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Education() {
  const [showExtraField, setShowExtraField] = useState(false);

  const navigate = useNavigate();
  const handlePrevClick = () => {
    navigate("/personalInfo");
  };

  const handleNextClick = () => {
    navigate("/professionalExperience");
  };

  const handlePlusClick = () => {
    setShowExtraField(true);
  };

  const handleDeleteClick = () => {
    setShowExtraField(false);
  };

  return (
    <div className="resume-form">
      <h1 className="resume-form-title">Education</h1>
      <div className="resume-form-header">
        <FontAwesomeIcon icon={faPlus} className="resume-plus-icon" onClick={handlePlusClick} />
      </div>
      <div className="grid-container-2-col">
        <Input label="Institution Name" name="institutionName" type="text" className="resume-form-input-field" />
        <Input label="Course" name="course" type="text" className="resume-form-input-field" />
      </div>
      <div className="grid-container-2-col">
        <Input label="Start Date" name="startDate" type="date" className="resume-form-input-field" />
        <Input label="End Date" name="endDate" type="date" className="resume-form-input-field" />
      </div>
      {showExtraField ? (
        <>
          <div className="resume-form-header">
            <FontAwesomeIcon icon={faTrash} className="resume-plus-icon" onClick={handleDeleteClick} />
          </div>
          <div className="grid-container-2-col">
            <Input label="Institution Name" name="institutionName" type="text" className="resume-form-input-field" />
            <Input label="Course" name="course" type="text" className="resume-form-input-field" />
          </div>
          <div className="grid-container-2-col">
            <Input label="Start Date" name="startDate" type="date" className="resume-form-input-field" />
            <Input label="End Date" name="endDate" type="date" className="resume-form-input-field" />
          </div>
        </>
      ) : (
        ""
      )}
      <div className="resume-form-btn">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
}

export default ResumeHoc(Education);
