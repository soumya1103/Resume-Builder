import app from "./apiClient";
import { CREATE_USER, GET_PROFILE_DETAILS, GET_USER_BY_ID, LOGIN, RESET_PASSWORD, RESUME_TITLE, SEND_OTP, UPDATE_PROFILE } from "./apiConstants";
import { VIEW_RESUME, DELETE_RESUME } from "./apiConstants";

export const login = async (email, password) => {
  return await app.post(LOGIN, { email, password });
};

export const logout = () => {
  window.localStorage.removeItem("authtoken");
};

export const getUserById = async (userId) => {
  return await app.get(`${GET_USER_BY_ID}/${userId}`);
};

export const addUser = async (profileId, userData) => {
  return await app.put(`${CREATE_USER}/${profileId}`, userData);
};

export const view_resume = async (userId) => {
  return await app.get(VIEW_RESUME(userId));
};

export const updateProfile = async (userId, data) => {
  return await app.put(`${UPDATE_PROFILE}/${userId}`, data);
};

export const sendOtp = async (email) => {
  return await app.post(`${SEND_OTP}?email=${email}`);
};

export const resetPassword = async (email, otp, password) => {
  return await app.post(`${RESET_PASSWORD}?email=${email}&otp=${otp}&newPassword=${password}`);
};

export const saveResumeTitle = async (title) => {
  return await app.post(RESUME_TITLE, { title });
};

export const deleteResume = async (resumeId) => {
  return await app.put(DELETE_RESUME(resumeId));
};

export const getUserProfile = async (profileId) => {
  return await app.get(`${GET_PROFILE_DETAILS}/${profileId}`);
};
