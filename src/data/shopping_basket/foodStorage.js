const token = localStorage.getItem("token");
import { baseURL } from "../login/login";
export const newFoodStoragePost = (token) => {
  if (token && token.includes(".")) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return fetch(baseURL + "foodstorage/me", {
      method: "POST",
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il caricamento della dispensa");
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } else {
    console.error("Token non valido");
  }
};

export const foodStorageGet = () => {
  return fetch(baseURL + "foodstoragequantity/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error during the loading of the food storage!");
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const foodStoragePut = (quantity, productName) => {
  return fetch(
    baseURL + `foodstoragequantity/me/${productName}?quantity=${quantity}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the food storage!");
      } else {
        return foodStorageGet();
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const foodStorageDelete = (productName) => {
  return fetch(
    baseURL + `foodstoragequantity/me?productName=${productName}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the food storage!");
      } else {
        return foodStorageGet();
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
