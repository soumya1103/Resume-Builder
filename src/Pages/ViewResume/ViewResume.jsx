import React, { useState, useEffect } from 'react';
import { view_resume } from '../../Api/apiService';
import './ViewResume.css'; 
import Logo from '../../Images/NucleusTeq Logo.png';

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
    <div className="resume-container">
      <div className="logo-container">
        <img src={Logo} alt="logo" className='logo' />
      </div>
      <div className="personal-info">
        <h1>{profile.profileName}</h1>
        <div className='contact'>📞 {profile.contactNo}</div>
        <div className='contact'>✉️ {profile.email}</div>
      </div>

      
      <heading className="section-title">Objective</heading>
      <p>{profile.objective}</p>

      {/* Professional Summary */}
      <heading className="section-title">Professional Summary</heading>
      <ul className="bullet-section professional-summary">
        {profile.profileData.professionalSummary.map((summary, index) => (
          <li key={index}>{summary}</li>
        ))}
      </ul>

      {/* Technical Skills */}
      <heading className="section-title">Technical Skills</heading>
      <ul className="bullet-section">
        {profile.profileData.technicalSkills.technology.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>

      {/* Professional Experience */}
      <heading className="section-title">Professional Experience</heading>
      {profile.profileData.professionalExperience.map((experience, index) => (
        <div key={index} className="professional-experience">
          <heading className= "experience-heading">{experience.jobTitle} at {experience.companyName}</heading>
          <ul className="bullet-section">
            {experience.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Education Section */}
      <heading className="section-title">Education</heading>
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
