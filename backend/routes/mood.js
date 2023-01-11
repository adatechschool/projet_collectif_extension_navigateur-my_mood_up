const express = require("express");
const router = express.Router(); 
const Mood = require("../models/Mood");

router.post("/mood/create", async (req, res) => {
   const newMood = new Mood({
    icon: req.body.icon,
    title: req.body.title,
    needs: req.body.needs,
    breathe: req.body.breathe,
   })
await newMood.save(); 
res.json("Saved!");
})


module.exports = router; 