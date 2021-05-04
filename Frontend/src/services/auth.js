import http from "./httpServices";

export const authentification = async (USER_TOKEN) => {
  const AuthStr = "Bearer ".concat(USER_TOKEN);

  let response = await http.get("http://localhost:3000/api/auth", {
    headers: { Authorization: AuthStr },
  });

  let data = response.data;
  console.log(data);
  return data;
};
