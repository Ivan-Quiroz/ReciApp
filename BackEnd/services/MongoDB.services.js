if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const {
  MONGODB_DEVELOPMENT_CONNECTION_STRING,
  MONGODB_PRODUCTION_CONNECTION_STRING,
  NODE_ENV,
} = process.env;

const mongoose = require("mongoose");
const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");

const MongodbConnectionString =
  NODE_ENV === "development"
    ? MONGODB_DEVELOPMENT_CONNECTION_STRING
    : MONGODB_PRODUCTION_CONNECTION_STRING;

// Connect to database
function ConnectToDatabase() {
  mongoose.connect(
    MongodbConnectionString,
    () => console.log("connected"),
    (e) => console.log(e)
  );
}

module.exports = { User, Recipe, ConnectToDatabase };
