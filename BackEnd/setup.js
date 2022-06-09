require("dotenv").config();

const express = require("express");
const app = express();

const passport = require("passport");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook").Strategy;
var GoogleStrategy = require("passport-google-oidc").Strategy;

const cors = require("cors");
const { ConnectToDatabase, User } = require("./services/MongoDB.services");
const { FacebookLogin, GoogleLogin } = require("./services/User.services");

if (process.env.NODE_ENV !== "test") ConnectToDatabase();

// Middlewares
app.use(passport.initialize());
app.use(express.json());
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/user/auth/facebook/secrets",
    },
    FacebookLogin
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/user/auth/google/secrets",
    },
    GoogleLogin
  )
);

// Map controllers
app.use("/user", require("./controllers/User.controller"));
app.use("/recipe", require("./controllers/Recipe.controller"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

module.exports = { app, server };
