const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

      if (user === null) {
        console.log("No user with that email");
        return done(null, false, { message: "No user with that email." });
      }

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }

      console.log("Incorrect password");
      return done(null, false, { message: "Incorrect password." });
    } catch (error) {
      console.log(error);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;
