import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { saveProfessionalSummary, saveCertificates } from "../../Redux/ResumeReducer/ResumeAction";

function ProfessionalSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { professionalSummary, certificates } = useSelector((state) => state.resume.profileData);

  const [summary, setSummary] = useState(professionalSummary || "");
  const [certification, setCertification] = useState(
    certificates.length > 0 ? certificates.map((cert) => ({ certification: cert, collapsed: false })) : [{ certification: "", collapsed: false }]
  );

  useEffect(() => {
    if (certificates.length > 0) {
      setCertification(certificates.map((cert) => ({ certification: cert, collapsed: false })));
    }
  }, [certificates]);

  const handlePrevClick = () => {
    navigate("/skills");
  };

  const handleSaveClick = async () => {
    const filteredCertifications = certification
      .filter((certField) => certField.certification.trim() !== "")
      .map((certField) => certField.certification);

    dispatch(saveProfessionalSummary(summary));
    dispatch(saveCertificates(filteredCertifications));
  };

  const handlePlusClick = () => {
    const updatedFields = certification.map((field, index) => (index === 0 ? { ...field, collapsed: true } : field));
    setCertification([{ certification: "", collapsed: false }, ...updatedFields]);
  };

  const handleDeleteClick = (index) => {
    const updatedFields = certification.filter((_, i) => i !== index);
    setCertification(updatedFields.length > 0 ? updatedFields : [{ certification: "", collapsed: false }]); // Ensure there's always at least one field
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = certification.map((field, i) => (i === index ? { ...field, certification: value } : field));
    setCertification(updatedFields);
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

      <div className="resume-form-btn">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={handleSaveClick}>Save</Button>
      </div>
    </div>
  );
}

export default ResumeHoc(ProfessionalSummary);
