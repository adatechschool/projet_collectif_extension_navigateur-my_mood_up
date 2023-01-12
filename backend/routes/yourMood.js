const express = require("express");
const router = express.Router();

//import models
const YourMood = require("../models/YourMood");

//import middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/yourmood/create", isAuthenticated, async (req, res) => {
  const { icon, title, needs, breathe } = req.body;
  const newYourMood = new YourMood({
    icon: icon,
    title: title,
    needs: needs,
    breathe: breathe,
    owner: req.user,
  });

  await newYourMood.save();
  res.json("saved");
});

module.exports = router;
