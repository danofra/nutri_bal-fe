export const login = (email, password) => {
  return fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore durante l'accesso!");
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.accessToken);
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });
};
