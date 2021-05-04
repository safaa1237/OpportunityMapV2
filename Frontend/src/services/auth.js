import http from "./httpServices";

export const authenticationFromApi = (user, password) => {
  return http.post("http://localhost:3000/api/auth", {
    user: user,
    password: password,
  });
};
