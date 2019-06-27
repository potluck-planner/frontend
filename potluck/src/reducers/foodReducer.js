import {
	ADD_FOOD_START,
	ADD_FOOD_SUCCESS,
	ADD_FOOD_FAILURE,
	DELETE_FOOD_START,
	DELETE_FOOD_SUCCESS,
	DELETE_FOOD_FAILURE,
	UPDATE_FOOD_START,
	UPDATE_FOOD_SUCCESS,
	UPDATE_FOOD_FAIL
} from "../actions";

const initialState = {
	error: null,
	addingFood: false,
	deletingFood: false,
	updatingFood: false
};

const foodReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FOOD_START:
			return {
				...state,
				addingFood: true,
				error: null
			};
		case ADD_FOOD_SUCCESS:
			return {
				...state,
				error: null,
				addingFood: false
			};
		case ADD_FOOD_FAILURE:
			return {
				...state,
				addingFood: false,
				error: action.payload
			};
		case DELETE_FOOD_START:
			return {
				...state,
				deletingFood: true,
				error: null
			};
		case DELETE_FOOD_SUCCESS:
			return {
				...state,
				error: null,
				deletingFood: false
			};
		case DELETE_FOOD_FAILURE:
			return {
				...state,
				deletingFood: false,
				error: action.payload
			};
		case UPDATE_FOOD_START:
			return {
				...state,
				updatingFood: true,
				error: null
			};
		case UPDATE_FOOD_SUCCESS:
			return {
				...state,
				error: null,
				updatingFood: false
			};
		case UPDATE_FOOD_FAIL:
			return {
				...state,
				updatingFood: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default foodReducer;
