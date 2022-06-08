const User = require("../models/User.model");
const passport = require("passport");

const initializePassport = require("../config/passport.config");
initializePassport(passport, GetUserByEmail, GetUserById);

async function CreateUser(user) {
  try {
    if (!user.name || !user.lastName || !user.email || !user.password)
      return { message: "All fields are required." };

    if (await GetUserByEmail(user.email))
      return { message: "The email address is already in use." };

    return await User.create({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
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
