const express = require("express");
const router = express.Router();
const accounts = require("../../service/accounts");

router.get("/", async (req, res) => {
  try {
    const result = accounts.getAccounts(jwt);
    console.log(jwt);
    res.status(200).send(result);
  } catch {
    return res.status(400).send("something went wrong");
  }
});

module.exports = router;
