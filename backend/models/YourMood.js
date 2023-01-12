const mongoose = require('mongoose');

const YourMood = mongoose.model('YourMoods', {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = YourMood;
