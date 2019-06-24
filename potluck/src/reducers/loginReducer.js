import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions";

const initialState = {
  users: [],
  loggingIn: false,
  fetchingEvents: false,
  error: null,
  isLoggedIn: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        error: null,
        loggingIn: true,
        isLoggedIn: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        error: null,
        isLoggedIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default loginReducer;
