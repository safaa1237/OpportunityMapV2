const https = require("https");

module.exports.getAccounts = function (jwt) {
  const options = {
    hostname: "test-90.mycrmspace.de",
    port: 443,
    path: "/rest/v11_8/Accounts",
    method: "GET",
    headers: {
      Authorization: "Bearer" + jwt,
      "Content-Type": "application/json",
    },
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      return d;
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};
