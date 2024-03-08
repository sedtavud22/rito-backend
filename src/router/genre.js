const express = require("express");

const c = require("../controller");

const genreRoute = express.Router();

genreRoute.get("/", c.genre.getAll);
genreRoute.get("/search/:query", c.genre.searchGenres);

module.exports = genreRoute;
