const express = require("express");
const router = express.Router();
const auth = require("../../service/auth");
var jwt = "";

router.post("/", async (req, res) => {
  try {
    const result = auth.authentification(req.body.user, req.body.password);
    jwt = result.access_token;
    console.log(jwt);
    res.status(200).send(result);
  } catch {
    console.log(req.body.password);
    return res.status(400).send("something went wrong");
  }
});

router.get("/", async (req, res) => {
  console.log("working");
  res.send("hello");
});

module.exports = router;
