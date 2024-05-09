const token = localStorage.getItem("token");
export const foodStorageGet = () => {
  return fetch("http://localhost:3001/foodstoragequantity/me", {
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
    `http://localhost:3001/foodstoragequantity/me/${productName}?quantity=${quantity}`,
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
    `http://localhost:3001/foodstoragequantity/me?productName=${productName}`,
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
