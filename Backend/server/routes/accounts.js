const express = require("express");
const router = express.Router();
const accounts = require("../../service/accounts");

router.get("/", async (req, res) => {
  try {
    const result = await accounts.getAccounts(req.body.jwt);
    return res.status(200).send(result);
  } catch {
    return res.status(400).send("something went wrong");
  }
});

module.exports = router;
