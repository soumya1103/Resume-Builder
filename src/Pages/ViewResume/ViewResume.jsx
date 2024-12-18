import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { getCandidateProfileById, view_resume } from "../../Api/apiService";
import "./ViewResume.css";
import Logo from "../../Images/NucleusTeq Logo.png";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";

const ViewResume = (candidateId) => {
  const { userId } = useParams();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = useSelector((state) => state.auth);
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get("profileId");

  const selectedRole = localStorage.getItem("selectedRole") || { selectedRole: "" };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await view_resume(userId);
        const selectedProfile = response.data.find((profile) => profile.id === parseInt(profileId));

        if (selectedProfile) {
          const email = JSON.parse(localStorage.getItem("auth"))?.email;
          setProfile({ ...selectedProfile, email });
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
    const element = document.getElementById("resume-content");
    const opt = {
      margin: 0,
      filename: `${profile.profileName}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, scrollX: 0, scrollY: 0, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const formatExperienceDetails = (details) => {
    return details.split(".").map((sentence, index) => {
      const trimmedSentence = sentence.trim();
      return trimmedSentence ? (
        <li key={index}>
          {trimmedSentence}
          {trimmedSentence.endsWith(".") ? "" : "."}
        </li>
      ) : null;
    });
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit" };
    return new Date(date).toLocaleDateString("en-GB", options).replace(/\//g, "/");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data available</div>;

  const sortedExperience = [...(profile.profileData?.professionalExperience || [])].sort(
    (a, b) => new Date(b.endDate) - new Date(a.endDate)
  );

  const sortedEducation = [...(profile.profileData?.education || [])].sort(
    (a, b) => new Date(b.duration.split(" - ")[1]) - new Date(a.duration.split(" - ")[1])
  );

  return (
    <>
      <div className="btn-container">
        <Link to={role.role === "ROLE_HR" ? "/employeeResumeList" : "/dashboard"} className="icon-button" title="back">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <button onClick={downloadPDF} className="icon-button" title="download pdf">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
      <hr></hr>
      <div className="resume-container" id="resume-content">
        <div className="logo-container">
          <img src={Logo} alt="logo" className="logo" />
        </div>
        <div className="personal-info">
          <h1>{profile.profileName}</h1>
        </div>

        {profile.objective && (
          <>
            <h2 className="section-title">Objective</h2>
            <p>{profile.objective}</p>
          </>
        )}

        {profile.profileData?.professionalSummary && (
          <>
            <h2 className="section-title">Professional Summary</h2>
            <p>{profile.profileData.professionalSummary}</p>
          </>
        )}

        {profile.profileData?.technicalSkills && (
          <>
            <h2 className="section-title">Technical Skills</h2>
            {profile.profileData.technicalSkills.technology?.length > 0 && (
              <>
                <h3 className="sub-section-title">Technology</h3>
                <ul className="bullet-section">
                  {profile.profileData.technicalSkills.technology.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </>
            )}
            {profile.profileData.technicalSkills.programming?.length > 0 && (
              <>
                <h3 className="sub-section-title">Programming</h3>
                <ul className="bullet-section">
                  {profile.profileData.technicalSkills.programming.map((prog, index) => (
                    <li key={index}>{prog}</li>
                  ))}
                </ul>
              </>
            )}
            {profile.profileData.technicalSkills.tools?.length > 0 && (
              <>
                <h3 className="sub-section-title">Tools</h3>
                <ul className="bullet-section">
                  {profile.profileData.technicalSkills.tools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {sortedExperience.length > 0 && (
          <>
            <h2 className="section-title">Professional Experience</h2>
            {sortedExperience.map((experience, index) => (
              <div key={index} className="professional-experience">
                <h3 className="experience-heading">
                  {experience.jobTitle} at {experience.companyName}
                  <span className="experience-dates">
                    ({formatDate(experience.startDate)} - {formatDate(experience.endDate)})
                  </span>
                </h3>
                <p>
                  <strong>Project:</strong> {experience.projectName}
                </p>
                <p>
                  <strong>Technologies Used:</strong> {experience.techStack}
                </p>
                <ul className="bullet-section">{formatExperienceDetails(experience.details)}</ul>
              </div>
            ))}
          </>
        )}

        {sortedEducation.length > 0 && (
          <>
            <h2 className="section-title">Education</h2>
            {sortedEducation.map((education, index) => (
              <div key={index} className="education">
                <h3 className="experience-heading">
                  {education.course} from {education.collegeName}
                </h3>
                <p>
                  Duration: {formatDate(education.duration.split(" - ")[0])} - {formatDate(education.duration.split(" - ")[1])}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default ViewResume;
