const token = localStorage.getItem("token");
import { baseURL } from "./login";
export const productsGet = () => {
  return fetch(baseURL + `product`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the meals!");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw new Error(error.message);
    });
};
