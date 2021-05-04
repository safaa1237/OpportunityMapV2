const express = require("express");
const router = express.Router();
const auth = require("../../service/auth");

router.post("/", async (req, res) => {
  try {
    let result = await auth.authentification(req.body.user, req.body.password);
    let token = result.access_token;
    res.json({
      success: true,
      payload: token,
    });
  } catch {
    res.status(400).json({
      success: false,
      error: "something went wrong...",
    });
  }
});

router.get("/", async (req, res) => {
  console.log("working");
  res.send("hello");
});

module.exports = router;
