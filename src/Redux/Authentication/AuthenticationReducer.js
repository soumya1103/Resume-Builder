// import { LOGIN, LOGOUT } from "./AuthenticationTypes";

// const persistedState = {
//   name: "",
//   email: "",
//   role: "",
//   token: "",
//   userId: "",};

// const initialState = persistedState;

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN:
//       localStorage.setItem("auth", JSON.stringify(action.payload));
//       return action.payload;

//     case LOGOUT:
//       localStorage.removeItem("auth");
//       return {
//         name: "",
//         email: "",
//         role: "",
//         token: "",
//         userId: "",
//       };

//     default:
//       return state;
//   }
// };

// export default authReducer;

import { LOGIN, LOGOUT } from "./AuthenticationTypes";

// Load the persisted state from localStorage, if available
const persistedAuth = JSON.parse(localStorage.getItem("auth")) || {
  name: "",
  email: "",
  role: "",
  token: "",
  userId: null,
};

const initialState = persistedAuth; // Set the initial state based on localStorage

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      // Save the login state to localStorage
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return action.payload;

    case LOGOUT:
      // Clear the auth data from localStorage on logout
      localStorage.removeItem("auth");
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

