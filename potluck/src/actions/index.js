import { axiosWithAuth } from "../util/axiosWithAuth";
import axios from "axios";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axiosWithAuth()
    .post("https://potlucker-planner.herokuapp.com/users/login", creds)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    })
    .catch(err => console.log(err.response));
};

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const signUp = (URL, user) => dispatch => {
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
  return axiosWithAuth()
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
export const deleteEvent = URL => dispatch => {
  axiosWithAuth()
    .delete(URL)
    .then(res => {
      console.log(res);
      dispatch({ type: DELETE_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: DELETE_EVENT_FAIL, payload: err.response });
    });
};

export const FETCH_SINGLE_EVENT_START = "FETCH_SINGLE_EVENT_START";
export const FETCH_SINGLE_EVENT_SUCCESS = "FETCH_SINGLE_EVENT_SUCCESS";
export const FETCH_SINGLE_EVENT_FAILURE = "FETCH_SINGLE_EVENT_FAILURE";
export const getSingleEvent = URL => dispatch => {
  dispatch({ type: FETCH_SINGLE_EVENT_START });
  axiosWithAuth()
    .get(URL)
    .then(res => {
      dispatch({ type: FETCH_SINGLE_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_SINGLE_EVENT_FAILURE, payload: err.response });
    });
};

export const UPDATE_EVENT_INFO_START = "UPDATE_EVENT_INFO_START";
export const UPDATE_EVENT_INFO_SUCCESS = "UPDATE_EVENT_INFO_SUCCESS";
export const UPDATE_EVENT_INFO_FAIL = "UPDATE_EVENT_INFO_FAIL";
export const updateEventInfo = (URL, updatedEventInfo) => dispatch => {
  dispatch({ type: UPDATE_EVENT_INFO_START });
  return axiosWithAuth()
    .put(URL, updatedEventInfo)
    .then(res => {
      console.log(res.data);
      dispatch({ type: UPDATE_EVENT_INFO_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: UPDATE_EVENT_INFO_FAIL, payload: err.response });
    });
};

export const UPDATE_EVENT_LOCATION_START = "UPDATE_EVENT_LOCATION_START";
export const UPDATE_EVENT_LOCATION_SUCCESS = "UPDATE_EVENT_LOCATION_SUCCESS";
export const UPDATE_EVENT_LOCATION_FAIL = "UPDATE_EVENT_LOCATION_FAIL";
export const updateEventLocation = (URL, updatedEventLocation) => dispatch => {
  dispatch({ type: UPDATE_EVENT_LOCATION_START });
  return axiosWithAuth()
    .put(URL, updatedEventLocation)
    .then(res => {
      console.log(res.data);
      dispatch({ type: UPDATE_EVENT_LOCATION_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: UPDATE_EVENT_LOCATION_FAIL, payload: err.response });
    });
};

export const ADD_GUEST_SUCCESS = "ADD_GUEST_SUCCESS";
export const ADD_GUEST_FAIL = "ADD_GUEST_FAIL";
export const addGuest = (URL, guest) => dispatch => {
  return axiosWithAuth()
    .post(URL, guest)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_GUEST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: ADD_GUEST_FAIL, payload: err.response });
    });
};

export const DELETE_GUEST_SUCCESS = "DELETE_GUEST_SUCCESS";
export const DELETE_GUEST_FAIL = "DELETE_GUEST_FAIL";
export const deleteGuest = (eventID, username) => dispatch => {
  return axiosWithAuth()
    .delete(eventID, username)
    .then(res => {
      console.log(res);
      dispatch({ type: DELETE_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: DELETE_EVENT_FAIL, payload: err.response });
    });
};

export const UPDATE_GUEST_START = "UPDATE_GUEST_START";
export const UPDATE_GUEST_SUCCESS = "UPDATE_GUEST_SUCCESS";
export const UPDATE_GUEST_FAIL = "UPDATE_GUEST_FAIL";
export const updateGuest = (URL, username) => dispatch => {
  dispatch({ type: UPDATE_GUEST_START });
  return axiosWithAuth()
    .put(URL, username)
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_GUEST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: UPDATE_GUEST_FAIL, payload: err.response });
    });
};

const ADD_FOOD_START = "ADD_FOOD_START";
const ADD_FOOD_SUCCESS = "ADD_FOOD_SUCCESS";
const ADD_FOOD_FAILURE = "ADD_FOOD_FAILURE";
export const addFood = (URL, food) => dispatch => {
  dispatch({ type: ADD_FOOD_START });
  return axiosWithAuth()
    .post(URL, food)
    .then(res => {
      dispatch({ type: ADD_FOOD_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: ADD_FOOD_FAILURE });
    });
};
