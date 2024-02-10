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

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.register = function (req, res, next) {
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
