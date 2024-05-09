const token = localStorage.getItem("token");
export const groceryShoppingGet = () => {
  return fetch("http://localhost:3001/groceryshoppingquantity/me", {
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
        throw new Error("Error during the loading of the grocery shopping!");
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
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error during the loading of the grocery shopping!");
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

