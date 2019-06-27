import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE } from "../actions";

const initialState = {
	user: {},
	error: null,
	registering: false
};

const signUpReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_START:
			return {
				...state,
				registering: true,
				error: null
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				user: action.payload,
				registering: false,
				error: null
			};
		case REGISTER_FAILURE:
			return {
				...state,
				registering: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default signUpReducer;
