const express = require("express");
const {
  validateRegister,
  validateChangePassword,
} = require("../middlewares/validator/validate-auth");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");

const userRoute = express.Router();

userRoute.get("/", c.user.getAll);
userRoute.get("/me", authenticate, c.user.getMe);
userRoute.get("/:id", c.user.get);
userRoute.post("/register", validateRegister, c.user.register);
userRoute.post("/login", c.user.login);
userRoute.put("/:id", c.user.update);
userRoute.delete("/:id", authenticate, c.user.delete);

userRoute.post("/forgot-password", c.user.forgotPassword);
userRoute.patch(
  "/reset-password",
  validateChangePassword,
  c.user.updatePassword
);

module.exports = userRoute;
