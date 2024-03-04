const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.create = async (req, res, next) => {
  const { gameId } = req.body;

  try {
    const newCartItem = await repo.cart.create(req.user.id, gameId);
    res.status(200).json({ cart: newCartItem });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { cartId } = req.params;

  try {
    await repo.cart.delete(+cartId);
    res.status(200).json({ message: `Cart id: ${+cartId} deleted` });
  } catch (error) {
    next(error);
  }
};

exports.deleteCartItemsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await repo.cart.deleteCartItemsByUserId(+userId);
    res
      .status(200)
      .json({ message: `User ${+userId}'s cart items has been deleted` });
  } catch (error) {
    next(error);
  }
};

exports.getMyCartItems = async (req, res, next) => {
  try {
    const carts = await repo.cart.getCartItemsByUserId(req.user.id);
    res.status(200).json({ carts });
  } catch (error) {
    next(error);
  }
};
