const { Schema, model } = require('mongoose');
const yup = require('yup');

const EMAIL_SCHEMA = yup.string().email().required();

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (emailValue) => EMAIL_SCHEMA.isValid(emailValue),
      message: 'Email is invalid'
    }
  },
  password: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9]{8,16}$/, 'Password must be 8-16 symbols and must contain letters, and numbers only']
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
}, {
  timestamps: true
});

const User = model('User', userSchema);

module.exports = User;