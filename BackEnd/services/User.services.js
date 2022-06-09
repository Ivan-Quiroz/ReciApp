const User = require("../models/User.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

async function VerifyUserCredentials(email, password) {
  try {
    const user = await User.findOne({ email }).exec();

    if (!user || user.length === 0) return [];
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }

    return [];
  } catch (error) {
    console.log(error);
    return null;
  }
}

function AuthenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = {
  VerifyUserCredentials,
  AuthenticateToken,
  CreateUser,
  GetUserByEmail,
};
