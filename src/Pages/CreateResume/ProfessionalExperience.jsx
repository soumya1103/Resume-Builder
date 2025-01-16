import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { saveProfessionalExperience } from "../../Redux/ResumeReducer/ResumeAction";
import { getCandidateProfileById, getUserById, view_resume } from "../../Api/apiService";
import { toast } from "react-toastify";
import { formatDate } from "../../Utils/formatDate";
import "./CreateResume.css";
import "./ProfessionalExperience.css";

function ProfessionalExperience() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profileId = new URLSearchParams(location.search).get("profileId");
  const candidateUserId = new URLSearchParams(location.search).get("candidateProfileId");

  const user = JSON.parse(localStorage.getItem("auth")) || { userId: "" };
  const candidateId = localStorage.getItem("profileId") || { profileId: "" };
  const employeeId = localStorage.getItem("employeeId") || {employeeId: ""};
  const role = localStorage.getItem("selectedRole") || { selectedRole: "" };
  let [id, setId] = useState("");

  const savedProfessionalExperience = useSelector(
    (state) => state.resume.profileData.professionalExperience || []
  );
  
  const [experienceFields, setExperienceFields] = useState([
    { jobTitle: "", companyName: "", projectName: "", startDate: "", endDate: "", techStack: "", details: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   const userDet = useSelector((state) => state.auth);
  const { userId } = userDet;
 const [userDetails, setUserDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [editFieldIndex, setEditFieldIndex] = useState(null);
  const [editField, setEditField] = useState({
    jobTitle: "",
    companyName: "",
    projectName: "",
    startDate: "",
    endDate: "",
    techStack: "",
    details: "",
  });

  const getCandidateDetailsForExperience = async () => {
    try {
      const response = await getCandidateProfileById(candidateId);
      console.log(response);
  
      if (response?.status === 200 || response?.status === 201) {
        const profile = response.data.profileData;
        const professionalExperienceData = profile?.professionalExperience || [];
  
        if (professionalExperienceData.length > 0) {
          const formattedExperienceFields = professionalExperienceData.map((exp) => ({
            jobTitle: exp.jobTitle || "",
            companyName: exp.companyName || "",
            projectName: exp.projectName || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            techStack: exp.techStack || "",
            details: exp.details || "",
          }));

          console.log(formattedExperienceFields);
  
          setExperienceFields(formattedExperienceFields);
        }
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
  

   useEffect(() => {
        if (role !== "candidate") {
          getUserDetails();
        } else {
          getCandidateDetailsForExperience();
        }
      }, []);
  

  useEffect(() => {

   
    const fetchProfessionalExperience = async () => {
      if(role === "employee"){
        id = employeeId;
      }else{
        id = user.userId;
      }
      setLoading(true);
      try {
        const response = await view_resume(id);
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
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (profileId) fetchProfessionalExperience();
  }, [profileId, user.userId]);

  const handlePrevClick = () => {
    if (role === "employee") {
        navigate(profileId ? `/education?profileId=${profileId}` : "/education");
    } else if (role === "candidate") {
        navigate(`/education?candidateProfileId=${candidateUserId}`);
    } else {
        navigate(profileId ? `/education?profileId=${profileId}` : "/education");
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

  if (role === "employee") {
    navigate(profileId ? `/skills?profileId=${profileId}` : "/skills");
  } else if (role === "candidate") {
    navigate(candidateId ? `/skills?candidateProfileId=${candidateId}` : "/skills");
  } else {
    navigate(profileId ? `/skills?profileId=${profileId}` : "/skills");
  }
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

  const handleEditClick = (index) => {
    setEditField(experienceFields[index]);
    setEditFieldIndex(index);
    setShowModal(true);
  };

  

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = experienceFields.map((field, i) => (i === index ? { ...field, [fieldName]: value } : field));
    setExperienceFields(updatedFields);
  };

  const handleModalSave = () => {
    const updatedFields = [...experienceFields];
    updatedFields[editFieldIndex] = editField;
    setExperienceFields(updatedFields);
    setShowModal(false);
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
    <Input
      label="Project Name"
      name="projectName"
      type="text"
      className="resume-form-input-field"
      value={experienceFields[0].projectName}
      onChange={(e) => handleFieldChange(0, "projectName", e.target.value)}
    />
    <Input
      label="Start Date"
      name="startDate"
      placeholder="yyyy-mm-dd"
      type="text"
      className="resume-form-input-field"
      value={experienceFields[0].startDate}
      onChange={(e) => handleFieldChange(0, "startDate", e.target.value)}
    />
    <Input
      label="End Date"
      name="endDate"
      placeholder="yyyy-mm-dd"
      type="text"
      className="resume-form-input-field"
      value={experienceFields[0].endDate}
      onChange={(e) => handleFieldChange(0, "endDate", e.target.value)}
    />
    <Input
      label="Tech Stack"
      name="techStack"
      type="text"
      className="resume-form-input-field"
      value={experienceFields[0].techStack}
      onChange={(e) => handleFieldChange(0, "techStack", e.target.value)}
    />
     <div className="grid-container-1-col">
    <Input
      label="Details"
      name="details"
      type="textarea"
      className="edit-professional-field-details"
      value={experienceFields[0].details}
      onChange={(e) => handleFieldChange(0, "details", e.target.value)}
    />
  </div>
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
                      <td className="table-icons">
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

      {/* Edit Modal */}
      {showModal && (
        <Modal className ="edit-modal-content" show={showModal} onClose={() => setShowModal(false)}>
          <h2>Edit Professional Experience</h2>
          <div className="professionalExperience-modal-edit">
          <Input
            className="edit-professional-field"
            label="Job Title"
            value={editField.jobTitle}
            onChange={(e) => setEditField({ ...editField, jobTitle: e.target.value })}
          />
          <Input
          className="edit-professional-field"
            label="Company Name"
            value={editField.companyName}
            onChange={(e) => setEditField({ ...editField, companyName: e.target.value })}
          />
          <Input
          className="edit-professional-field"
            label="Project Name"
            value={editField.projectName}
            onChange={(e) => setEditField({ ...editField, projectName: e.target.value })}
          />
          <Input
          className="edit-professional-field"
            label="Start Date"
            value={editField.startDate}
            onChange={(e) => setEditField({ ...editField, startDate: e.target.value })}
          />
          <Input
          className="edit-professional-field"
            label="End Date"
            value={editField.endDate}
            onChange={(e) => setEditField({ ...editField, endDate: e.target.value })}
          />
          <Input
          className="edit-professional-field"
            label="Tech Stack"
            value={editField.techStack}
            onChange={(e) => setEditField({ ...editField, techStack: e.target.value })}
          />
          <Input
          type="textarea"
          
          className="edit-professional-field-details"
            label="Details"
            value={editField.details}
            onChange={(e) => setEditField({ ...editField, details: e.target.value })}
          />

          </div>
          <Button onClick={handleModalSave}>Save</Button>
        </Modal>
      )}
    </div>
  );
}

export default ResumeHoc(ProfessionalExperience);
