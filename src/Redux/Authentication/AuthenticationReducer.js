import { LOGIN, LOGOUT } from "./AuthenticationTypes";

// Retrieve any existing auth data from localStorage
const persistedState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      name: "",
      email: "",
      role: "",
      token: "",
      userId: "",
    };

const initialState = persistedState;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      // Store the user data in localStorage when the user logs in
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return action.payload;

    case LOGOUT:
      // Remove user data from localStorage when the user logs out
      localStorage.removeItem("auth");
      return {
        name: "",
        email: "",
        role: "",
        token: "",
        userId: "",
      };

    default:
      return state;
  }
};

export default authReducer;
