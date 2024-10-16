import { LOGIN, LOGOUT } from "./AuthenticationTypes";

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
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return action.payload;

    case LOGOUT:
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
