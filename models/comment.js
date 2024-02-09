// @ts-check

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    username: String,
    content: { type: String, required: true },
    createdDate: { type: Date, default: new Date() }
  },
  { collection: 'comments' }
);

module.exports = mongoose.model('Comment', CommentSchema);
