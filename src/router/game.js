const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const {
  validateCreateGame,
  validateGameBackgroundImage,
} = require("../middlewares/validator/validate-game");

const gameRoute = express.Router();

gameRoute.get("/", c.game.getAll);
gameRoute.get("/search/:query", c.game.searchGames);
gameRoute.get("/:gameId", c.game.getGameByGameId);
gameRoute.get("/user/:userId", c.game.getGamesByUserId);
gameRoute.get("/tags/:tagId", c.game.getGamesByTagId);
gameRoute.get("/genres/:genreId", c.game.getGamesByGenreId);
gameRoute.post(
  "/",
  authenticate,
  upload.fields([
    { name: "backgroundImage", maxCount: 1 },
    { name: "screenshots" },
  ]),
  validateCreateGame,
  validateGameBackgroundImage,
  c.game.create
);
gameRoute.patch(
  "/:gameId/update",
  authenticate,
  upload.fields([
    { name: "backgroundImage", maxCount: 1 },
    { name: "screenshots" },
  ]),
  validateCreateGame,
  c.game.update
);

module.exports = gameRoute;
