import app from "./apiClient";
import { LOGIN, VIEW_RESUME } from "./apiConstants";

export const login = async (email, password) => {
  return await app.post(LOGIN, { email, password });
};

export const logout = () => {
  window.localStorage.removeItem("authtoken");
};


export const view_resume = async (userId) => {
  return await app.get(VIEW_RESUME(userId));
};