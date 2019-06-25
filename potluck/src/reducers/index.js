import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import fetchDataReducer from "./fetchDataReducer";
import signUpReducer from "./signUpReducer";

import singleEventReducer from "./singleEventReducer";

const eventReducer = combineReducers({
	loginReducer,
	fetchDataReducer,
  signUpReducer,
	singleEventReducer
});

export default eventReducer;
