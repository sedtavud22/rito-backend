//=====================================================Imported Zone
const express = require("express");
const { json, urlencoded } = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const session = require('express-session')
const passport = require("passport")
require("../middlewares/passportGoogle")

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
const friendshipRoute = require("../router/friendship");
const paymentRoute = require("../router/payment");
const wishlistRoute = require("../router/wishlist");
const gameCollectionRoute = require("../router/game-collection");
const adminRoute = require("../router/admin");
const chatRoute = require("../router/chat");
const postRoute = require("../router/post")
const commentRoute = require("../router/comment")
const likeRoute = require("../router/like")

//=====================================================Server Zone
module.exports = function restApiServer(app) {
  //=====================================================Encoding Zone


  app.use(morgan("dev"));
  app.use(cors({origin:"http://localhost:5173",credentials:true}));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(express.static("public"));

  app.use(cookieSession({
    name: "session",
		keys: [process.env.COOKIE_KEY],
		maxAge: 24 * 60 * 60 * 1000,
  }))


  app.use(passport.initialize())
  app.use(passport.session())

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
  app.use("/friendships", friendshipRoute);
  app.use("/payments", paymentRoute);
  app.use("/wishlists", wishlistRoute);
  app.use("/game-collections", gameCollectionRoute);
  app.use("/admin", adminRoute);
  app.use("/chat", chatRoute);
  app.use("/post", postRoute)
  app.use("/comment",commentRoute)
  app.use("/like",likeRoute)

  //=====================================================Throwing Zone
  app.use(notFound);
  app.use(errorMiddlewares);
};
