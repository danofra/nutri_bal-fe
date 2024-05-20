const token = localStorage.getItem("token");
export const newMealsPost = (
  productName,
  quantity,
  unit_of_measure,
  type_meals,
  day,
  month,
  year
) => {
  return fetch("http://localhost:3001/mealsquantity/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      productName,
      quantity,
      unit_of_measure,
      type_meals,
      day,
      month,
      year
    ),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the meals!");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      productName = data.productName;
      quantity = data.quantity;
      unit_of_measure = data.unit_of_measure;
      type_meals = data.type_meals;
      day = data.day;
      month = data.month;
      year = data.year;
      console.log(data);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const mealsGet = (month, year) => {
  return fetch(
    `http://localhost:3001/mealsquantity/me?month=${month}&year=${year}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the meals!");
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const mealsPut = (mealsQuantityId, quantity, unitOfMeasure) => {
  return fetch(
    `http://localhost:3001/mealsquantity/me/${mealsQuantityId}?quantity=${quantity}&unitOfMeasure=${unitOfMeasure}`,
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
        throw new Error("Error during the loading of the meals!");
      } else {
        return;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const mealsDelete = (mealsQuantityId) => {
  return fetch(`http://localhost:3001/mealsquantity/me/${mealsQuantityId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the meals!");
      } else {
        return;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
