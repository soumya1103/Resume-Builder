import { CERTIFICATES, EDUCATION, ID_AND_NAME, PERSONAL_INFO, PROFESSIONAL_EXPERIENCE, PROFESSIONAL_SUMMARY, SKILLS } from "./ResumeTypes";

export const savePersonalInfo = (personalInfo) => {
  return {
    type: PERSONAL_INFO,
    payload: personalInfo,
  };
};

export const saveEducation = (personalInfo) => {
  return {
    type: EDUCATION,
    payload: personalInfo,
  };
};

export const saveProfessionalExperience = (personalInfo) => {
  return {
    type: PROFESSIONAL_EXPERIENCE,
    payload: personalInfo,
  };
};

export const saveSkills = (personalInfo) => {
  return {
    type: SKILLS,
    payload: personalInfo,
  };
};

export const saveProfessionalSummary = (personalInfo) => {
  return {
    type: PROFESSIONAL_SUMMARY,
    payload: personalInfo,
  };
};

export const saveCertificates = (personalInfo) => {
  return {
    type: CERTIFICATES,
    payload: personalInfo,
  };
};
