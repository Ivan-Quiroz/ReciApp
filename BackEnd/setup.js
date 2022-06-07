if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const { ConnectToDatabase } = require("./services/MongoDB.services");

if (process.env.NODE_ENV !== "test") ConnectToDatabase();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Map controllers
app.use("/user", require("./controllers/User.controller"));
app.use("/recipe", require("./controllers/Recipe.controller"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

module.exports = { app, server };
