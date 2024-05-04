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

// generate key = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://my-mern-auth.vercel.app", "http://localhost:5173"],
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
      if (!validatedPassword) {
        res.send("Wrong Password");
      } else {
        const token = jwt.sign({ email }, process.env.JWT_KEY);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });
        return res.json({ login: true });
      }
    } else {
      res.send("No user found");
    }
  } catch (err) {
    console.log("err");
    return res.send(err);
  }
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({ login: false });
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

app.get("/api/verify", verifyUser, (req, res) => {
  return res.json({ login: true, email: req.email });
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

process.env.PORT &&
  app.listen(process.env.PORT, () => {
    console.log("Server is running at localhost:" + process.env.PORT);
  });
