const mongoose = require("mongoose");

const Mood = mongoose.model("Moods", {
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    unique: true,
  },
  needs: String,
  breathe: Boolean,
});

module.exports = Mood;
