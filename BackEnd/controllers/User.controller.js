const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");
const UserServices = require("../services/User.services");

router.post("/", UserServices.CheckNotAuthenticated, async (req, res) => {
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
//login
router.post(
  "/login",
  UserServices.CheckNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/recipe/home",
    failureFlash: true,
  })
);
// cerrar sesión
router.delete("/logout", async (req, res, next) => {
  try {
    req.logOut((error) => {
      if (error) return next(error);

      return res.status(200).end();
    });
  } catch (error) {
    return res
      .status(400)
      .send({ fault: error.stringValue, message: error.message })
      .end();
  }
});

module.exports = router;
