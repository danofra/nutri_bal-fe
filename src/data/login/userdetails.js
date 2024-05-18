const token = localStorage.getItem("token");
export const userDetailsGet = () => {
  return fetch("http://localhost:3001/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
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
