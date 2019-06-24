import { axiosWithAuth } from "../util/axiosWithAuth";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axiosWithAuth()
    .post("https://potlucker-planner.herokuapp.com/users/login", creds)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({ type: LOGIN_SUCCESS });
      return true;
    })
    .catch(err => console.log(err.response));
};

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const getData = URL => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  axiosWithAuth()
    .get(URL)
    .then(res => {
      dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_DATA_FAILURE, payload: err.response.data.error });
    });
};

export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAIL = "ADD_EVENT_FAIL";
export const addEvent = URL => dispatch => {
  axiosWithAuth()
    // .post(URL, event)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: ADD_EVENT_FAIL, payload: err.response });
    });
};

export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAIL = "DELETE_EVENT_FAIL";
export const deleteEvent = id => dispatch => {
  axiosWithAuth()
    .delete(URL)
    .then(res => {
      console.log(res.data);
      dispatch({ type: DELETE_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: DELETE_EVENT_FAIL, payload: err.response });
    });
};

export const UPDATE_EVENT_START = "UPDATE_EVENT_START";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAIL = "UPDATE_EVENT_FAIL";
export const updateEvent = (id, updatedEvent) => dispatch => {
  dispatch({ type: UPDATE_EVENT_START });
  axiosWithAuth()
    .put(URL, updatedEvent)
    .then(res => {
      console.log(res.data);
      dispatch({ type: UPDATE_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: UPDATE_EVENT_FAIL, payload: err.response });
    });
};
