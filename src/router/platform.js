const express = require("express");

const c = require("../controller");

const platformRoute = express.Router();

platformRoute.get("/", c.platform.getAll);

module.exports = platformRoute;
