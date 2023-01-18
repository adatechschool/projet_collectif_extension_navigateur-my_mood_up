const mongoose = require("mongoose");

// const YourMood = mongoose.model('YourMoods', {
//   icon: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   title: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   needs: String,
//   breathe: Boolean,
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
// });

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
