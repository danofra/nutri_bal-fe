import { newGroceryShoppingPost } from "../shopping_basket/shoppinglist";
import { newFoodStoragePost } from "../shopping_basket/foodStorage";

export const login = (email, password) => {
  return fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((data) => {
          throw new Error(data.message);
        });
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.accessToken);
      newGroceryShoppingPost();
      newFoodStoragePost();
    })
    .catch((error) => {
      throw new Error(error);
    });
};
