// @ts-check

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    username: String,
    content: { type: String, required: true },
    createdDate: { type: Date, default: new Date() },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
  },
  { collection: 'comments' }
);

module.exports = mongoose.model('Comment', CommentSchema);
