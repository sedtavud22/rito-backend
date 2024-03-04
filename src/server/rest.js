//=====================================================Imported Zone
const express = require("express");
const { json, urlencoded } = require("express");
const cors = require("cors");
const morgan = require("morgan");

//=====================================================local consted Zone

const { notFound } = require("../middlewares/notFound");
const { errorMiddlewares } = require("../middlewares/error");
const CustomError = require("../config/error");
const userRoute = require("../router/user");
const gameRoute = require("../router/game");
const genreRoute = require("../router/genre");
const tagRoute = require("../router/tag");
const platformRoute = require("../router/platform");
const cartRoute = require("../router/cart");

//=====================================================Server Zone
module.exports = function restApiServer(app) {
  //=====================================================Encoding Zone
  app.use(morgan("dev"));
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(express.static("public"));

  //=====================================================Routing Zone
  app.use("/ping", (req, res, next) => {
    try {
      console.log("Checking the API status: Everything is OK");
      res.status(200).json("pong");
    } catch (error) {
      next(new CustomError("Ping Error", "NotFoundData", 500));
    }
  });
  app.use("/user", userRoute);
  app.use("/games", gameRoute);
  app.use("/genres", genreRoute);
  app.use("/tags", tagRoute);
  app.use("/platforms", platformRoute);
  app.use("/carts", cartRoute);

  //=====================================================Throwing Zone
  app.use(notFound);
  app.use(errorMiddlewares);
};
