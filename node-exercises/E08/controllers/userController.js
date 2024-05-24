const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const session = require("express-session");

// /register
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

    // console.log("new USer", newUser);

    res.status(201).json({ success: true, user, newUser });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ msg: error });
  }
};

// /login
// POST
// Login user
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

    // Express session
    req.session.regenerate((err) => {
      if (err) {
        console.error("Error regenerating session:", err);
        return res
          .status(500)
          .json({ success: false, msg: "Internal server error" });
      }
      // Set session data
      req.session.user = user;
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          return res
            .status(500)
            .json({ success: false, msg: "Internal server error" });
        }
        // console.log("req.session.user", req.session.user);

        res
          .status(200)
          .json({ success: true, msg: "User logged in successfully" });
      });
    });

    // Create jwt token
    // const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    //   expiresIn: "7d",
    // });

    // res.status(200).json({ msg: "user created", token });
  } catch (error) {
    console.log("error logging in", error);
    res.status(500).json({ msg: error });
  }
};

// /logout
// GET
// Logout user
const logout = async (req, res, _next) => {
  const user = req.session.user;

  req.session.regenerate((err) => {
    if (err) {
      console.error("Error regenerating session:", err);
      return res
        .status(500)
        .json({ success: false, msg: "Internal server error" });
    }
    // Set session data
    req.session.user = null;
    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
        return res
          .status(500)
          .json({ success: false, msg: "Internal server error" });
      }
      res.status(200).json({ success: true, msg: `User logged out` });
    });
  });
};

// ADMIN STUFF

// /:id
// DELETE
// Delete user
const deleteUser = async (req, res, _next) => {
  const { id } = req.params;

  try {
    const userToDelete = await UserModel.findOne({ _id: id });

    if (!userToDelete) {
      return res.status(404).json({ success: false, msg: "No such user" });
    }

    const user = req.session.user;

    if (!user) {
      return res.status(400).json({ success: false, msg: "Log in first." });
    }

    console.log("user", user);

    const role = user.role;

    if (role !== "admin") {
      return res
        .status(401)
        .json({ success: false, msg: "You are not an admin!" });
    } else {
      await UserModel.deleteOne(userToDelete);
      return res
        .status(201)
        .json({ success: true, msg: `User ${userToDelete.name} deleted.` });
    }
  } catch (error) {
    console.log("Error deleting user", error);
  }
};

module.exports = {
  register,
  login,
  logout,
  deleteUser,
};
