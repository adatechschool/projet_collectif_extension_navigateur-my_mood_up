const mongoose = require("mongoose");

const YourMood = mongoose.model("YourMoods", {
  moodId: {
    type: String,
  },
  date: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = YourMood;
