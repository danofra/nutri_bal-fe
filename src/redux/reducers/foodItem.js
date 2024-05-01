import {
  ADD_TO_FOODITEM,
  REMOVE_TO_FOODITEM,
  UPDATE_FOODITEM,
} from "../actions/index";

const initialState = {
  content: [],
};

const manReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FOODITEM:
      return {
        ...state,
        content: [...state.content, action.payload],
      };
    case REMOVE_TO_FOODITEM:
      return {
        ...state,
        content: state.content.filter(
          (element) => element.name !== action.payload.name
        ),
      };
    case UPDATE_FOODITEM:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default manReducer;
