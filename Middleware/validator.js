let jwt = require("jsonwebtoken");
require("dotenv").config();
const validator = (req, res, next) => {
  let token = req.headers.token;
  // console.log(token, " m ");
  token = jwt.verify(token, process.env.TOKEN_KEY);
  if (token) {
    next();
  } else {
    res.send({ messg: "Please Login to continue", status: "NO" });
  }
};
module.exports = validator;
