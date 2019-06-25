import {
	FETCH_SINGLE_EVENT_START,
	FETCH_SINGLE_EVENT_SUCCESS,
	FETCH_SINGLE_EVENT_FAILURE
} from "../actions";

const initialState = {
	singleEvent: {},
	fetchingSingleEvent: false,
	error: null
};

const singleEventReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SINGLE_EVENT_START:
			return {
				...state,
				error: null,
				fetchingSingleEvent: true
			};
		case FETCH_SINGLE_EVENT_SUCCESS:
			return {
				...state,
				fetchingSingleEvent: false,
				singleEvent: action.payload,
				error: null
			};
		case FETCH_SINGLE_EVENT_FAILURE:
			return {
				...state,
				fetchingSingleEvent: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default singleEventReducer;
