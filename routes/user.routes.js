const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const app = express.Router();
const UserModel = require("../models/user.model");

app.post("/signup", async (req, res) => {
  const { name, email, password, pic, isAdmin } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.send({ message: "user exists" });
  }

  const hash = await argon2.hash(password);

  try {
    let newUser = new UserModel({
      name,
      email,
      password: hash,
    });

    await newUser.save();

    return res.status(201).send(newUser);
  } catch (e) {
    return res.status(403).send(e.message);
  }
});

// ***************login**********************

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  console.log(user, password);
  let checkPassword = await argon2.verify(user.password, password);

  try {
    if (!checkPassword) {
      return res.send({ message: "Invalid Crediantialas" });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: "30 days" }
    );

    // console.log(token);
    return res
      .status(200)
      .send({ meassage: "login succees", token, status: "OK" });
  } catch (e) {
    return res.send({ messg: e.message, status: "NO" });
  }
});

module.exports = app;
