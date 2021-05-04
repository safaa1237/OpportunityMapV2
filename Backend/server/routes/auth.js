const express = require("express");
const router = express.Router();
const auth = require("../../service/auth");

router.post("/", async (req, res) => {
  let result = await auth.authentification(req.body.user, req.body.password);
  console.log(result);
  res.status(200).send(result);
});

router.get("/", async (req, res) => {
  console.log("working");
  res.send("hello");
});

module.exports = router;
