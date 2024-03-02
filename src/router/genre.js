const express = require("express");

const c = require("../controller");

const genreRoute = express.Router();

genreRoute.get("/", c.genre.getAll);

module.exports = genreRoute;
