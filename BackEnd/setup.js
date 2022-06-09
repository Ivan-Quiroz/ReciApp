require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const passport = require("passport");
const { ConnectToDatabase } = require("./services/MongoDB.services");

if (process.env.NODE_ENV !== "test") ConnectToDatabase();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Map controllers
app.use("/user", require("./controllers/User.controller"));
app.use("/recipe", require("./controllers/Recipe.controller"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

module.exports = { app, server };
