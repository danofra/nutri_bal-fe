const token = localStorage.getItem("token");
import { baseURL } from "./login";

export const newGroceryShoppingPost = (token) => {
  if (token && token.includes(".")) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return fetch(baseURL + "groceryshopping/me", {
      method: "POST",
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Errore durante il caricamento del carrello della spesa"
          );
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

export const groceryShoppingGet = () => {
  return fetch(baseURL + "groceryshoppingquantity/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the grocery shopping!");
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const groceryShoppingPost = (quantity, productName) => {
  return fetch(
    baseURL +
      `groceryshoppingquantity/me?quantity=${quantity}&productName=${productName}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the grocery shopping!");
      } else {
        return groceryShoppingGet();
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const groceryShoppingPut = (quantity, productName) => {
  return fetch(
    baseURL + `groceryshoppingquantity/me/${productName}?quantity=${quantity}`,
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
        throw new Error("Error during the loading of the grocery shopping!");
      } else {
        return groceryShoppingGet();
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const groceryShoppingDelete = (productName) => {
  return fetch(
    baseURL + `groceryshoppingquantity/me?productName=${productName}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.status === 204) {
        throw new Error("Error during the loading of the grocery shopping!");
      } else {
        return groceryShoppingGet();
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const foodStoragePost = (quantity, productName) => {
  return fetch(
    baseURL +
      `foodstoragequantity/me?quantity=${quantity}&productName=${productName}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the creation of the food storage!");
      } else {
        return groceryShoppingGet();
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};
