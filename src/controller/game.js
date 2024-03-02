const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.getAll = async (req, res, next) => {
  try {
    const games = await repo.game.getAll();
    res.status(200).json({ games });
  } catch (err) {
    next(err);
  }
  return;
};

exports.getGameByGameId = async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const games = await repo.game.getGameByGameId(+gameId);
    res.status(200).json({ games });
  } catch (err) {
    next(err);
  }
  return;
};

exports.getGamesByUserId = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const games = await repo.game.getGamesByUserId(+userId);
    res.status(200).json({ games });
  } catch (err) {
    next(err);
  }
  return;
};

exports.getGamesByTagId = async (req, res, next) => {
  const { tagId } = req.params;

  try {
    const games = await repo.game.getGamesByTagId(+tagId);
    res.status(200).json({ games });
  } catch (err) {
    next(err);
  }
  return;
};

exports.getGamesByGenreId = async (req, res, next) => {
  const { genreId } = req.params;

  try {
    const games = await repo.game.getGamesByGenreId(+genreId);
    res.status(200).json({ games });
  } catch (err) {
    next(err);
  }
  return;
};

exports.create = async (req, res, next) => {};

exports.update = async (req, res, next) => {};

exports.delete = async (req, res, next) => {};
