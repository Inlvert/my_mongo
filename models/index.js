const mongoose = require('mongoose');
const CONSTANTS = require('../constants');
const User = require('./user');
const Message = require('./message');

async function connectToDB() {
  await mongoose.connect(CONSTANTS.DB_URL);
}

connectToDB().catch(err => console.log(err));

module.exports = {
  User,
  Message
}