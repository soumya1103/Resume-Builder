import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { view_resume, deleteResume } from "../../Api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import "./ResumeList.css";

const ResumesListHr = ({ isOpen, onClose, userId }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await view_resume(userId);
      const activeProfiles = response.data.filter((profile) => !profile.isDeleted);
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
    }
  }, [userId]);

  const handleProfileClick = (profile) => {
    onClose();
    navigate(`/viewResume/${userId}?profileId=${profile.id}`);
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
      const deleteResponse = await deleteResume(selectedResumeId);
      if (deleteResponse.data.isDeleted) {
        setShowDeleteModal(false);
        fetchProfiles();
        toast.success("Resume deleted successfully!", { autoClose: 1500 });
      }
    } catch (error) {
      setError("Failed to delete resume");
    }
  };

  if (!isOpen) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-heading">Select a Resume</h2>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        {profiles.length === 0 ? (
          <p className="resumes-available">Resumes not available!</p>
        ) : (
          <ul className="resume-list">
            {profiles.map((profile, index) => (
              <li key={index} className="resume-item">
                <span onClick={() => handleProfileClick(profile)}>
                  {profile.profileName} - {profile.jobTitle}
                </span>
                <div className="resume-actions">
                  <FontAwesomeIcon icon={faEdit} className="icon-button edit-icon" onClick={() => handleEdit(profile)} />
                  <FontAwesomeIcon icon={faTrashCan} className="icon-button delete-icon" onClick={() => openDeleteModal(profile.id)} />
                </div>
              </li>
            ))}
          </ul>
        )}

        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} height="150px" width="400px">
          <p className="modal-heading">Are you sure you want to delete this resume?</p>
          <div className="modal-buttons">
            <Button onClick={confirmDelete}>Yes</Button>
            <Button onClick={() => setShowDeleteModal(false)}>No</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ResumesListHr;
