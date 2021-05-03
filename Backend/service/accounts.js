const https = require("https");

const options = {
  hostname: "test-90.mycrmspace.de",
  port: 443,
  path: "/rest/v11_8/Accounts",
  method: "GET",
  headers: {
    Authorization: "Bearer 36f19148-31c9-49b1-956c-2054514bdd3f",
    "Content-Type": "application/json",
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

req.end();
