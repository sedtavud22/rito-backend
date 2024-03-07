const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.create = async (req, res, next) => {
  const { gameId } = req.body;

  try {
    const newWishlistItem = await repo.wishlist.create(req.user.id, +gameId);
    res.status(200).json({ wishlist: newWishlistItem });
  } catch (error) {
    next(error);
  }
};

exports.getMyWishlist = async (req, res, next) => {
  try {
    const wishlists = await repo.wishlist.getByUserId(req.user.id);
    res.status(200).json({ wishlists });
  } catch (error) {
    next(error);
  }
};

exports.getWishlistByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const wishlists = await repo.wishlist.getByUserId(+userId);
    res.status(200).json({ wishlists });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { wishlistId } = req.params;

  try {
    await repo.wishlist.delete(+wishlistId);
    res.status(200).json({ message: `Wishlist id: ${+wishlistId} deleted` });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await repo.wishlist.deleteAllByUserId(+userId);
    res
      .status(200)
      .json({ message: `User ${+userId}'s wishlist items has been deleted` });
  } catch (error) {
    next(error);
  }
};
