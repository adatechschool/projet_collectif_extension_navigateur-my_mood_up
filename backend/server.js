const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

//import models
const User = require("./models/User");

//import routes
const userRoutes = require("./routes/user");
app.use(userRoutes);

mongoose
  .set("strictQuery", false)
  .connect("mongodb://localhost/my_mood_up")
  .then(() => console.log("Connected to the DB!"));

app.listen(8080, () => {
  console.log("server has started");
});
