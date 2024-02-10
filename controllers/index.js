const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const User = require('../models/user');

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.index = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Index route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.login = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Login POST route'
    }
  });
};

exports.register = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .bail()
    .custom(async (username, { req }) => {
      const user = await User.findOne({
        username: new RegExp(`^${username}$`, 'i')
      })
        .exec()
        .catch((err) => new Error(err));

      if (user instanceof Error) {
        req.body = null;
        throw user;
      }

      if (user) {
        throw new Error('Username already exists');
      }
    })
    .bail(),
  body('password', 'Password is required').trim().notEmpty(),

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async function (req, res, next) {
    const err = validationResult(req).array()[0];

    if (err) {
      return next(createError(req.body ? 400 : 500, err.msg));
    }

    const hash = await bcrypt
      .hash(req.body.password, 12)
      .catch((err) => createError(500, err));

    if (hash instanceof Error) {
      return next(hash);
    }

    const user = new User({
      username: req.body.username,
      hash
    });

    const savedUser = await user.save().catch((err) => createError(500, err));

    if (savedUser instanceof Error) {
      return next(savedUser);
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        data: {
          message: `User ${user.username} successfully created`
        }
      });
    });
  }
];

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.logout = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Logout route'
    }
  });
};
