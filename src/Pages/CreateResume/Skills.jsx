import React, { useState } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "./Skills.css";

function Skills() {
  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate("/professionalExperience");
  };

  const handleNextClick = () => {
    navigate("/professionalSummary");
  };

  const [technology, setTechnology] = useState([]);
  const [programmingLanguage, setProgrammingLanguage] = useState([]);
  const [tools, setTools] = useState([]);
  const [inputTechnologyValue, setInputTechnologyValue] = useState("");
  const [inputProgrammingLanguageValue, setInputProgrammingLanguageValue] = useState("");
  const [inputToolsValue, setInputToolsValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputTechnologyValue.trim() !== "") {
      if (!technology.includes(inputTechnologyValue.trim())) {
        setTechnology([...technology, inputTechnologyValue.trim()]);
        setInputTechnologyValue("");
      }
    }

    if (e.key === "Enter" && inputProgrammingLanguageValue.trim() !== "") {
      if (!programmingLanguage.includes(inputProgrammingLanguageValue.trim())) {
        setProgrammingLanguage([...programmingLanguage, inputProgrammingLanguageValue.trim()]);
        setInputProgrammingLanguageValue("");
      }
    }

    if (e.key === "Enter" && inputToolsValue.trim() !== "") {
      if (!tools.includes(inputToolsValue.trim())) {
        setTools([...tools, inputToolsValue.trim()]);
        setInputToolsValue("");
      }
    }
  };

  const removeSkillTechnology = (skillToRemove) => {
    setTechnology(technology.filter((skill) => skill !== skillToRemove));
  };

  const removeSkillProgrammingLanguage = (skillToRemove) => {
    setProgrammingLanguage(programmingLanguage.filter((skill) => skill !== skillToRemove));
  };

  const removeSkillTools = (skillToRemove) => {
    setTools(tools.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="resume-form">
      <h1 className="resume-form-title">Skills</h1>
      <label className="skills-label">Technology</label>
      <div className="skills-container">
        <div className="skills-list">
          {technology.map((skill, index) => (
            <li key={index}>
              {skill}
              <button className="remove-skill" onClick={() => removeSkillTechnology(skill)}>
                ✖
              </button>
            </li>
          ))}
        </div>
        <input
          type="text"
          className="skill-input"
          placeholder="Enter a technology and press Enter"
          value={inputTechnologyValue}
          onChange={(e) => setInputTechnologyValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <label className="skills-label">Programming Languages</label>
      <div className="skills-container">
        <div className="skills-list">
          {programmingLanguage.map((skill, index) => (
            <li key={index}>
              {skill}
              <button className="remove-skill" onClick={() => removeSkillProgrammingLanguage(skill)}>
                ✖
              </button>
            </li>
          ))}
        </div>
        <input
          type="text"
          className="skill-input"
          placeholder="Enter a programming language and press Enter"
          value={inputProgrammingLanguageValue}
          onChange={(e) => setInputProgrammingLanguageValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <label className="skills-label">Tools</label>
      <div className="skills-container">
        <div className="skills-list">
          {tools.map((skill, index) => (
            <li key={index}>
              {skill}
              <button className="remove-skill" onClick={() => removeSkillTools(skill)}>
                ✖
              </button>
            </li>
          ))}
        </div>
        <input
          type="text"
          className="skill-input"
          placeholder="Enter a tool and press Enter"
          value={inputToolsValue}
          onChange={(e) => setInputToolsValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="resume-form-btn">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
}

export default ResumeHoc(Skills);
