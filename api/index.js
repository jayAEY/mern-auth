//  NOTE add "type": "module", to package.json to use import
// import allows you to load parts like with jwt below
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "./models/Users.js";

// const UserModel = require("./models/Users");

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

// app.get("/api/test", (req, res) => {
//   res.json({ hello: "world" });
// });

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.send("User already exists");
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ email, password: hashPassword });
      await newUser.save();
      return res.send(`${email} is now registered`);
    }
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      const validatedPassword = await bcrypt.compare(password, user.password);
      // console.log(validatedPassword);
      if (!validatedPassword) {
        res.send("Wrong Password");
      } else {
        // const token = jwt.sign(email)
        // console.log("lets goooo");
        res.send("Login Successful");
      }
      // if (password === user.password) {
      //   res.send("Login Successful");
    }

    // res.send("Wrong Password");
    // }
    // res.send("User doesn't exist");
    // user
    //   ? password === user.password
    //     ? res.send("Login Successful")
    //     : res.send("Wrong Password")
    //   : res.send("User doesn't exist");
  } catch (err) {
    console.log("err");
    return res.send(err);
  }
});

process.env.PORT &&
  app.listen(process.env.PORT, () => {
    console.log("Server is running at localhost:" + process.env.PORT);
  });

// module.exports = app;
