import { ADD_FOOD_START, ADD_FOOD_SUCCESS, ADD_FOOD_FAILURE } from "../actions";

const initialState = {
  food: [],
  error: null,
  addingFood: false
};

const addingFoodReducer = (state = initialState, action) => {
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
        food: [...state.food, action.payload],
        error: null,
        addingFood: false
      };
    case ADD_FOOD_FAILURE:
      return {
        ...state,
        addingFood: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default addingFoodReducer;
