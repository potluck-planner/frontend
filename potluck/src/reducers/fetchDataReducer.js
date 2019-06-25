import {
	FETCH_EVENT_START,
	FETCH_EVENT_SUCCESS,
	FETCH_EVENT_FAILURE,
	ADD_EVENT_SUCCESS,
	ADD_EVENT_FAIL,
	DELETE_EVENT_SUCCESS,
	DELETE_EVENT_FAIL
	// UPDATE_EVENT_START,
	// UPDATE_EVENT_SUCCESS,
	// UPDATE_EVENT_FAIL
} from "../actions";

const initialState = {
	events: [],
	guests: [],
	food: [],
	fetchingEvents: false,
	error: null
};

const fetchDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_EVENT_START:
			return {
				...state,
				error: null,
				fetchingEvents: true
			};
		case FETCH_EVENT_SUCCESS:
			return {
				...state,
				fetchingEvents: false,
				events: action.payload,
				error: null
			};
		case FETCH_EVENT_FAILURE:
			return {
				...state,
				fetchingEvents: false,
				error: action.payload
			};
		case ADD_EVENT_SUCCESS:
			return {
				...state,
				// organizer is still not immediately loading
				events: [...state.events, action.payload.event],
				error: null
			};
		case ADD_EVENT_FAIL:
			return {
				...state,
				error: action.payload
			};
		case DELETE_EVENT_SUCCESS:
			return {
				...state,
				// Need to revisit this logic once endpoint is up and running
				events: [...state.events].filter(
					(event, index) => index !== action.index
				),
				error: null
			};
		case DELETE_EVENT_FAIL:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

export default fetchDataReducer;
