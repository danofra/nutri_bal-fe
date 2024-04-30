export const ADD_TO_FOODSTORAGE = "ADD_TO_FOODSTORAGE";
export const REMOVE_TO_FOODSTORAGE = "REMOVE_TO_FOODSTORAGE";
export const UPDATE_FOODSTORAGE = "UPDATE_FOODSTORAGE";

export const addToFoodstorage = (element) => {
  return { type: ADD_TO_FOODSTORAGE, payload: element };
};

export const removeToFoodstorage = (element) => {
  return { type: REMOVE_TO_FOODSTORAGE, payload: element };
};
export const updateFoodstorage = (updatedFoodstorageItems) => {
  return { type: UPDATE_FOODSTORAGE, payload: updatedFoodstorageItems };
};
