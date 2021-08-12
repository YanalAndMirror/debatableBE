const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [8, 'password can not be less than 8 characters'],
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    trim: true,
    lowercase: true,
    unique: true,
  },
  activity: [{ type: String }],
  argues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Argue' }],
  debates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Debate' }],
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
