import { axiosWithAuth } from "../util/axiosWithAuth";
import axios from "axios";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = (creds, history) => dispatch => {
  dispatch({ type: LOGIN_START });
  return (
    axiosWithAuth()
      .post("https://potlucker-planner.herokuapp.com/users/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        dispatch({ type: LOGIN_SUCCESS });
      })
      // .then(() => history.push(`/users`))
      .catch(err => console.log(err.response))
  );
};

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const signUp = user => dispatch => {
  dispatch({ type: REGISTER_START });
  axios
    .post(URL, user)
    .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: REGISTER_FAILURE, payload: err.response }));
};

export const FETCH_EVENT_START = "FETCH_EVENT_START";
export const FETCH_EVENT_SUCCESS = "FETCH_EVENT_SUCCESS";
export const FETCH_EVENT_FAILURE = "FETCH_EVENT_FAILURE";
export const getEvents = URL => dispatch => {
  dispatch({ type: FETCH_EVENT_START });
  axiosWithAuth()
    .get(URL)
    .then(res => {
      dispatch({ type: FETCH_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_EVENT_FAILURE, payload: err.response });
    });
};

export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAIL = "ADD_EVENT_FAIL";
export const addEvent = (URL, event) => dispatch => {
  axiosWithAuth()
    .post(URL, event)
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
