const express = require("express");
const router = express.Router();

// Import models
const Mood = require("../models/Mood");

router.post("/mood/create", async (req, res) => {
  const { icon, title, needs, breathe } = req.body; //destructuring

  const iconCheck = await Mood.findOne({ icon: icon });
  const titleCheck = await Mood.findOne({ title: title });

  if (icon && title && needs && (breathe === true || breathe === false)) {
    if (iconCheck) {
      res.json("Icon already exists");
    } else if (titleCheck) {
      res.json("Title already exists");
    } else {
      const newMood = new Mood({
        icon: icon,
        title: title,
        needs: needs,
        breathe: breathe,
      });
      await newMood.save();
      res.json("Saved!");
    }
  } else {
    res.json("All fields are required"); // message d'erreur si tous les champs sont pas rempli
  }
});

router.get("/moods", async (req, res) => {
  const getMoods = await Mood.find();
  res.json(getMoods);
});

module.exports = router;
