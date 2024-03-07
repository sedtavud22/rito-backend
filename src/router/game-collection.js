const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");

const gameCollectionRoute = express.Router();

gameCollectionRoute.get(
  "/me",
  authenticate,
  c.gameCollection.getMyGameCollection
);
gameCollectionRoute.get(
  "/user/:userId",
  authenticate,
  c.gameCollection.getByUserId
);

module.exports = gameCollectionRoute;
