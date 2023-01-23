const express = require("express");

const router = express.Router();

//import models
const Mood = require("../models/Mood");

router.post("/mood/create", async (req, res) => {
  const { icon, title, needs, breathe } = req.body;

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
    res.json("All fields are required");
  }
});

router.get("/moods", async (req, res) => {
  const getMoods = await Mood.find();
  res.json(getMoods);
});

router.put("/mood/update/:id", async (req, res) => {
  const moodToModify = await Mood.findById(req.params.id);

  if (req.body.icon) {
    moodToModify.icon = req.body.icon;
  }
  if (req.body.title) {
    moodToModify.title = req.body.title;
  }
  if (req.body.needs) {
    moodToModify.needs = req.body.needs;
  }
  if (moodToModify) {
    await moodToModify.save();
    res.json("Successfully modified!");
  } else {
    res.json("Id not found!");
  }
});

module.exports = router;
