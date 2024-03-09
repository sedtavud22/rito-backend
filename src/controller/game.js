const fs = require("fs/promises");
const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");
const service = require("../service");

exports.getAll = async (req, res, next) => {
  try {
    const games = await repo.game.getAll();
    res.status(200).json({ games });
  } catch (err) {
    next(err);
  }
  return;
};

exports.searchGames = async (req, res, next) => {
  const { query } = req.params;

  const searchSlug = utils.slug.makeSlug(query);

  try {
    const games = await repo.game.searchGames(searchSlug);
    res.status(200).json({ games });
  } catch (error) {
    next(error);
  }
};

exports.getGameByGameId = async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const game = await repo.game.getGameByGameId(+gameId);
    res.status(200).json({ game });
  } catch (err) {
    next(err);
  }
  return;
};

exports.getGamesByUserId = async (req, res, next) => {
  const { userId } = req.params;

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

exports.create = async (req, res, next) => {
  try {
    const createdGame = await service.gameTransaction.create(
      req.body,
      req.files,
      req.user.id
    );
    res.status(200).json({ newGame: createdGame });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    if (req.files.backgroundImage) {
      fs.unlink(req.files.backgroundImage[0].path);
    }
    if (req.files.screenshots) {
      for (let file of req.files.screenshots) {
        fs.unlink(file.path);
      }
    }
  }
};

exports.update = async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const existingGame = await repo.game.getGameByGameId(+gameId);
    if (!existingGame) {
      throw new CustomError("Game does not exist", "NotFoundData", 500);
    }
    const updatedGame = await service.gameTransaction.update(
      req.body,
      req.files,
      req.user.id,
      +gameId
    );
    res.status(200).json({ game: updatedGame });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    if (req.files.backgroundImage) {
      fs.unlink(req.files.backgroundImage[0].path);
    }
    if (req.files.screenshots) {
      for (let file of req.files.screenshots) {
        fs.unlink(file.path);
      }
    }
  }
};

exports.delete = async (req, res, next) => {};
