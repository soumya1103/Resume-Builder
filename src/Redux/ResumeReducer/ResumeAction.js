import { EDUCATION, PERSONAL_INFO } from "./ResumeTypes";

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

// export const logoutUser = () => {
//   return {
//     type: LOGOUT,
//   };
// };
