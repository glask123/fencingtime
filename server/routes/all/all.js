const express = require("express");
const router = express.Router();

router.use("/:tournamentid", (req, res, next) => {});

router.get("/:tournamentid/seeding/:round", (req, res) => {
  if (req.params.round == "1") {
  } else {
  }
});

module.exports = router;
