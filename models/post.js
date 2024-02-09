const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdDate: { type: Date, default: new Date() },
    postedDate: Date,
    isPosted: { type: Boolean, default: false }
  },
  { collection: 'posts' }
);

module.exports = mongoose.model('Post', PostSchema);
