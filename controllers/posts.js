/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.postsGet = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Posts GET route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.postsPost = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Posts POST route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.postGet = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Post GET route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.postPut = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Post PUT route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.postDelete = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Post DELETE route'
    }
  });
};
