const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
var cors = require("cors");
app.use(cors());

//import routes
const userRoutes = require("./routes/user");
app.use(userRoutes);
const moodRoutes = require("./routes/mood");
app.use(moodRoutes);
const YourMoodRoutes = require("./routes/userMood");
app.use(YourMoodRoutes);

mongoose
  .set("strictQuery", false)
  .connect("mongodb://localhost/my_mood_up")
  .then(() => console.log("Connected to the DB!"));

app.listen(8080, () => {
  console.log("server has started");
});
