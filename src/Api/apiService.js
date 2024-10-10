import app from "./apiClient";
import { LOGIN } from "./apiConstants";

export const login = async (email, password) => {
  return await app.post(LOGIN, { email, password });
};
