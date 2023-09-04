const userRouter = require('express').Router();
const userController = require('../controllers/users.controller');
const { findUser } = require('../middlewares/users.mw');
const messageRouter = require('./messageRouter');

userRouter.route('/')
  .post(userController.createUser)
  .get(userController.getUsers);

userRouter.route('/:userId')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.use('/:userId/messages', findUser, messageRouter);

module.exports = userRouter;