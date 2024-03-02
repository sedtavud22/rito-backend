const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.getAll = async (req, res, next) => {
  try {
    const genres = await repo.genre.getAll();
    res.status(200).json({ genres });
  } catch (err) {
    next(err);
  }
  return;
};
