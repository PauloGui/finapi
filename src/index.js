const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
});

app.listen(3333);
