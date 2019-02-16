/**
 * @fileoverview Middlewares for any endpoints in /v1
 *
 * @author Jalay Simaria
 */

const jwt = require("jsonwebtoken");

module.exports = {
  validateJWT(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      // forbidden without token
      return res.status(403).json({
        message:
          "You're not allowed to access this endpoint without a valid token"
      });
    } else {
      // unauthorized with invalid token
      jwt.verify(token, global.jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid token"
          });
        }

        // pass with valid token
        next();
      });
    }
  }
};
