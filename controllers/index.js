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
exports.loginGet = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Login GET route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.loginPost = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Login POST route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.registerGet = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Register GET route'
    }
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.registerPost = function (req, res, next) {
  res.status(200).json({
    data: {
      status: res.statusCode,
      message: 'NOT IMPLEMENTED: Register POST route'
    }
  });
};

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
