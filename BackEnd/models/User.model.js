const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  facebookId: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema, "Users");
