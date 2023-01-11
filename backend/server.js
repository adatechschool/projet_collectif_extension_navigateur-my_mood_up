const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

//import models
const User = require("./models/User");
const Mood = require("./models/Mood");

//import routes
const userRoutes = require("./routes/user");
app.use(userRoutes);
const moodRoutes = require("./routes/mood");
app.use(moodRoutes);

mongoose
  .set("strictQuery", false)
  .connect("mongodb://localhost/my_mood_up")
  .then(() => console.log("Connected to the DB!"));

app.listen(8080, () => {
  console.log("server has started");
});
