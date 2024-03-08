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

exports.searchPlatforms = async (req, res, next) => {
  const { query } = req.params;

  const searchSlug = utils.slug.makeSlug(query);

  try {
    const platforms = await repo.platform.searchPlatforms(searchSlug);
    res.status(200).json({ platforms });
  } catch (error) {
    next(error);
  }
};
