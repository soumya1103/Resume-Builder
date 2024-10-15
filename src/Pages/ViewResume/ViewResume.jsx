import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { view_resume } from '../../Api/apiService';
import './ViewResume.css'; 
import Logo from '../../Images/NucleusTeq Logo.png';

const ViewResume = () => {  
  const [profile, setProfile] = useState(null);

  // Get userId from Redux store
  const userId = useSelector((state) => state.auth.userId); 

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

      <h2 className="section-title">Objective</h2>
      <p>{profile.objective}</p>

      {/* Professional Summary */}
      <h2 className="section-title">Professional Summary</h2>
      <ul className="bullet-section professional-summary">
        {profile.profileData.professionalSummary.map((summary, index) => (
          <li key={index}>{summary}</li>
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
          <h3 className="experience-heading">{experience.jobTitle} at {experience.companyName}</h3>
          <ul className="bullet-section">
            {experience.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
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
