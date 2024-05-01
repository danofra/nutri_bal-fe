export const ADD_TO_FOODITEM = "ADD_TO_FOODITEM";
export const REMOVE_TO_FOODITEM = "REMOVE_TO_FOODITEM";
export const UPDATE_FOODITEM = "UPDATE_FOODITEM";

export const addToFooditem = (element) => {
  return { type: ADD_TO_FOODITEM, payload: element };
};
export const removeToFooditem = (element) => {
  return { type: REMOVE_TO_FOODITEM, payload: element };
};
export const updateFooditem = (updatedFooditemItems) => {
  return { type: UPDATE_FOODITEM, payload: updatedFooditemItems };
};
