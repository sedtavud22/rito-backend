const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.getAll = async (req, res, next) => {
  try {
    const tags = await repo.tag.getAll();
    res.status(200).json({ tags });
  } catch (err) {
    next(err);
  }
  return;
};

exports.searchTags = async (req, res, next) => {
  const { query } = req.params;

  const searchSlug = utils.slug.makeSlug(query);

  try {
    const tags = await repo.tag.searchTags(searchSlug);
    res.status(200).json({ tags });
  } catch (error) {
    next(error);
  }
};
