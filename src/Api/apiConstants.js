export const LOGIN = "/users/login";

export const VIEW_RESUME = (userId) => `/api/user-profiles/user/${userId}`;

export const GET_USER_BY_ID = "/users";

export const CREATE_USER = "api/user-profiles/create";

export const UPDATE_PROFILE = "/users/update";

export const SEND_OTP = "/users/forgot-password";

export const RESET_PASSWORD = "/users/reset-password";

export const RESUME_TITLE = "api/user-profiles/createJobTitle";

export const DELETE_RESUME = (resumeId) => `api/user-profiles/${resumeId}/delete`;

export const GET_PROFILE_DETAILS = "/users/profile";
