const express = require("express");
const feiras = require("../models/feiras");

const router = express.Router();

// Rota para listar feiras
router.get("/", (req, res) => {
  res.json(feiras);
});

module.exports = router;
