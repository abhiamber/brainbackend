require("dotenv").config();
const connect = require("./config/db");
const express = require("express");
const PORT = process.env.PORT || 8080;
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("working fine................");
});
let prodRoute = require("./routes/prod.routes");

app.use("/prod", prodRoute);

app.listen(PORT, async (req, res) => {
  await connect();
  console.log("working");
});
