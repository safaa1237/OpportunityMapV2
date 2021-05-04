import http from "./httpServices";

export const getAccountsFromApi = (USER_TOKEN) => {
  const AuthStr = "Bearer ".concat(USER_TOKEN);
  return http.get("http://localhost:3000/api/accounts", {
    headers: { Authorization: AuthStr },
  });
};
