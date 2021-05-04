const axios = require("axios");

module.exports.getAccounts = async function (USER_TOKEN) {
  const AuthStr = "Bearer ".concat(USER_TOKEN);

  let response = await axios.get(
    "https://test-90.mycrmspace.de/rest/v11_8/Accounts",
    { headers: { Authorization: AuthStr } }
  );

  let data = response.data;
  console.log(data);
  return data;
};
