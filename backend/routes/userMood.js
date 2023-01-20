const express = require("express");
const router = express.Router();

//import models
const UserMood = require("../models/UserMood");

//import middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/usermood/create", isAuthenticated, async (req, res) => {
  const { moodId, date } = req.body;
  const newUserMood = new UserMood({
    moodId: moodId,
    date: date,
    owner: req.user,
  });

  await newUserMood.save();
  res.json("saved");
});

router.get("/usermoods", isAuthenticated, async (req, res) => {
  try {
    const getUserMoods = await UserMood.find();
    res.json(getUserMoods);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
