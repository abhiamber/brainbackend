let express = require("express");
let ProdModel = require("../models/prod.model");

let app = express.Router();

app.get("/", async (req, res) => {
  try {
    let prod = await ProdModel.find();
    // console.log(prod);
    res.status(200).send(prod);
  } catch (e) {
    res.send({ messg: e.message });
  }
});

module.exports = app;
