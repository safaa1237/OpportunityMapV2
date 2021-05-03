const https = require("https");

module.exports.authentification = function (user, password) {
  const data = JSON.stringify({
    grant_type: "password",
    client_id: "sugar",
    client_secret: "",
    username: user,
    password: password,
    platform: "base",
  });

  const options = {
    hostname: "test-90.mycrmspace.de",
    port: 443,
    path: "/rest/v11_8/oauth2/token",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
};
