const token = localStorage.getItem("token");
export const userDetailsGet = () => {
  return fetch(
    "http://localhost:3001/user/me",
    "https://nutri-bal.vercel.app/user/me",
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
        throw new Error("Error during the loading of the user details!");
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const userDetailsPut = (
  name,
  surname,
  email,
  password,
  date_of_birth,
  gender,
  physical_activity,
  nationality,
  city_of_residence
) => {
  const token = localStorage.getItem("token");
  const userDataObject = {
    name,
    surname,
    email,
    date_of_birth,
    gender,
    physical_activity,
    nationality,
    city_of_residence,
  };
  if (password) {
    userDataObject.password = password;
  }
  return fetch("http://localhost:3001/user/me", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDataObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the user details!");
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const userDetailsDelete = () => {
  return fetch("http://localhost:3001/user/me", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the user details!");
      } else {
        return;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const userDetailsUploadImage = (formData) => {
  return fetch("http://localhost:3001/user/me/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error during the loading of the user details!");
      } else {
        return;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
