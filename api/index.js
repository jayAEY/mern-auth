const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// const jwt, { decode } = "jsonwebtoken";
const bcrypt = require("bcrypt");
const UserModel = require("./models/Users.js");

// generate key = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://2nd-mern-auth-frontend.vercel.app",
      "http://localhost:5173",
    ],
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
  res.json({ body: Date() });
});

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
          sameSite: "None",
        });
        return res.json({ login: true });
      }
    } else {
      res.send("No user found");
    }
  } catch (err) {
    console.log(err);
    return res.json(err);
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
    console.log("Server is running");
  });

module.exports = app;
