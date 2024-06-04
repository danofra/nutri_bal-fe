import { baseURL } from "../login/login";
export const recipesPost = (
  image,
  name,
  difficulty,
  preparationtime,
  cooking,
  doses,
  cost,
  note,
  preparation
) => {
  return fetch(baseURL + "recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image,
      name,
      difficulty,
      preparationtime,
      cooking,
      doses,
      cost,
      note,
      preparation,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((data) => {
          throw new Error(
            "Errore durante l'aggiunta della ricetta!" + " " + data.message
          );
        });
      }
    })
    .then((data) => {
      image = data.image;
      name = data.name;
      difficulty = data.difficulty;
      preparationtime = data.preparationtime;
      cooking = data.cooking;
      doses = data.doses;
      cost = data.cost;
      note = data.note;
      preparation = data.preparation;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
