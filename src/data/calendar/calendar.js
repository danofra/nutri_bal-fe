const token = localStorage.getItem("token");

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
