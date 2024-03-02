const express = require("express");

const c = require("../controller");

const tagRoute = express.Router();

tagRoute.get("/", c.tag.getAll);

module.exports = tagRoute;
