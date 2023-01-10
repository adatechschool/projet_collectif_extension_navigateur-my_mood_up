const mongoose = require("mongoose");

const User = mongoose.model("Users", {
  username: {
    required: true,
    unique: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
