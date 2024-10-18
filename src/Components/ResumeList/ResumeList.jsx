
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { view_resume } from '../../Api/apiService';  
import './ResumeList.css';  

const ResumesList = ({ isOpen, onClose }) => {  
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.auth.userId);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const response = await view_resume(userId); 
        setProfiles(response.data);  
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        setError('Error fetching profiles');
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfiles();
    } else {
      setError('User ID is missing');
    }
  }, [userId]);

  const handleProfileClick = (userId) => {
    onClose(); 
    navigate(`/viewResume/${userId}`);  
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {isOpen && (  
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select a Resume</h2>
            <button className="close-modal-btn" onClick={onClose}>X</button>
            <ul className="resume-list">
              {profiles.map((profile, index) => (
                <li key={index} className="resume-item" onClick={() => handleProfileClick(userId)}>
                  {profile.profileName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumesList;
