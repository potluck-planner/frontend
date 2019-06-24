import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from "../actions";

const initialState = {
  users: [],
  loggingIn: false,
  fetchingEvents: false,
  error: null
};

const fetchDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        error: null,
        fetchingEvents: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingEvents: false,
        users: action.payload,
        error: null
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        fetchingEvents: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchDataReducer;
