import { CERTIFICATES, EDUCATION, PERSONAL_INFO, PROFESSIONAL_EXPERIENCE, PROFESSIONAL_SUMMARY, SKILLS } from "./ResumeTypes";

const initialState = {
  contactNo: "",
  objective: "",
  profileData: {
    professionalSummary: [],
    certificates: [],
    technicalSkills: {
      technology: [],
      programming: [],
      tools: [],
    },
    professionalExperience: [],
    education: [],
  },
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONAL_INFO:
      return {
        ...state,
        ...action.payload,
      };

    case EDUCATION:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          education: action.payload,
        },
      };

    case PROFESSIONAL_EXPERIENCE:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          professionalExperience: action.payload,
        },
      };

    case SKILLS:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          technicalSkills: action.payload,
        },
      };

    case PROFESSIONAL_SUMMARY:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          professionalSummary: action.payload,
        },
      };

    case CERTIFICATES:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          certificates: action.payload,
        },
      };

    default:
      return state;
  }
};

export default resumeReducer;
