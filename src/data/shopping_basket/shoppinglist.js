const token = localStorage.getItem("token");
export const newGroceryShoppingPost = () => {
  return fetch("http://localhost:3001/groceryshopping/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the food storage!");
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const groceryShoppingGet = () => {
  return fetch("http://localhost:3001/groceryshoppingquantity/me", {
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
    `http://localhost:3001/groceryshoppingquantity/me?quantity=${quantity}&productName=${productName}`,
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
    `http://localhost:3001/groceryshoppingquantity/me/${productName}?quantity=${quantity}`,
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
    `http://localhost:3001/groceryshoppingquantity/me?productName=${productName}`,
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
    `http://localhost:3001/foodstoragequantity/me?quantity=${quantity}&productName=${productName}`,
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
