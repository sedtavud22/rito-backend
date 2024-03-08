const express = require("express");

const c = require("../controller");

const tagRoute = express.Router();

tagRoute.get("/", c.tag.getAll);
tagRoute.get("/search/:query", c.tag.searchTags);

module.exports = tagRoute;
