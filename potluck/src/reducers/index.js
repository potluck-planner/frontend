import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import fetchDataReducer from "./fetchDataReducer";

const eventReducer = combineReducers({
  loginReducer,
  fetchDataReducer
});

export default eventReducer;
