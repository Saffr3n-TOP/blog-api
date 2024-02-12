const { body, validationResult } = require('express-validator');
const createError = require('http-errors');
const Comment = require('../models/comment');

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.commentsGet = async function (req, res, next) {
  const comments = await Comment.find({ post: req.params.postId })
    .sort({ createdDate: 1 })
    .exec()
    .catch((err) => createError(500, err));

  if (comments instanceof Error) {
    return next(comments);
  }

  res.status(200).json({
    data: {
      message: 'Comments successfully retrieved',
      comments
    }
  });
};

exports.commentsPost = [
  body('username').trim(),
  body('content', 'Content is required').trim().notEmpty(),

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async function (req, res, next) {
    const err = validationResult(req).array()[0];

    if (err) {
      return next(createError(400, err.msg));
    }

    const comment = new Comment({
      username: req.user.username || req.body.username || '',
      content: req.body.content,
      post: req.params.postId
    });

    const savedComment = await comment
      .save()
      .catch((err) => createError(500, err));

    if (savedComment instanceof Error) {
      return next(savedComment);
    }

    res.status(200).json({
      data: {
        message: 'Comment successfully created',
        comment
      }
    });
  }
];

exports.commentPut = [
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  function (req, res, next) {
    const isAdmin = req.user && req.user.isAdmin;

    if (!isAdmin) {
      return next(createError(401, 'Unauthorized'));
    }

    next();
  },

  body('username').trim(),
  body('content', 'Content is required').trim().notEmpty(),

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async function (req, res, next) {
    const err = validationResult(req).array()[0];

    if (err) {
      return next(createError(400, err.msg));
    }

    const comment = { content: req.body.content };
    req.body.username && (comment.username = req.body.username);

    const savedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      comment,
      { new: true }
    )
      .exec()
      .catch((err) => createError(500, err));

    if (savedComment instanceof Error) {
      return next(savedComment);
    }

    if (!savedComment) {
      return next(createError(404, 'Comment Not Found'));
    }

    res.status(200).json({
      data: {
        message: 'Comment successfully updated',
        comment: savedComment
      }
    });
  }
];

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.commentDelete = async function (req, res, next) {
  const isAdmin = req.user && req.user.isAdmin;

  if (!isAdmin) {
    return next(createError(401, 'Unauthorized'));
  }

  const deletedComment = await Comment.findByIdAndDelete(req.params.commentId)
    .exec()
    .catch((err) => createError(500, err));

  if (deletedComment instanceof Error) {
    return next(deletedComment);
  }

  if (!deletedComment) {
    return next(createError(404, 'Comment Not Found'));
  }

  res.status(200).json({
    data: {
      message: 'Comment successfully deleted',
      comment: deletedComment
    }
  });
};
