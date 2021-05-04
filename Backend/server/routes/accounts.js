const express = require("express");
const router = express.Router();
const accounts = require("../../service/accounts");

router.put("/", async (req, res) => {
  try {
    const result = await accounts.getAccounts(req.body.jwt);
    res.json({
      success: true,
      payload: result,
    });
  } catch {
    res.status(400).json({
      success: false,
      error: "something went wrong...",
    });
  }
});

module.exports = router;
