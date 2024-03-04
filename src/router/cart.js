const express = require("express");

const c = require("../controller");
const authenticate = require("../middlewares/authenticate");

const cartRoute = express.Router();

cartRoute.get("/me", authenticate, c.cart.getMyCartItems);
cartRoute.post("/", authenticate, c.cart.create);
cartRoute.delete("/:cartId", authenticate, c.cart.delete);
cartRoute.delete("/user/:userId", authenticate, c.cart.deleteCartItemsByUserId);

module.exports = cartRoute;
