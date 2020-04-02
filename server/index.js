require("dotenv").config();
const express = require("express");
const massive = require("massive");
const IC = require("./controller/projectController");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(db => {
    console.log("Data Base Connected 😀 😁 😂");
    app.set("db", db);
  })
  .catch(error => console.log(error));

app.post("/api/products", IC.create);
app.get("/api/products", IC.getAll);
app.get("/api/products/:id", IC.getOne);
app.put("/api/products/:id", IC.update);
app.delete("/api/products/:id", IC.delete);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
