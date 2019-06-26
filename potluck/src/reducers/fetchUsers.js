import {
	FETCH_USERS_START,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE
} from "../actions";

const initialState = {
	allUsers: [],
	fetchingUsers: false,
	error: null
};

const fetchUsers = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_START:
			return {
				...state,
				error: null,
				fetchingUsers: true
			};
		case FETCH_USERS_SUCCESS:
			return {
				...state,
				fetchingUsers: false,
				allUsers: action.payload,
				error: null
			};
		case FETCH_USERS_FAILURE:
			return {
				...state,
				fetchingUsers: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default fetchUsers;
