const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");
const { validateAdmin } = require("../middlewares/validator/validate-user");

const adminRoute = express.Router();

adminRoute.patch(
  "/games/:gameId/verify",
  authenticate,
  validateAdmin,
  c.admin.verifyGame
);
adminRoute.patch(
  "/games/:gameId/delete",
  authenticate,
  validateAdmin,
  c.admin.deleteGame
);

module.exports = adminRoute;
