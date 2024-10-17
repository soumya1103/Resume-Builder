
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { view_resume } from '../../Api/apiService';
import './ViewResume.css'; 
import Logo from '../../Images/NucleusTeq Logo.png';

const ViewResume = () => {  
  const { userId } = useParams();  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await view_resume(userId);  
        setProfile(response.data[0]);  
        setLoading(false);
      } catch (error) {
        setError("Error fetching profile data.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="resume-container">
      <div className="logo-container">
        <img src={Logo} alt="logo" className='logo' />
      </div>
      <div className="personal-info">
        <h1>{profile.profileName}</h1>
        {profile.contactNo && <div className='contact'>📞 {profile.contactNo}</div>}
        {profile.email && <div className='contact'>✉️ {profile.email}</div>}
      </div>

      <h2 className="section-title">Objective</h2>
      <p>{profile.objective}</p>

      <h2 className="section-title">Professional Summary</h2>
      <p>{profile.profileData?.professionalSummary}</p> 

      <h2 className="section-title">Technical Skills</h2>
      <ul className="bullet-section">
        {profile.profileData?.technicalSkills?.technology?.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
        {profile.profileData?.technicalSkills?.programming?.map((prog, index) => (
          <li key={index}>{prog}</li>
        ))}
        {profile.profileData?.technicalSkills?.tools?.map((tool, index) => (
          <li key={index}>{tool}</li>
        ))}
      </ul>

      <h2 className="section-title">Professional Experience</h2>
      {profile.profileData?.professionalExperience?.map((experience, index) => (
        <div key={index} className="professional-experience">
          <h3 className="experience-heading">{experience.jobTitle} at {experience.companyName}</h3>
          <p>{experience.details}</p>
        </div>
      ))}

      <h2 className="section-title">Education</h2>
      {profile.profileData?.education?.map((education, index) => (
        <div key={index} className="education">
          <p className="institution">{education.course} from {education.collegeName}</p>
          <p>Duration: {education.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewResume;
