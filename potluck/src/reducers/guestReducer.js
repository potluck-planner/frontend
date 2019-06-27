import {
	ADD_GUEST_SUCCESS,
	ADD_GUEST_FAIL,
	DELETE_GUEST_SUCCESS,
	DELETE_GUEST_FAIL
} from "../actions";

const initialState = {
	fetchingGuests: false,
	error: null
};

const guestReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_GUEST_SUCCESS:
			return {
				...state,
				error: null
			};
		case ADD_GUEST_FAIL:
			return {
				...state,
				error: action.payload
			};
		case DELETE_GUEST_SUCCESS:
			return {
				...state,
				error: null
			};
		case DELETE_GUEST_FAIL:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

export default guestReducer;
