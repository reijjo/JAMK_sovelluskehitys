const express = require("express");
const {
  register,
  login,
  logout,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/user");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", express.urlencoded({ extended: false }), login);
userRouter.get("/logout", logout);
userRouter.delete("/:id", isAuthenticated, deleteUser);

module.exports = userRouter;
