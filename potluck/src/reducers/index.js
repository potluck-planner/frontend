import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import fetchDataReducer from "./fetchDataReducer";
import signUpReducer from "./signUpReducer";

const eventReducer = combineReducers({
  loginReducer,
  fetchDataReducer,
  signUpReducer
});

export default eventReducer;
