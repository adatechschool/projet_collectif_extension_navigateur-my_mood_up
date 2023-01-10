const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-Base64");

router.post("/user/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const mailCheck = await User.findOne({ email: email });
    const userCheck = await User.findOne({ username: username });

    if (userCheck) {
      res.status(409).json("Username already exists");
    } else {
      if (mailCheck) {
        res.status(409).json("Email already exists");
      } else {
        if (username && password && email) {
          const token = uid2(64);
          const salt = uid2(16);
          const hash = SHA256(password + salt).toString(encBase64);

          const newUser = new User({
            username: username,
            email: email,
            token: token,
            hash: hash,
            salt: salt,
          });
          await newUser.save();
          res.json("Your account has been created successfully");
        } else {
          res.status(400).json("All fields are required");
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const hashCheck = SHA256(req.body.password + user.salt).toString(
        encBase64
      );
      if (hashCheck === user.hash) {
        res.json("You have successfully logged in!");
      } else {
        res.status(400).json("Unauthorized");
      }
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.log(error.message);
  }
});
