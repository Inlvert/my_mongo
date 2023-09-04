const createHttpError = require('http-errors');
const { User } = require('../models');

module.exports.findUser = async (req, res, next) => {
  try {
    const { params: { userId } } = req;

    const foundUser = await User.findById(userId);

    if(!foundUser) {
      return next(createHttpError(404, 'User not found'));
    }

    req.user = foundUser;

    next();

  } catch (error) {
    next(error);
  }
}