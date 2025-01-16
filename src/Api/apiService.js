import { app, upload } from "./apiClient";
import {
  ADD_CANDIDATE,
  CHANGE_PASSWORD,
  CREATE_USER,
  DELETE_CANDIDATE_PROFILE,
  GET_ALL_CANDIDATE,
  GET_ALL_PROFILES,
  GET_CANDIDATE_PROFILE_BY_ID,
  GET_PROFILE_DETAILS,
  GET_USER_BY_ID,
  GET_USER_BY_ROLE,
  LOGIN,
  PY_INTERGRATION,
  REGISTER_USER,
  RESET_PASSWORD,
  RESUME_TITLE,
  SAVE_CANDIDATE_NAME,
  SEND_OTP,
  UPDATE_PROFILE,
  UPDATE_RESUME
} from "./apiConstants";
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

export const saveResumeTitle = async (title, userId) => {
  return await app.post(RESUME_TITLE, { title, userId });
};

export const deleteResume = async (resumeId) => {
  return await app.put(DELETE_RESUME(resumeId));
};

export const deleteCandidateResume = async (resumeId) => {
  return await app.put(DELETE_CANDIDATE_PROFILE(resumeId));
};


export const getUserProfile = async (profileId) => {
  return await app.get(`${GET_PROFILE_DETAILS}/${profileId}`);
};

export const changePassword = async (userId, data) => {
  return await app.post(`${CHANGE_PASSWORD}/${userId}/change-password`, data);
};

export const uploadResume = (formData) => {
  return upload.post(PY_INTERGRATION, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllProfiles = async () => {
  return await app.get(GET_ALL_PROFILES);
};

export const getUserByRole = async () => {
  return await app.get(GET_USER_BY_ROLE);
};

export const registerUser = async (name, email, password, role) => {
  return await app.post(REGISTER_USER, [{ name, email, password, role }]);
};

export const saveCandidateName = async (name) => {
  return await app.post(SAVE_CANDIDATE_NAME, { name });
};

export const addCandidate = async (id, data) => {
  return await app.put(`${ADD_CANDIDATE}/${id}`, data);
};

export const getAllCandidates = async () => {
  return await app.get(GET_ALL_CANDIDATE);
};

export const getCandidateProfileById = async (id) => {
  return await app.get(`${GET_CANDIDATE_PROFILE_BY_ID}/${id}`);
};

export const updateResume = async (profileId, updatedProfile) => {
  return await app.put(`${UPDATE_RESUME}/${profileId}`, updatedProfile);
}
