const axios = require("axios");

module.exports.authentification = async function (user, password) {
  payload = {
    grant_type: "password",
    client_id: "sugar",
    client_secret: "",
    username: user,
    password: password,
    platform: "base",
  };
  let response = await axios.post(
    "https://test-90.mycrmspace.de/rest/v11_8/oauth2/token",
    payload
  );
  let USER_TOKEN = response.data;
  return USER_TOKEN;
};
