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
    const { game } = await repo.game.getGameByGameId(+gameId);
    res.status(200).json({ game });
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

exports.create = async (req, res, next) => {
  const {
    name,
    releasedDate,
    description,
    price,
    discount,
    metacritic,
    genres,
    tags,
    platforms,
  } = req.body;

  try {
    if (req.files.backgroundImage) {
      const backgroundImageUpload = await utils.cloudinary.upload(
        req.files.backgroundImage[0].path
      );
      req.body.backgroundImageUrl = backgroundImageUpload.secure_url;
      fs.unlink(req.files.cardImage[0].path);
    }

    const gameData = {
      name,
      slug: utils.slug.makeSlug(name),
      releasedDate,
      description,
      price: +price,
      discount: +discount,
      metacritic: +metacritic,
      publisherId: req.user.id,
    };

    const newGame = await repo.game.create(gameData);

    const gameGenresData = [];

    if (genres) {
      if (!Array.isArray(genres)) {
        genres = [genres];
      }

      for (let genre of genres) {
        let { id } = await repo.genre.findIdByName(genre);
        gameGenresData.push({ genreId: id, gameId: newGame.id });
      }

      await repo.gameGenre.createMany(gameGenresData);
    }

    const gameTagsData = [];

    if (tags) {
      if (!Array.isArray(tags)) {
        tags = [tags];
      }

      for (let tag of tags) {
        let { id } = await repo.tag.findIdByName(tag);
        gameTagsData.push({ tagId: id, gameId: newGame.id });
      }

      await repo.gameTag.createMany(gameTagsData);
    }

    const gamePlatformsData = [];

    if (platforms) {
      if (!Array.isArray(platforms)) {
        platforms = [platforms];
      }

      for (let platform of platforms) {
        let { id } = await repo.platform.findIdByName(platform);
        gamePlatformsData.push({ platformId: id, gameId: newGame.id });
      }

      await repo.gamePlatform.createMany(gamePlatformsData);
    }

    const screenshotsData = [];

    if (req.files.screenshots) {
      for (const file of req.files.screenshots) {
        const result = await utils.cloudinary.upload(file.path);
        screenshotsData.push({
          imageUrl: result.secure_url,
          gameId: newGame.id,
        });
        fs.unlink(file.path);
      }
      await repo.screenshot.createMany(screenshotsData);
    }

    const createdGame = await repo.game.getGameByGameId(newGame.id);
    res.status(200).json({ newGame: createdGame });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {};

exports.delete = async (req, res, next) => {};
