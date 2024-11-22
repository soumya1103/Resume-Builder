

import React, { useState, useEffect } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { SKILLS } from "../../Redux/ResumeReducer/ResumeTypes";
import { view_resume } from "../../Api/apiService";
import "./Skills.css";

function Skills() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { technicalSkills } = useSelector((state) => state.resume.profileData);

  const [technology, setTechnology] = useState(technicalSkills.technology || []);
  const [programmingLanguage, setProgrammingLanguage] = useState(technicalSkills.programming || []);
  const [tools, setTools] = useState(technicalSkills.tools || []);
  const user = JSON.parse(localStorage.getItem("auth")) || { name: "", email: "", userId: "" };
  const profileId = new URLSearchParams(location.search).get("profileId");

  const [inputTechnologyValue, setInputTechnologyValue] = useState("");
  const [inputProgrammingLanguageValue, setInputProgrammingLanguageValue] = useState("");
  const [inputToolsValue, setInputToolsValue] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await view_resume(user.userId);
            console.log("Fetched profiles:", response.data);
            const profiles = response.data || [];
            const selectedProfile = profiles.find((profile) => profile.id === parseInt(profileId));
            console.log("Selected profile:", selectedProfile);

            if (selectedProfile) {
                const { technicalSkills } = selectedProfile.profileData || {};
                setTechnology(technicalSkills?.technology || []);
                setProgrammingLanguage(technicalSkills?.programming || []);
                setTools(technicalSkills?.tools || []);
                
         
                dispatch({
                    type: "UPDATE_PROFILE_DATA",
                    payload: selectedProfile.profileData,
                });
            } else {
                console.error("Profile not found for profileId:", profileId);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    if (profileId) fetchProfile();
}, [profileId, user.userId, dispatch]);


  useEffect(() => {
    if (technicalSkills) {
      setTechnology(technicalSkills.technology || []);
      setProgrammingLanguage(technicalSkills.programming || []);
      setTools(technicalSkills.tools || []);
    }
  }, [technicalSkills]);

  const handlePrevClick = () => {
    if (!profileId) {
      navigate("/professionalExperience");
    } else {
      navigate(`/professionalExperience?profileId=${profileId}`);
    }
  };

  const handleNextClick = () => {
    dispatch({
      type: SKILLS,
      payload: {
        technology,
        programming: programmingLanguage,
        tools,
      },
    });
    if (profileId) {
      navigate(`/professionalSummary?profileId=${profileId}`);
    } else {
      navigate("/professionalSummary");
    }
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      if (type === "technology" && inputTechnologyValue.trim() !== "") {
        if (!technology.includes(inputTechnologyValue.trim())) {
          setTechnology([...technology, inputTechnologyValue.trim()]);
        }
        setInputTechnologyValue("");
      }
      if (type === "programmingLanguage" && inputProgrammingLanguageValue.trim() !== "") {
        if (!programmingLanguage.includes(inputProgrammingLanguageValue.trim())) {
          setProgrammingLanguage([...programmingLanguage, inputProgrammingLanguageValue.trim()]);
        }
        setInputProgrammingLanguageValue("");
      }
      if (type === "tools" && inputToolsValue.trim() !== "") {
        if (!tools.includes(inputToolsValue.trim())) {
          setTools([...tools, inputToolsValue.trim()]);
        }
        setInputToolsValue("");
      }
    }
  };

  const removeSkill = (type, skillToRemove) => {
    if (type === "technology") {
      setTechnology(technology.filter((skill) => skill !== skillToRemove));
    }
    if (type === "programmingLanguage") {
      setProgrammingLanguage(programmingLanguage.filter((skill) => skill !== skillToRemove));
    }
    if (type === "tools") {
      setTools(tools.filter((skill) => skill !== skillToRemove));
    }
  };

  return (
    <div className="resume-form">
      <div className="skills-container-outer">
        <h1 className="resume-form-title">Skills</h1>

        <label className="skills-label">Technology</label>
        <div className="skills-container">
          <div className="skills-list">
            {technology.map((skill, index) => (
              <li key={index}>
                {skill}
                <button className="remove-skill" onClick={() => removeSkill("technology", skill)}>
                  ✖
                </button>
              </li>
            ))}
          </div>
          <input
            type="text"
            className="skill-input"
            placeholder={inputTechnologyValue === "" ? "Enter a technology and press Enter" : ""}
            value={inputTechnologyValue}
            onChange={(e) => setInputTechnologyValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "technology")}
          />
        </div>

        <label className="skills-label">Programming Languages</label>
        <div className="skills-container">
          <div className="skills-list">
            {programmingLanguage.map((skill, index) => (
              <li key={index}>
                {skill}
                <button className="remove-skill" onClick={() => removeSkill("programmingLanguage", skill)}>
                  ✖
                </button>
              </li>
            ))}
          </div>
          <input
            type="text"
            className="skill-input"
            placeholder={inputProgrammingLanguageValue === "" ? "Enter a programming language and press Enter" : ""}
            value={inputProgrammingLanguageValue}
            onChange={(e) => setInputProgrammingLanguageValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "programmingLanguage")}
          />
        </div>

        <label className="skills-label">Tools</label>
        <div className="skills-container">
          <div className="skills-list">
            {tools.map((skill, index) => (
              <li key={index}>
                {skill}
                <button className="remove-skill" onClick={() => removeSkill("tools", skill)}>
                  ✖
                </button>
              </li>
            ))}
          </div>
          <input
            type="text"
            className="skill-input"
            placeholder={inputToolsValue === "" ? "Enter a tool and press Enter" : ""}
            value={inputToolsValue}
            onChange={(e) => setInputToolsValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "tools")}
          />
        </div>
      </div>
      <div className="resume-form-btn">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={handleNextClick}>Save</Button>
      </div>
    </div>
  );
}

export default ResumeHoc(Skills);


