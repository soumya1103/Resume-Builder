import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
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
  const profileId = queryParams.get('profileId');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await view_resume(userId);
        const selectedProfile = response.data.find(profile => profile.id === parseInt(profileId));

        if (selectedProfile) {
          setProfile(selectedProfile);
        } else {
          setError("Profile not found");
        }
      } catch (error) {
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (userId && profileId) {
      fetchProfile();
    }
  }, [userId, profileId]);

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

  const formatExperienceDetails = (details) => {
    return details.split('. ').map((sentence, index) => (
      <li key={index}>{sentence.trim()}{sentence.trim().endsWith('.') ? '' : '.'}</li>
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <>
      <div className="btn-container">
        <Link to="/dashboard" className="icon-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <button onClick={downloadPDF} className="icon-button">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>

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
        
        {profile.profileData?.technicalSkills?.technology?.length > 0 && (
          <>
            <h3 className="sub-section-title">Technology</h3>
            <ul className="bullet-section">
              {profile.profileData.technicalSkills.technology.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </>
        )}

        {profile.profileData?.technicalSkills?.programming?.length > 0 && (
          <>
            <h3 className="sub-section-title">Programming</h3>
            <ul className="bullet-section">
              {profile.profileData.technicalSkills.programming.map((prog, index) => (
                <li key={index}>{prog}</li>
              ))}
            </ul>
          </>
        )}

        {profile.profileData?.technicalSkills?.tools?.length > 0 && (
          <>
            <h3 className="sub-section-title">Tools</h3>
            <ul className="bullet-section">
              {profile.profileData.technicalSkills.tools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </>
        )}

        <h2 className="section-title">Professional Experience</h2>
        {profile.profileData?.professionalExperience?.map((experience, index) => (
          <div key={index} className="professional-experience">
            <h3 className="experience-heading">
              {experience.jobTitle} at {experience.companyName} 
              <span className="experience-dates">({experience.startDate} - {experience.endDate})</span>
            </h3>
            <ul className="bullet-section">
              {formatExperienceDetails(experience.details)}
            </ul>
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
    </>
  );
};

export default ViewResume;
