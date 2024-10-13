import app from "./apiClient";
import { CREATE_USER, GET_USER_BY_ID, LOGIN } from "./apiConstants";

export const login = async (email, password) => {
  return await app.post(LOGIN, { email, password });
};

export const getUserById = async (userId) => {
  return await app.get(`${GET_USER_BY_ID}/${userId}`);
};

export const addUser = async (userData) => {
  return await app.post(CREATE_USER, userData);
};
