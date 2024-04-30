const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    mongoose.connect(process.env.URL);
    console.log("Connected to Mongoose");
  } catch (error) {
    console.log(error);
  }
};

connect();

app.get("/api/test", (req, res) => {
  res.json({ hello: "world" });
});

process.env.PORT &&
  app.listen(process.env.PORT, () => {
    console.log("Server is running at localhost:" + process.env.PORT);
  });

module.exports = app;
