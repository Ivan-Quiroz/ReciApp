const User = require("../models/User.model");
const passport = require("passport");

const initializePassport = require("../config/passport.config");
initializePassport(passport, GetUserByEmail, GetUserById);

async function CreateUser(name, lastName, email, password) {
  try {
    if (!name || !lastName || !email || !password)
      return { message: "All fields are required." };

    if (await GetUserByEmail(email))
      return { message: "The email address is already in use." };

    return await User.create({ name, lastName, email, password });
  } catch (error) {
    console.log(error.message);
  }
}

async function GetUserByEmail(email) {
  try {
    return await User.findOne({ email }).exec();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function GetUserById(id) {
  try {
    return await User.findById(id).exec();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

function CheckAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.sendStatus(401).end();
}

function CheckNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/recipe/home");
  }

  next();
}

module.exports = {
  CheckAuthenticated,
  CheckNotAuthenticated,
  CreateUser,
  GetUserByEmail,
};
