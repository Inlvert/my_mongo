const createHttpError = require("http-errors");
const { User } = require("../models");


module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
}

module.exports.getUsers = async (req, res, next) => {

  const users = await User.find().populate('messages');

  res.send({ data: users })
}

module.exports.getUser = async (req, res, next) => {
  try {
    const { params: { userId } } = req;

    const user = await User.findById(userId);

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
}
module.exports.updateUser = async (req, res, next) => {
  try {
    const { params: { userId }, body } = req;

    const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });

    res.send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
}

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { params: { userId } } = req;

    const user = await User.findByIdAndDelete(userId);

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
}