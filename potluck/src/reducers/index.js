import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import fetchDataReducer from "./fetchDataReducer";
import singleEventReducer from "./singleEventReducer";

const eventReducer = combineReducers({
	loginReducer,
	fetchDataReducer,
	singleEventReducer
});

export default eventReducer;
