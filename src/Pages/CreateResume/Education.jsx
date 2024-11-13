import React, { useState, useEffect } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { EDUCATION } from "../../Redux/ResumeReducer/ResumeTypes";
import { useDispatch, useSelector } from "react-redux";
import { view_resume } from "../../Api/apiService";
import Modal from "../../Components/Modal/Modal";

function Education() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profileId = new URLSearchParams(location.search).get("profileId");
  const user = JSON.parse(localStorage.getItem("auth")) || { userId: "" };
  const savedEducationData = useSelector((state) => state.resume.profileData.education);

  const [educationFields, setEducationFields] = useState([
    { institutionName: "", course: "", startDate: "", endDate: "", collapsed: false },
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedField, setEditedField] = useState({
    institutionName: "",
    course: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await view_resume(user.userId);
        const profiles = response.data;

        const selectedProfile = profiles.find((profile) => profile.id === parseInt(profileId));

        if (selectedProfile && selectedProfile.profileData && selectedProfile.profileData.education.length > 0) {
          const educationData = selectedProfile.profileData.education;
          const formattedFields = educationData.map((edu) => {
            const [startDate, endDate] = edu.duration ? edu.duration.split(" - ") : ["", ""];
            return {
              institutionName: edu.collegeName || "",
              course: edu.course || "",
              startDate: startDate.trim(),
              endDate: endDate.trim(),
              collapsed: false,
            };
          });
          setEducationFields(formattedFields.length > 0 ? formattedFields : educationFields);
        } else {
          setError("Profile or education data not found");
        }
      } catch (err) {
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (profileId) fetchProfile();
  }, [profileId, user.userId]);

  const handlePrevClick = () => {
    if (!profileId) {
      navigate("/personalInfo");
    } else {
      navigate(`/personalInfo?profileId=${profileId}`);
    }
  };

  const handleNextClick = () => {
    const currentFormData = {
      collegeName: educationFields[0].institutionName,
      course: educationFields[0].course,
      duration: `${educationFields[0].startDate} - ${educationFields[0].endDate}`,
    };

    const tableData = educationFields.slice(1).map((field) => ({
      collegeName: field.institutionName,
      course: field.course,
      duration: `${field.startDate} - ${field.endDate}`,
    }));

    const allEducationData = currentFormData.collegeName ? [currentFormData, ...tableData] : tableData;

    if (allEducationData.length > 0) {
      dispatch({
        type: EDUCATION,
        payload: allEducationData,
      });
    }
const urlParams = new URLSearchParams(window.location.search);
  const profileId = urlParams.get('profileId');

  if (profileId) {
    navigate(`/professionalExperience?profileId=${profileId}`);
  } else {
    navigate("/professionalExperience");
  }
  };

  const handlePlusClick = () => {
    const updatedFields = educationFields.map((field, index) => (index === 0 ? { ...field, collapsed: true } : field));

    setEducationFields([{ institutionName: "", course: "", startDate: "", endDate: "", collapsed: false }, ...updatedFields]);
  };

  const handleDeleteClick = (index) => {
    const updatedFields = educationFields.filter((_, i) => i !== index);
    setEducationFields(updatedFields);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedField({
      institutionName: educationFields[index].institutionName,
      course: educationFields[index].course,
      startDate: educationFields[index].startDate,
      endDate: educationFields[index].endDate,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedField((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSaveEdit = () => {
    const updatedFields = [...educationFields];
    updatedFields[editingIndex] = {
      ...updatedFields[editingIndex],
      ...editedField,
    };
    setEducationFields(updatedFields);
    setIsModalOpen(false);
  };

  return (
    <div className="resume-form">
      <div>
        <h1 className="resume-form-title">Education</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div className="resume-professional-experience">
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
                    label="Start Year"
                    name="startYear"
                    type="number"
                    className="resume-form-input-field"
                    value={educationFields[0].startDate}
                    onChange={(e) => handleFieldChange(0, "startDate", e.target.value)}
                  />
                  <Input
                    label="End Year"
                    name="endYear"
                    type="number"
                    className="resume-form-input-field"
                    value={educationFields[0].endDate}
                    onChange={(e) => handleFieldChange(0, "endDate", e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {educationFields.length > 1 && (
            <div className="education-table-container">
              <table className="education-table">
                <thead>
                  <tr>
                    <th>Institution Name</th>
                    <th>Course</th>
                    <th>Start Year</th>
                    <th>End Year</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {educationFields.slice(1).map((field, index) => (
                    <tr key={index + 1}>
                      <td>{field.institutionName}</td>
                      <td>{field.course}</td>
                      <td>{field.startDate}</td>
                      <td>{field.endDate}</td>
                      <td>
                        <FontAwesomeIcon icon={faEdit} className="resume-edit-icon" onClick={() => handleEditClick(index + 1)} />
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

      <Modal show={isModalOpen} onClose={handleModalClose} height="auto" width="400px">
        <h2>Edit Education</h2>
        <div className="modal-content">
          <Input
            label="Institution Name"
            name="institutionName"
            type="text"
            className="modal-input"
            value={editedField.institutionName}
            onChange={(e) => handleFieldChange("institutionName", e.target.value)}
          />
          <Input
            label="Course"
            name="course"
            type="text"
            className="modal-input"
            value={editedField.course}
            onChange={(e) => handleFieldChange("course", e.target.value)}
          />
          <Input
            label="Start Year"
            name="startYear"
            type="number"
            className="modal-input"
            value={editedField.startDate}
            onChange={(e) => handleFieldChange("startDate", e.target.value)}
          />
          <Input
            label="End Year"
            name="endYear"
            type="number"
            className="modal-input"
            value={editedField.endDate}
            onChange={(e) => handleFieldChange("endDate", e.target.value)}
          />
          <Button onClick={handleSaveEdit}>Save</Button>
        </div>
      </Modal>
    </div>
  );
}

export default ResumeHoc(Education);
