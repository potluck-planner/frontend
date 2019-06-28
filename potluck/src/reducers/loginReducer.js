import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions";
import jsonwebtoken from "jsonwebtoken";

const initialState = {
  loggingIn: false,
  error: null,
  activeUser: jsonwebtoken.decode(localStorage.getItem("token"))
    ? jsonwebtoken.decode(localStorage.getItem("token"))
    : null
};

// jsonwebtoken decodes the payload token to determine who the active user is

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        error: null,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        error: null,
        activeUser: jsonwebtoken.decode(action.payload)
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload,
        activeUser: null
      };
    default:
      return state;
  }
};

export default loginReducer;
