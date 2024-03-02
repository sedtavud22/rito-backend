const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");

const gameRoute = express.Router();

gameRoute.get("/", c.game.getAll);
gameRoute.get("/:gameId", c.game.getGameByGameId);
gameRoute.get("/user/:userId", c.game.getGamesByUserId);
gameRoute.get("/tag/:tagId", c.game.getGamesByTagId);
gameRoute.get("/genre/:genreId", c.game.getGamesByGenreId);
gameRoute.post("/", c.game.create);
gameRoute.patch("/:gameId/update", c.game.update);
gameRoute.patch("/:gameId/delete", c.game.delete);

module.exports = gameRoute;
