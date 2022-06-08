const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");
const UserServices = require("../services/User.services");
//login
router.post("/", UserServices.CheckNotAuthenticated, async (req, res) => {
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
