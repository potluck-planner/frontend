import {
	FETCH_SINGLE_EVENT_START,
	FETCH_SINGLE_EVENT_SUCCESS,
	FETCH_SINGLE_EVENT_FAILURE,
	UPDATE_EVENT_INFO_START,
	UPDATE_EVENT_INFO_SUCCESS,
	UPDATE_EVENT_INFO_FAIL,
	UPDATE_EVENT_LOCATION_START,
	UPDATE_EVENT_LOCATION_SUCCESS,
	UPDATE_EVENT_LOCATION_FAIL
} from "../actions";

const initialState = {
	singleEvent: {},
	fetchingSingleEvent: false,
	updatingEventInfo: false,
	updatingEventLocation: false,
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
		case UPDATE_EVENT_INFO_START:
			return {
				...state,
				error: null,
				updatingEventInfo: true
			};
		case UPDATE_EVENT_INFO_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				updatingEventInfo: false,
				error: null
			};
		case UPDATE_EVENT_INFO_FAIL:
			return {
				...state,
				updatingEventInfo: false,
				error: action.payload
			};
		case UPDATE_EVENT_LOCATION_START:
			return {
				...state,
				error: null,
				updatingEventLocation: true
			};
		case UPDATE_EVENT_LOCATION_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				updatingEventLocation: false,
				error: null
			};
		case UPDATE_EVENT_LOCATION_FAIL:
			return {
				...state,
				updatingEventLocation: false,
				error: action.payload
			};

		default:
			return state;
	}
};

export default singleEventReducer;
