import { EDUCATION, PERSONAL_INFO } from "./ResumeTypes";

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

    default:
      return state;
  }
};

export default resumeReducer;
