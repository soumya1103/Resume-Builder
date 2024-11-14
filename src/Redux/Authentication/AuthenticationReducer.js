import { LOGIN, LOGOUT } from "./AuthenticationTypes";

const persistedAuth = JSON.parse(localStorage.getItem("auth")) || {
  name: "",
  email: "",
  role: "",
  token: "",
  userId: null,
};

const initialState = persistedAuth;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return action.payload;

    case LOGOUT:
      localStorage.removeItem("auth");
      localStorage.removeItem("authtoken");
      localStorage.removeItem("resume");
      localStorage.removeItem("profileId");
      localStorage.removeItem("selectedEmployeeId");
      localStorage.removeItem("selectedRole");
      return {
        name: "",
        email: "",
        role: "",
        token: "",
        userId: null,
      };

    default:
      return state;
  }
};

export default authReducer;
