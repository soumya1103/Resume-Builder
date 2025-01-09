

import React, { useState, useEffect } from "react";
import ResumeHoc from "../../Components/Hoc/ResumeHoc";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { SKILLS } from "../../Redux/ResumeReducer/ResumeTypes";
import { getCandidateProfileById, getUserById, view_resume } from "../../Api/apiService";
import "./Skills.css";
import { toast } from "react-toastify";

function Skills() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { technicalSkills } = useSelector((state) => state.resume.profileData);

  const [technology, setTechnology] = useState(technicalSkills.technology || []);
  const [programmingLanguage, setProgrammingLanguage] = useState(technicalSkills.programming || []);
  const [tools, setTools] = useState(technicalSkills.tools || []);

  const profileId = new URLSearchParams(location.search).get("profileId");
  const candidateUserId = new URLSearchParams(location.search).get("candidateProfileId");
  const [inputTechnologyValue, setInputTechnologyValue] = useState("");
  const [inputProgrammingLanguageValue, setInputProgrammingLanguageValue] = useState("");
  const [inputToolsValue, setInputToolsValue] = useState("");
  const [userDetails, setUserDetails] = useState();
  const user = JSON.parse(localStorage.getItem("auth")) || { userId: "" };
  const candidateId = localStorage.getItem("profileId") || { profileId: "" };
  const employeeId = localStorage.getItem("employeeId") || {employeeId: ""};
  const role = localStorage.getItem("selectedRole") || { selectedRole: "" };
  let [id, setId] = useState("");
 

    const userDet = useSelector((state) => state.auth);
    const { userId } = userDet;

    const getCandidateDetailsForSkills = async () => {
      try {
        const response = await getCandidateProfileById(candidateId);
        console.log("Candidate Skills Response:", response);
    
        if (response?.status === 200 || response?.status === 201) {
          const profile = response.data.profileData;
          const technicalSkills = profile?.technicalSkills || {};
    
          const formattedSkillsFields = {
            technology: technicalSkills?.technology || [],
            programmingLanguage: technicalSkills?.programming || [],
            tools: technicalSkills?.tools || [],
          };
    
          console.log("Formatted Skills Fields:", formattedSkillsFields);
    
         
          setTechnology(formattedSkillsFields.technology);
          setProgrammingLanguage(formattedSkillsFields.programmingLanguage);
          setTools(formattedSkillsFields.tools);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.", {
          autoClose: 2000,
        });
        console.error("Error fetching candidate skills:", error);
      }
    };


      const getUserDetails = async () => {
          if (role === "employee") {
            const response = await getUserById(user.userId);
            try {
              if (response?.status === 200 || response?.status === 201) {
                setUserDetails(response.data);
              }
            } catch (error) {
              toast.error(error?.response?.data?.message || "Something went wrong.", {
                autoClose: 2000,
              });
            }
          } else {
            const response = await getUserById(userId);
            try {
              if (response?.status === 200 || response?.status === 201) {
                setUserDetails(response.data);
              }
            } catch (error) {
              toast.error(error?.response?.data?.message || "Something went wrong.", {
                autoClose: 2000,
              });
            }
          }
        };

   useEffect(() => {
          if (role !== "candidate") {
            getUserDetails();
          } else {
            getCandidateDetailsForSkills();
          }
        }, []);
      

  
  useEffect(() => {
    const fetchProfile = async () => {
      if(role === "employee"){
        id = employeeId;
      }else{
        id = user.userId;
      }
        try {
            const response = await view_resume(id);
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
    if (role === "employee") {
        navigate(profileId ? `/professionalExperience?profileId=${profileId}` : "/professionalExperience");
    } else if (role === "candidate") {
        navigate(`/professionalExperience?candidateProfileId=${candidateUserId}`);
    } else {
        navigate(profileId ? `/professionalExperience?profileId=${profileId}` : "/professionalExperience");
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

  if (role === "employee") {
    navigate(profileId ? `/professionalSummary?profileId=${profileId}` : "/professionalSummary");
  } else if (role === "candidate") {
    navigate(candidateId ? `/professionalSummary?candidateProfileId=${candidateId}` : "/professionalSummary");
  } else {
    navigate(profileId ? `/professionalSummary?profileId=${profileId}` : "/professionalSummary");
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


