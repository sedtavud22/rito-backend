const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.verifyGame = async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const existingGame = await repo.game.getGameByGameId(+gameId);
    if (!existingGame || existingGame.isVerified) {
      throw new CustomError("Game does not exist", "NotFoundData", 500);
    }

    const game = await repo.game.update(+gameId, { isVerified: true });
    res.status(200).json({ game });
  } catch (error) {
    next(error);
  }
};

exports.deleteGame = async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const existingGame = await repo.game.getGameByGameId(+gameId);
    if (!existingGame || existingGame.deletedAt) {
      throw new CustomError("Game does not exist", "NotFoundData", 500);
    }

    await repo.game.update(+gameId, { deletedAt: new Date() });
    res.status(200).json({ message: `Game id: ${gameId} has been deleted.` });
  } catch (error) {
    next(error);
  }
};
