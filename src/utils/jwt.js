const jwt = require("jsonwebtoken");

module.exports.sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY ?? "key", {
    algorithm: process.env.JWT_ALGORITHM ?? "HS384",
    expiresIn: process.env.JWT_EXPIRES ?? "1d",
  });

module.exports.signResetPassword = (payload) =>
  jwt.sign(payload, process.env.JWT_RESET_PASSWORD_KEY ?? "key", {
    expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES ?? "5m",
    algorithm: process.env.JWT_ALGORITHM ?? "HS384",
  });

module.exports.verifyResetPassword = (token) =>
  jwt.verify(token, process.env.JWT_RESET_PASSWORD_KEY ?? "key");
