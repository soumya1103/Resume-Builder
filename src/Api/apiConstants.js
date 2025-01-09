export const LOGIN = "/users/login";

export const REGISTER_USER = "/users/register";

export const VIEW_RESUME = (userId) => `/api/user-profiles/user/${userId}`;

export const GET_USER_BY_ID = "/users";

export const CREATE_USER = "api/user-profiles/create";

export const UPDATE_PROFILE = "/users/update";

export const SEND_OTP = "/users/forgot-password";

export const RESET_PASSWORD = "/users/reset-password";

export const CHANGE_PASSWORD = "/users";

export const RESUME_TITLE = "api/user-profiles/createJobTitle";

export const DELETE_RESUME = (resumeId) => `api/user-profiles/${resumeId}/delete`;

export const GET_PROFILE_DETAILS = "/users/profile";

export const PY_INTERGRATION = "/upload";

export const GET_ALL_PROFILES = "/api/user-profiles/getAllProfile";

export const GET_USER_BY_ROLE = "/users/employees";

export const SAVE_CANDIDATE_NAME = "/api/candidate-profiles/createName";

export const ADD_CANDIDATE = "/api/candidate-profiles/create";

export const GET_ALL_CANDIDATE = "/api/candidate-profiles/getAllProfile";

export const GET_CANDIDATE_PROFILE_BY_ID = "/api/candidate-profiles";

export const UPDATE_RESUME = "/api/user-profiles/update"


export const DELETE_CANDIDATE_PROFILE = (resumeId) => `/api/candidate-profiles/${resumeId}/delete`