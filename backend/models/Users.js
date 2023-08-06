const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "DB: email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "DB: password is required"],
  },
  name: {
    type: String,
    default: "Bob",
  },
  token: {
    type: String,
    default: null,
  },
  roles: [
    {
      type: String,
      ref: "roles",
    },
  ],
});

module.exports = model("user", userSchema);
