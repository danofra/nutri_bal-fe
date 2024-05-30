import { baseURL } from "./login";
export const singin = (
  name,
  surname,
  email,
  password,
  date_of_birth,
  gender,
  physical_activity,
  nationality,
  city_of_residence,
  robot
) => {
  return fetch(baseURL + "auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      surname,
      email,
      password,
      date_of_birth,
      gender,
      physical_activity,
      nationality,
      city_of_residence,
      robot,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((data) => {
          throw new Error(
            "Errore durante la registrazione!" + " " + data.message
          );
        });
      }
    })
    .then((data) => {
      name = data.name;
      surname = data.surname;
      email = data.email;
      password = data.password;
      date_of_birth = data.date_of_birth;
      gender = data.gender;
      physical_activity = data.physical_activity;
      nationality = data.nationality;
      city_of_residence = data.city_of_residence;
      robot = data.robot;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
