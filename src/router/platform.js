const express = require("express");

const c = require("../controller");

const platformRoute = express.Router();

platformRoute.get("/", c.platform.getAll);
platformRoute.get("/search/:query", c.platform.searchPlatforms);

module.exports = platformRoute;
