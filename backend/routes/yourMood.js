const express = require("express");
const router = express.Router();

//import models
const YourMood = require("../models/YourMood");

//import middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/yourmood/create", isAuthenticated, async (req, res) => {
  const { moodId } = req.body;
  const date = new Date();
  // const moodId = document.querySelector(".menu li").getAttribute("data-moodId");
  const newYourMood = new YourMood({
    moodId: moodId,
    date: date,
    owner: req.user,
  });

  await newYourMood.save();
  res.json("saved");
});

router.get("/yourmood/:id", isAuthenticated, async (req, res) => {
  try {
    const getYourMood = await YourMood.find({ owner: req.params.id });
    // const getYourMood = await YourMood.findById(req.params.id);
    console.log(getYourMood);
    res.json(getYourMood);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
