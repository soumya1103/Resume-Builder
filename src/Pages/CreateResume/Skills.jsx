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

      <div className="resume-form-btn">
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
}

export default ResumeHoc(Skills);
