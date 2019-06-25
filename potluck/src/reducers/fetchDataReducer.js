import {
	FETCH_EVENT_START,
	FETCH_EVENT_SUCCESS,
	FETCH_EVENT_FAILURE
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
		default:
			return state;
	}
};

export default fetchDataReducer;
