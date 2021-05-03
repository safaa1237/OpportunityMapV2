const express = require("express");
const auth = require("./routes/auth");
const accounts = require("./routes/accounts");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/accounts", accounts);
};
