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

app.get("/statement/:cpf", (req, res) => {
  const { cpf } = req.params;

  const custumer = custumer.find((custumer) => custumer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({ error: "Custumer not found" });
  }

  return res.customer.json(custumer.statement);
});

app.listen(3333);
