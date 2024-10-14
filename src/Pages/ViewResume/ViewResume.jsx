import React, { useState, useEffect } from 'react';
import { view_resume } from '../../Api/apiService';
import './ViewResume.css'; // Make sure to create and link the CSS file

const ViewResume = ({ userId }) => {  
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await view_resume(userId); 
        setProfile(response.data[0]);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <h1>{profile.profileName}</h1>
        <p>Contact: {profile.contactNo}</p>
        <p>Objective: {profile.objective}</p>
      </div>

      {/* Professional Summary */}
      <h2 className="section-title">Professional Summary</h2>
      <ul className="bullet-section professional-summary">
        {profile.profileData.professionalSummary.map((summary, index) => (
          <li key={index}><p>{summary}</p></li>
        ))}
      </ul>

      {/* Technical Skills */}
      <h2 className="section-title">Technical Skills</h2>
      <ul className="bullet-section">
        {profile.profileData.technicalSkills.technology.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>

      {/* Professional Experience */}
      <h2 className="section-title">Professional Experience</h2>
      {profile.profileData.professionalExperience.map((experience, index) => (
        <div key={index} className="professional-experience">
          <h4>{experience.jobTitle} at {experience.companyName}</h4>
          <ul className="bullet-section">
            {experience.details.map((detail, idx) => (
              <li key={idx}><p>{detail}</p></li>
            ))}
          </ul>
        </div>
      ))}

      {/* Education Section */}
      <h2 className="section-title">Education</h2>
      {profile.profileData.education.map((education, index) => (
        <div key={index} className="education">
          <p className="institution">{education.course} from {education.collegeName}</p>
          <p>Duration: {education.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewResume;
