// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { view_resume } from "../../Api/apiService";
// import "./ResumeList.css";

// const ResumesList = ({ isOpen, onClose }) => {
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const userId = useSelector((state) => state.auth.userId);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       setLoading(true);
//       try {
//         const response = await view_resume(userId);
//         setProfiles(response.data);
//         setLoading(false);
//         console.log(response.data);
//       } catch (error) {
//         // setError("Error fetching profiles");
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchProfiles();
//     } else {
//       setError("User ID is missing");
//     }
//   }, [userId]);

//   const handleProfileClick = (profile, index) => {
//     onClose();
//     navigate(`/viewResume/${userId}?index=${index}`);  };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//       {isOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2 className="modal-heading">Select a Resume</h2>
//             <button className="close-modal-btn" onClick={onClose}>
//               X
//             </button>
//             <ul className="resume-list">
//   {profiles.map((profile, index) => (
//     <li
//       key={index}
//       className="resume-item"
//       onClick={() => handleProfileClick(profile, index)} 
//     >
//        {profile.profileName}-{profile.jobTitle}
//     </li>
//   ))}
// </ul>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ResumesList;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { view_resume, delete_resume } from "../../Api/apiService"; // Import delete API function
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import "./ResumeList.css";

// const ResumesList = ({ isOpen, onClose }) => {
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const userId = useSelector((state) => state.auth.userId);
//   const navigate = useNavigate();

//   const fetchProfiles = async () => {
//     setLoading(true);
//     try {
//       const response = await view_resume(userId);
//       // Filter profiles where isDeleted is false
//       const activeProfiles = response.data.filter(profile => !profile.isDeleted);
//       setProfiles(activeProfiles);
//       setLoading(false);
//     } catch (error) {
//       setError("Error fetching profiles");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchProfiles();
//     } else {
//       setError("User ID is missing");
//     }
//   }, [userId]);

//   const handleProfileClick = (profile, index) => {
//     onClose();
//     navigate(`/viewResume/${userId}?index=${index}`);
//   };

//   const handleEdit = (profile) => {
//     navigate(`/editResume/${profile.id}`);
//   };

//   const handleDelete = async (resumeId) => {
//     try {
//       const deleteResponse = await delete_resume(resumeId);
//       if (deleteResponse.data.isDeleted) {
//         // Re-fetch profiles after deletion to get the latest list
//         fetchProfiles();
//       }
//     } catch (error) {
//       setError("Failed to delete resume");
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//       {isOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2 className="modal-heading">Select a Resume</h2>
//             <button className="close-modal-btn" onClick={onClose}>X</button>
            
//             {profiles.length === 0 ? (
//               <p className="modal-heading">Resumes not available</p>
//             ) : (
//               <ul className="resume-list">
//                 {profiles.map((profile, index) => (
//                   <li key={index} className="resume-item">
//                     <span onClick={() => handleProfileClick(profile, index)}>
//                       {profile.profileName} - {profile.jobTitle}
//                     </span>
//                     <div className="resume-actions">
//                       <FontAwesomeIcon
//                         icon={faEdit}
//                         className="icon-button edit-icon"
//                         onClick={() => handleEdit(profile)}
//                       />
//                       <FontAwesomeIcon
//                         icon={faTrashCan}
//                         className="icon-button delete-icon"
//                         onClick={() => handleDelete(profile.id)}
//                       />
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ResumesList;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { view_resume, delete_resume } from "../../Api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal"; 
import Button from "../Button/Button"
import "./ResumeList.css";

const ResumesList = ({ isOpen, onClose }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await view_resume(userId);
      const activeProfiles = response.data.filter(profile => !profile.isDeleted);
      setProfiles(activeProfiles);
      setLoading(false);
    } catch (error) {
      setError("Error fetching profiles");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfiles();
    } else {
      setError("User ID is missing");
    }
  }, [userId]);

  const handleProfileClick = (profile, index) => {
    onClose();
    navigate(`/viewResume/${userId}?index=${index}`);
  };

  const handleEdit = (profile) => {
    navigate(`/editResume/${profile.id}`);
  };

  const openDeleteModal = (resumeId) => {
    setSelectedResumeId(resumeId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedResumeId) return;
    try {
      const deleteResponse = await delete_resume(selectedResumeId);
      if (deleteResponse.data.isDeleted) {
        setShowDeleteModal(false);
        fetchProfiles(); 
      }
    } catch (error) {
      setError("Failed to delete resume");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-heading">Select a Resume</h2>
            <button className="close-modal-btn" onClick={onClose}>X</button>
            
            {profiles.length === 0 ? (
              <p className="resumes-available">Resumes not available!</p>
            ) : (
              <ul className="resume-list">
                {profiles.map((profile, index) => (
                  <li key={index} className="resume-item">
                    <span onClick={() => handleProfileClick(profile, index)}>
                      {profile.profileName} - {profile.jobTitle}
                    </span>
                    <div className="resume-actions">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="icon-button edit-icon"
                        onClick={() => handleEdit(profile)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="icon-button delete-icon"
                        onClick={() => openDeleteModal(profile.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        height="150px"
        width="300px"
      >
        <h3>Are you sure you want to delete this resume?</h3>
        <div className="modal-buttons">
          <Button onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button onClick={confirmDelete}>Yes</Button>
        </div>
      </Modal>
    </>
  );
};

export default ResumesList;
