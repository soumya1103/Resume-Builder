import app from "./apiClient";
import { GET_USER_BY_ID, LOGIN } from "./apiConstants";

export const login = async (email, password) => {
  return await app.post(LOGIN, { email, password });
};

export const logout = () => {
  window.localStorage.removeItem("authtoken");
};

export const getUserById = async (userId) => {
  return await app.get(`${GET_USER_BY_ID}/${userId}`);
};
