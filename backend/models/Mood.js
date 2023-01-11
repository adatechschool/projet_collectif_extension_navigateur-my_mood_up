const mongoose = require("mongoose");

const Mood = mongoose.model("Moods", {
  icon: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  needs: String,
  breathe: Boolean,
});

module.exports = Mood;
