const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const custumerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (custumerAlreadyExists) {
    return res.status(400).json({ error: "Custumer already exists." });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send("sucess");
});

app.listen(3333);
