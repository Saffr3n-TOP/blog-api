const { body, validationResult } = require('express-validator');
const createError = require('http-errors');
const Post = require('../models/post');

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.postsGet = async function (req, res, next) {
  const isAdmin = req.user && req.user.isAdmin;
  const posts = await Post.find(
    isAdmin ? {} : { isPosted: true },
    isAdmin
      ? {}
      : {
          createdDate: 0,
          isPosted: 0
        }
  )
    .sort(
      isAdmin
        ? { isPosted: 1, postedDate: 1, createdDate: 1 }
        : { postedDate: 1 }
    )
    .exec()
    .catch((err) => createError(500, err));

  if (posts instanceof Error) {
    return next(posts);
  }

  res.status(200).json({
    message: 'Posts successfully retrieved',
    data: { posts }
  });
};

exports.postsPost = [
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

  body('title', 'Title is required').trim().notEmpty().bail(),
  body('content', 'Content is required').trim().notEmpty().bail(),
  body('isPosted').isBoolean(),

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

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      isPosted: req.body.isPosted
    });
    post.isPosted && (post.postedDate = new Date());

    const savedPost = await post.save().catch((err) => createError(500, err));

    if (savedPost instanceof Error) {
      return next(savedPost);
    }

    res.status(200).json({
      data: {
        message: 'Post successfully created',
        post
      }
    });
  }
];

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.postGet = async function (req, res, next) {
  const isAdmin = req.user && req.user.isAdmin;
  const post = await (isAdmin
    ? Post.findById(req.params.postId)
    : Post.findOne(
        { _id: req.params.postId, isPosted: true },
        { createdDate: 0, isPosted: 0 }
      )
  )
    .exec()
    .catch((err) => createError(500, err));

  if (post instanceof Error) {
    return next(post);
  }

  if (!post) {
    return next(createError(404, 'Post Not Found'));
  }

  res.status(200).json({
    data: {
      message: 'Post successfully retrieved',
      post
    }
  });
};

exports.postPut = [
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

  body('title', 'Title is required').trim().notEmpty().bail(),
  body('content', 'Content is required').trim().notEmpty().bail(),
  body('isPosted').optional().isBoolean(),

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

    const post = {
      title: req.body.title,
      content: req.body.content,
      isPosted: req.body.isPosted
    };
    post.isPosted && (post.postedDate = new Date());

    const savedPost = await Post.findByIdAndUpdate(req.params.postId, post, {
      new: true
    })
      .exec()
      .catch((err) => createError(500, err));

    if (savedPost instanceof Error) {
      return next(savedPost);
    }

    if (!savedPost) {
      return next(createError(404, 'Post Not Found'));
    }

    res.status(200).json({
      data: {
        message: 'Post successfully updated',
        post: savedPost
      }
    });
  }
];

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.postDelete = async function (req, res, next) {
  const isAdmin = req.user && req.user.isAdmin;

  if (!isAdmin) {
    return next(createError(401, 'Unauthorized'));
  }

  const deletedPost = await Post.findByIdAndDelete(req.params.postId)
    .exec()
    .catch((err) => createError(500, err));

  if (deletedPost instanceof Error) {
    return next(deletedPost);
  }

  if (!deletedPost) {
    return next(createError(404, 'Post Not Found'));
  }

  res.status(200).json({
    data: {
      message: 'Post successfully deleted',
      post: deletedPost
    }
  });
};
