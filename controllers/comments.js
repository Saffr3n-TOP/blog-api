/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.commentsGet = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Comments GET route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.commentsPost = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Comments POST route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.commentPut = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Comment PUT route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.commentDelete = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Comment DELETE route'
    }
  });
};
