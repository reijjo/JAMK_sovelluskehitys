const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
// POST
// Register user
const register = async (req, res) => {
  const { name, email, password, password2 } = req.body;

  if ((!name, !email, !password, !password2)) {
    return res.status(400).json({ success: false, msg: "Empty fields." });
  }

  try {
    // Check email duplicates
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res
        .status(400)
        .json({ success: false, msg: "Email already in use." });
    }

    const user = {
      name,
      email,
      password,
      password2,
    };

    const newUser = await UserModel.create(user);

    console.log("new USer", newUser);

    res.status(201).json({ success: true, user, newUser });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find user
    const user = await UserModel.findOne({ name });

    if (!user) {
      return res.status(401).json({ success: false, msg: "User not found." });
    }

    // Check password
    const hashed = await bcrypt.compare(password, user.password);

    if (!hashed) {
      return res.status(401).json({ success: false, msg: "Invalid password." });
    }

    // Create jwt token
    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ msg: "user created", token });
  } catch (error) {
    console.log("error logging in", error);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  register,
  login,
};
