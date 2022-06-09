const User = require("../models/User.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

async function GetUserByFacebookId(facebookId) {
  try {
    return await User.findOne({ facebookId }).exec();
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

async function FacebookLogin(accessToken, refreshToken, profile, callback) {
  try {
    const facebookUser = await GetUserByFacebookId(profile.id);
    if (facebookUser) {
      return callback(null, facebookUser);
    }

    User.create(
      {
        name: profile.displayName.split(" ")[0],
        lastName: profile.displayName.split(" ")[1],
        email: profile.provider,
        password: await bcrypt.hash(profile.id, 10),
        facebookId: profile.id,
      },
      function (err, user) {
        return callback(err, user);
      }
    );
  } catch (error) {
    return callback(null, false);
  }
}

async function GoogleLogin(accessToken, refreshToken, profile, callback) {
  try {
    console.log(profile);
    return callback(null, false);
  } catch (error) {
    return callback(null, false);
  }
}

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = {
  VerifyUserCredentials,
  AuthenticateToken,
  CreateUser,
  GetUserByEmail,
  FacebookLogin,
  GoogleLogin,
};
