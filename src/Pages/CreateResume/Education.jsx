import React, { useState, useEffect } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { EDUCATION } from "../../Redux/ResumeReducer/ResumeTypes";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateProfileById, getUserById, view_resume } from "../../Api/apiService";
import Modal from "../../Components/Modal/Modal";
import { toast } from "react-toastify";

function Education() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profileId = new URLSearchParams(location.search).get("profileId");
  const candidateUserId = new URLSearchParams(location.search).get("candidateProfileId");
  const user = JSON.parse(localStorage.getItem("auth")) || { userId: "" };
  const savedEducationData = useSelector((state) => state.resume.profileData.education);
  const candidateId = localStorage.getItem("profileId") || { profileId: "" };
  const employeeId = localStorage.getItem("employeeId") || {employeeId: ""};
  const role = localStorage.getItem("selectedRole") || { selectedRole: "" };
  let [id, setId] = useState("");


  const [educationFields, setEducationFields] = useState([
    { institutionName: "", course: "", startDate: "", endDate: "", collapsed: false },
  ]);
 const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
    const userDet = useSelector((state) => state.auth);
    const { userId } = userDet;
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editField, setEditField] = useState({
    institutionName: "",
    course: "",
    startDate: "",
    endDate: "",
  });

  const getCandidateDetails = async () => {
    try {
      const response = await getCandidateProfileById(candidateId);
      console.log(response);
  
      if (response?.status === 200 || response?.status === 201) {
        const profile = response.data.profileData;
        const educationData = profile?.education || [];
  
        if (educationData.length > 0) {
          const formattedEducationFields = educationData.map((edu) => {
            let startDate = "";
            let endDate = "";
  
         
            if (edu.duration) {
              const duration = edu.duration.replace(/\s+/g, ""); 
              [startDate, endDate] = duration.split("-"); 
            }
  
            return {
              institutionName: edu.collegeName || "",
              course: edu.course || "",
              startDate: startDate || null,
              endDate: endDate || startDate || null, 
              collapsed: false,
            };
          });
  
          setEducationFields(formattedEducationFields);
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
        getCandidateDetails();
      }
    }, []);
  

  useEffect(() => {
    const fetchProfile = async () => {
      if(role === "employee"){
        id = employeeId;
      }else{
        id = user.userId;
      }
      setLoading(true);
      try {
        const response = await view_resume(id);
        console.log("API Response:", response); 
        
        const selectedProfile = response.data.find((profile) => profile.id === parseInt(profileId));

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
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (profileId) fetchProfile();
  }, [profileId, user.userId]);

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

    const allEducationData = [currentFormData, ...tableData].filter(
        (data) => data.collegeName || data.course || (data.startDate && data.endDate)
    );

    dispatch({ type: EDUCATION, payload: allEducationData });


    if (role === "employee") {
        navigate(profileId ? `/professionalExperience?profileId=${profileId}` : "/professionalExperience");
    } else if (role === "candidate") {
      console.log(role);
        navigate(`/professionalExperience?candidateProfileId=${candidateId}`);
    } else {
        navigate(profileId ? `/professionalExperience?profileId=${profileId}` : "/professionalExperience");
    }
};


const handlePrevClick = () => {
    if (role === "employee") {
        navigate(profileId ? `/personalInfo?profileId=${profileId}` : "/personalInfo");
    } else if (role === "candidate") {
        navigate(`/personalInfo?candidateProfileId=${candidateUserId}`);
    } else {
        navigate(profileId ? `/personalInfo?profileId=${profileId}` : "/personalInfo");
    }
};

  const handlePlusClick = () => {
    const updatedFields = educationFields.map((field, index) => (index === 0 ? { ...field, collapsed: true } : field));
    setEducationFields([{ institutionName: "", course: "", startDate: "", endDate: "", collapsed: false }, ...updatedFields]);
  };

  const handleDeleteClick = (index) => {
    setEducationFields(educationFields.filter((_, i) => i !== index));
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditField({ ...educationFields[index] });
    setShowModal(true);
  };

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = educationFields.map((field, i) => (i === index ? { ...field, [fieldName]: value } : field));
    console.log(updatedFields);
    setEducationFields(updatedFields);
  };

  const handleModalSave = () => {
    const updatedFields = educationFields.map((field, i) =>
      i === editIndex ? { ...editField, collapsed: false } : field
    );
    setEducationFields(updatedFields);
    setShowModal(false);
    setEditIndex(null);
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
                    type="text"
                    className="resume-form-input-field"
                    value={educationFields[0].startDate}
                    onChange={(e) => handleFieldChange(0, "startDate", e.target.value)}
                  />
                  <Input
                    label="End Year"
                    name="endYear"
                    type="text"
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
                        <div className="table-icons">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="resume-edit-icon"
                          onClick={() => handleEditClick(index + 1)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="resume-delete-icon"
                          onClick={() => handleDeleteClick(index + 1)}
                        />
                        </div>
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

      {/* Modal for Editing */}
      <Modal show={showModal} onClose={() => setShowModal(false)} width="400px" height="400px">
        <h2>Edit Education</h2>
        <Input
          label="Institution Name"
          name="institutionName"
          type="text"
          value={editField.institutionName}
          onChange={(e) => setEditField({ ...editField, institutionName: e.target.value })}
          className="modal-input"
        />
        <Input
          label="Course"
          name="course"
          type="text"
          value={editField.course}
          onChange={(e) => setEditField({ ...editField, course: e.target.value })}
          className="modal-input"
        />
        <div className="grid-container-2-col">
          <Input
            label="Start Year"
            name="startYear"
            type="text"
            value={editField.startDate}
            onChange={(e) => setEditField({ ...editField, startDate: e.target.value })}
            className="modal-input"
          />
          <Input
            label="End Year"
            name="endYear"
            type="text"
            value={editField.endDate}
            onChange={(e) => setEditField({ ...editField, endDate: e.target.value })}
            className="modal-input"
          />
        </div>
        <Button onClick={handleModalSave}>Save</Button>
      </Modal>
    </div>
  );
}

export default ResumeHoc(Education);
