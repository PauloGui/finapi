const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const custumer = customers.find((custumer) => custumer.cpf === cpf);
  if (!custumer) {
    return res.status(400).json({ error: "Custumer not found" });
  }

  req.custumer = custumer;

  return next();
}

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

app.use(verifyIfExistsAccountCPF);

app.get("/statement", (req, res) => {
  const { custumer } = req;

  return res.json(custumer.statement);
});

app.listen(3333);
