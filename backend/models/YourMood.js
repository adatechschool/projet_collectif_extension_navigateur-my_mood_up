const mongoose = require("mongoose");

const YourMood = mongoose.model("YourMoods", {
  moodId: {
    type: String,
  },
  date: {
    type: Date,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = YourMood;
