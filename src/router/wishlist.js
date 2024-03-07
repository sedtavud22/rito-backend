const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");

const wishlistRoute = express.Router();

wishlistRoute.post("/", authenticate, c.wishlist.create);
wishlistRoute.get("/me", authenticate, c.wishlist.getMyWishlist);
wishlistRoute.get(
  "/user/:userId",
  authenticate,
  c.wishlist.getWishlistByUserId
);
wishlistRoute.delete("/:wishlistId", authenticate, c.wishlist.delete);
wishlistRoute.delete(
  "/user/:userId",
  authenticate,
  c.wishlist.deleteAllByUserId
);

module.exports = wishlistRoute;
