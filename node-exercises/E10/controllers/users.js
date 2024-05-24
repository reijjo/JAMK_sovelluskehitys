// const User = require("../models/User");
const { User, Vehicle } = require("../models/index");
const { StatusCodes } = require("http-status-codes");

const getUsers = async (req, res) => {
  // const users = await User.findAll();
  const users = await User.findAll({
    attributes: { exclude: ["username"] },
    include: {
      model: Vehicle,
      attributes: { exclude: ["userId"] },
    },
  });
  res.status(StatusCodes.OK).json({ succes: true, data: users });
};

const createUser = async (req, res) => {
  const { username, name } = req.body;

  const user = await User.create({ username, name });
  return res.status(StatusCodes.CREATED).send({ success: true, data: user });
};

module.exports = {
  getUsers,
  createUser,
};
