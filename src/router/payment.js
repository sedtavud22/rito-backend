const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");

const paymentRoute = express.Router();

paymentRoute.post(
  "/create-checkout-session",
  authenticate,
  c.payment.createSession
);
paymentRoute.get("/session-status", c.payment.getSessionStatus);

module.exports = paymentRoute;
