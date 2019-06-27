import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import fetchDataReducer from "./fetchDataReducer";
import signUpReducer from "./signUpReducer";
import guestReducer from "./guestReducer";
import fetchUsers from "./fetchUsers";
import singleEventReducer from "./singleEventReducer";
import foodReducer from "./foodReducer";

const eventReducer = combineReducers({
	foodReducer,
	fetchDataReducer,
	fetchUsers,
	guestReducer,
	loginReducer,
	signUpReducer,
	singleEventReducer
});

export default eventReducer;
