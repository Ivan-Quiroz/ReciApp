const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserServices = require("../services/User.services");

router.post("/", async (req, res) => {
  try {
    const body = JSON.parse(Object.keys(req.body)[0]);
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = {
      name: body.name,
      lastName: body.lastName,
      email: body.email,
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

module.exports = router;
