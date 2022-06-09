const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserServices = require("../services/User.services");
const { sendStatus } = require("express/lib/response");

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    };

    const responseMongodb = await UserServices.CreateUser(user);

    if (responseMongodb === undefined) return res.status(400);

    if (responseMongodb.message !== undefined)
      return res.status(400).send(responseMongodb).end();

    return res.status(201).send(responseMongodb).end();
  } catch (error) {
    return res
      .status(400)
      .send({ fault: error.stringValue, message: error.message })
      .end();
  }
});

router.post("/login", async (req, res) => {
  const basicAuth = req.headers["authorization"];
  const clientCredentials = basicAuth && basicAuth.split(" ")[1];
  const user = await UserServices.VerifyUserCredentials(
    atob(clientCredentials).split(":")[0],
    atob(clientCredentials).split(":")[1]
  );

  if (user === null)
    return res.status(500).send({ message: "An error has ocurred" }).end();
  if (user.length === 0)
    return res
      .status(401)
      .send({ message: "Incorrect email or password." })
      .end();

  const accessToken = jwt.sign(
    user._id.valueOf(),
    process.env.ACCESS_TOKEN_SECRET
  );

  const userResponse = {
    _id: user._id.valueOf(),
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    token: accessToken,
  };

  return res
    .status(200)
    .setHeader("Authorization", accessToken)
    .send(userResponse)
    .end();
});

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/secrets",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:8080/login",
  }),
  (req, res) => {
    const user = req.user;
    // successful authentication, redirect home
    res.redirect(`http://localhost:8080/home?userid=${user._id.valueOf()}`);
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:8080/login",
  }),
  (req, res) => {
    const user = req.user;
    // successful authentication, redirect home
    res.redirect(`http://localhost:8080/home?userid=${user._id.valueOf()}`);
  }
);

router.delete("/logout", (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return sendStatus(400);
      }
      req.session.destroy();
      res.sendStatus(200);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message }).end();
  }
});

module.exports = router;
