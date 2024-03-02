const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.getAll = async (req, res, next) => {
  try {
    const tags = await repo.platform.getAll();
    res.status(200).json({ tags });
  } catch (err) {
    next(err);
  }
  return;
};
