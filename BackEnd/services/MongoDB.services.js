require("dotenv").config();

const {
  MONGODB_DEVELOPMENT_CONNECTION_STRING,
  MONGODB_PRODUCTION_CONNECTION_STRING,
  NODE_ENV,
} = process.env;

const mongoose = require("mongoose");
const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");

const MongodbConnectionString =
  NODE_ENV === "development" || NODE_ENV === "test"
    ? MONGODB_DEVELOPMENT_CONNECTION_STRING
    : MONGODB_PRODUCTION_CONNECTION_STRING;

// Connect to database
async function ConnectToDatabase() {
  try {
    await mongoose.connect(MongodbConnectionString);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB:\n", error);
  }
}

function CloseConnection() {
  try {
    mongoose.connection.close();
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { User, Recipe, ConnectToDatabase, CloseConnection };
