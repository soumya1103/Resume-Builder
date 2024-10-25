import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { view_resume } from '../../Api/apiService';
import './ViewResume.css'; 
import Logo from '../../Images/NucleusTeq Logo.png';
import html2pdf from 'html2pdf.js';  

const ViewResume = () => {
  const { userId } = useParams();
  const location = useLocation();  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const profileIndex = queryParams.get('index');  

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await view_resume(userId);

        if (response.data[profileIndex]) {
          setProfile(response.data[profileIndex]);  
        } else {
          setError("Profile not found");
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching profile data.");
        setLoading(false);
      }
    };

    if (userId && profileIndex !== null) {  
      fetchProfile();
    }
  }, [userId, profileIndex]);

  const downloadPDF = () => {
    const element = document.getElementById('resume-content');  
    const opt = {
      margin: [10, 0, 10, 0], 
      filename: `${profile.profileName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 }, 
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

  
    html2pdf().set(opt).from(element).save();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <>
      <button className="sidebar">
        <Link to="/dashboard" className={`sidebar-link ${location.pathname === "/personalInfo" ? "active" : ""}`}>
          <FontAwesomeIcon icon={faArrowLeft} className="back-button" />
        </Link>
      </button>

      <div className="resume-container" id="resume-content"> 
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
            <h3 className="experience-heading">{education.course} from {education.collegeName}</h3>
            <p>Duration: {education.duration}</p>
          </div>
        ))}
      </div>

      <button onClick={downloadPDF} className="download-button">
        Download as PDF
      </button>
    </>
  ); 
};

export default ViewResume;

