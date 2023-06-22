let express = require("express");
let cors = require("cors");
let axios = require("axios");
require("dotenv").config();
let apiId = process.env.apiId;

let getWeather = async (location) => {
  //   console.log(apiId, "nnnnnnnnnnn", location);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiId}&units=metric`;

  let { data } = await axios.get(url);

  try {
    // let data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

let app = express();
app.use(cors());

app.get("/", async (req, res) => {
  let { city } = req.query;
  //   console.log(city);
  try {
    let data = await getWeather(city);

    // console.log(data);
    res.send(data);
  } catch (e) {
    // console.log(e.message);
    res.send({ status: "NOTOK", data: e.message });
  }
});

app.listen(8080, () => {
  console.log("working................");
});
