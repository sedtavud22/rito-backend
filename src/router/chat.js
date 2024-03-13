const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");

const chatRoute = express.Router();

chatRoute.get("/get-history/:receiverId", authenticate, c.chat.getHistoryChat);

module.exports = chatRoute;
