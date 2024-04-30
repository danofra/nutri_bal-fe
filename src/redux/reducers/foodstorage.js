import {
  ADD_TO_FOODSTORAGE,
  REMOVE_TO_FOODSTORAGE,
  UPDATE_FOODSTORAGE,
} from "../actions/index";

const initialState = {
  content: [],
};

const manReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FOODSTORAGE:
      return {
        ...state,
        content: [...state.content, action.payload],
      };
    case REMOVE_TO_FOODSTORAGE:
      return {
        ...state,
        content: state.content.filter(
          (element) => element.name !== action.payload.name
        ),
      };
    case UPDATE_FOODSTORAGE:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default manReducer;
