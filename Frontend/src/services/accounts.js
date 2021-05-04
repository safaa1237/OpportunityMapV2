import http from "./httpServices";

export const getAccountsFromApi = (USER_TOKEN) => {
  return http.put("http://localhost:3000/api/accounts", {
    jwt: USER_TOKEN,
  });
};
