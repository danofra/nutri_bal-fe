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

export const foodStoragePatch = (foodStorage) => {
  return fetch("http://localhost:3001/foodstorage/me", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(foodStorage),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error during the update of the food storage!");
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const foodStorageDelete = (productId) => {
  return fetch(
    `http://localhost:3001/foodstoragequantity/me?productId=${productId}`,
    {
      method: "DELETE",
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
        return response.json().then((data) => {
          throw new Error(
            `Error ${response.status}: ${
              data.message || "Error during the deletion of the food storage!"
            }`
          );
        });
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
