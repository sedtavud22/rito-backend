const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.getMyGameCollection = async (req, res, next) => {
  try {
    const gameCollections = await repo.gameCollection.getByUserId(req.user.id);
    res.status(200).json({ gameCollections });
  } catch (error) {
    next(error);
  }
};

exports.getByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const gameCollections = await repo.gameCollection.getByUserId(+userId);
    res.status(200).json({ gameCollections });
  } catch (error) {
    next(error);
  }
};
