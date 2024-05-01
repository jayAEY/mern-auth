const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const UserModel = require("./models/Users");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

const connect = async () => {
  try {
    mongoose.connect(process.env.URL);
    console.log("Connected to Mongoose");
  } catch (err) {
    console.log(err);
  }
};

connect();

app.get("/api/test", (req, res) => {
  res.json({ hello: "world" });
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new UserModel({ email, password });
    await newUser.save();
    return res.json({ registered: true });
  } catch (err) {
    console.log(err);
    return res.json({ Error: err });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // let user = await UserModel.findOne(email);
    // return res.json(user[data]);
  } catch (err) {
    console.log(err);
    return res.json({ Error: err });
  }
});

process.env.PORT &&
  app.listen(process.env.PORT, () => {
    console.log("Server is running at localhost:" + process.env.PORT);
  });

module.exports = app;
