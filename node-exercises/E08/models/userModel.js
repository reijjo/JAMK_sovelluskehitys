const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const roles = ["admin", "user"];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    minLength: [2, "Min 2 chars on name."],
    maxLength: [20, "Max 20 chars on name."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [8, "At least 8 chars on password."],
    maxLength: [40, "Max 40 chars on password."],
  },
  password2: {
    type: String,
    required: [true, "Password is required."],
    minLength: [8, "At least 8 chars on password."],
    maxLength: [40, "Max 40 chars on password."],
  },
  role: {
    type: String,
    required: [true, "User role must be provided"],
    enum: roles,
    default: "user",
  },
  albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password", "password2")) {
    return next();
  }

  try {
    const hashed1 = await bcrypt.hash(this.password, 10);
    this.password = hashed1;

    const hashed2 = await bcrypt.hash(this.password2, 10);
    this.password2 = hashed2;

    return next();
  } catch (error) {
    console.log("error hashing password", error);
    return next(error);
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
