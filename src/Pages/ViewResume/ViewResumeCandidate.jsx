import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { getCandidateProfileById } from "../../Api/apiService";
import "./ViewResume.css";
import Logo from "../../Images/NucleusTeq Logo.png";
import html2pdf from "html2pdf.js";

const ViewResumeCandidate = () => {
  const { candidateId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      try {
        const response = await getCandidateProfileById(candidateId);
        setResume(response.data);
      } catch (error) {
        setError("Error fetching resume data.");
      } finally {
        setLoading(false);
      }
    };

    if (candidateId) {
      fetchResume();
    }
  }, [candidateId]);

  const downloadPDF = () => {
    const element = document.getElementById("resume-content");
    const opt = {
      margin: [10, 0, 23, 0],
      filename: `${resume?.name || "Candidate"}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, scrollX: 0, scrollY: 0, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const formatExperienceDetails = (details) => {
    return details?.split(".").map((sentence, index) => {
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
    if (!date) return "";

    if (date.toLowerCase() === "present") {
      return "Present";
    }

    const options = { year: "numeric", month: "2-digit" };
    return new Date(date).toLocaleDateString("en-GB", options).replace(/\//g, "/");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!resume) return <div>No resume data available</div>;

  console.log(resume);

  const sortedExperience = resume.profileData?.professionalExperience?.sort((a, b) => new Date(b.endDate) - new Date(a.endDate)) || [];

  const sortedEducation = 
  resume.profileData?.education
    ?.map((edu) => ({
      ...edu,
      
      duration: edu.duration?.trim().endsWith("-")
        ? edu.duration.replace(/-\s*$/, "")
        : edu.duration,
    }))
    .sort((a, b) => {

      const endDateA = a.duration?.split(" - ")[1] || a.duration;
      const endDateB = b.duration?.split(" - ")[1] || b.duration;

      return new Date(endDateB) - new Date(endDateA);
    }) || [];

  return (
    <>
      <div className="btn-container">
        <Link to="/candidateResumeList" className="icon-button" title="back">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <button onClick={downloadPDF} className="icon-button" title="download pdf">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
      <hr />
      <div className="resume-container" id="resume-content">
        <div className="logo-container">
          <img src={Logo} alt="logo" className="logo" />
        </div>
        <div className="personal-info">
          <h1>{resume.name || "Unknown"}</h1>
          {resume.contactNo && <div className="contact">📞 {resume.contactNo}</div>}
          {resume.email && <div className="contact">✉️ {resume.email}</div>}
        </div>

        {resume.objective && resume.objective.trim().length > 0 && (
          <div>
            <h2 className="section-title">Objective</h2>
            <p className="selection-obj">{resume.objective}</p>
          </div>
        )}

        {resume.profileData?.professionalSummary?.trim()?.length > 0 && (
          <div>
            <h2 className="section-title">Professional Summary</h2>
            <p className="section-para">{resume.profileData.professionalSummary}</p>
          </div>
        )}

        {(resume.profileData?.technicalSkills?.technology?.length > 0 ||
          resume.profileData?.technicalSkills?.programming?.length > 0 ||
          resume.profileData?.technicalSkills?.tools?.length > 0) && (
          <div>
            <h2 className="section-title">Technical Skills</h2>

            {/* Technology Section */}
            {resume.profileData?.technicalSkills?.technology?.length > 0 && (
              <>
                <h3 className="sub-section-title">Technology</h3>
                <ul className="bullet-section-tech grid-layout">
                  {resume.profileData.technicalSkills.technology.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </>
            )}

            {resume.profileData?.technicalSkills?.programming?.length > 0 && (
              <>
                <h3 className="sub-section-title">Programming</h3>
                <ul className="bullet-section-tech grid-layout">
                  {resume.profileData.technicalSkills.programming.map((prog, index) => (
                    <li key={index}>{prog}</li>
                  ))}
                </ul>
              </>
            )}

            {resume.profileData?.technicalSkills?.tools?.length > 0 && (
              <>
                <h3 className="sub-section-title">Tools</h3>
                <ul className="bullet-section-tech">
                  {resume.profileData.technicalSkills.tools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        {sortedExperience?.length > 0 && (
          <div>
            <h2 className="section-title">Professional Experience</h2>
            {sortedExperience.map((experience, index) => (
              <div key={index} className="professional-experience">
                <h3 className="experience-heading">
                  {experience.jobTitle || "Position"} at {experience.companyName || "Company"}
                  <span className="experience-dates">
                    ({formatDate(experience.startDate)} - {formatDate(experience.endDate)})
                  </span>
                </h3>
                {experience.projectName?.trim()?.length > 0 && (
                  <p className="experience-project">
                    <strong>Project:</strong> {experience.projectName}
                  </p>
                )}
                {experience.techStack?.trim()?.length > 0 && (
                  <p className="experience-project">
                    <strong>Technologies Used:</strong> {experience.techStack}
                  </p>
                )}
                <ul className="bullet-section">{formatExperienceDetails(experience.details)}</ul>
              </div>
            ))}
          </div>
        )}

{sortedEducation?.length > 0 && (
  <div>
    <h2 className="section-title">Education</h2>
    {sortedEducation.map((education, index) => (
      <div key={index} className="education">
        <h3 className="experience-heading">
          {education.course || "Course"} from {education.collegeName || "Institution"}
        </h3>
        {education.duration && education.duration.trim().length > 0 && ( 
          <p
            className={
              education.duration.includes("%") || education.duration.includes("CGPA")
                ? "experience-duration"
                : "experience-duration"
            }
          >
            {education.duration.includes("%") || education.duration.includes("CGPA") ? (
              <>Percentage/CGPA: {education.duration}</>
            ) : (
              <>Duration: {education.duration}</>
            )}
          </p>
        )}
      </div>
    ))}
  </div>
)}


        {resume.profileData?.certificates?.length > 0 && (
          <div>
            <h2 className="section-title">Certificates</h2>
            <ul className="bullet-section">
              {resume.profileData.certificates.map((certificate, index) => (
                <li key={index}>{certificate}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewResumeCandidate;
