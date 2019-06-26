import {
	ADD_GUEST_SUCCESS,
	ADD_GUEST_FAIL,
	DELETE_GUEST_SUCCESS,
	DELETE_GUEST_FAIL
} from "../actions";

const initialState = {
	guests: [],
	fetchingGuests: false,
	error: null
};

const guestReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_GUEST_SUCCESS:
			return {
				...state,
				// organizer is still not immediately loading
				guests: [...state.guests, action.payload.guest],
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
				guests: [...state.guests].filter(
					guest => guest.guest_id !== action.payload.Oldguest.guest_id
				),
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
