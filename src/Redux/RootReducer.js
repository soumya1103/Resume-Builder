import { combineReducers } from "redux";
import AuthenticationReducer from "./Authentication/AuthenticationReducer";
import ResumeReducer from "./ResumeReducer/ResumeReducer";

const rootReducer = combineReducers({
  auth: AuthenticationReducer,
  resume: ResumeReducer,
});

export default rootReducer;
