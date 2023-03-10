const mongoose = require("mongoose");

const User = mongoose.model("Users", {
  username: {
    required: true,
    type: String,
  },
  email: {
    unique: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
