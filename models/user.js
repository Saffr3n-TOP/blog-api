const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    hash: { type: String, required: true },
    date: { type: Date, default: new Date() },
    isAdmin: Boolean
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', UserSchema);
