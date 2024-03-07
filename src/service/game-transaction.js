const prisma = require("../config/prisma");
const repo = require("../repository");
const utils = require("../utils");

exports.create = (body, files, userId) =>
  prisma.$transaction(async (tx) => {
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
    } = body;

    const gameData = {
      name,
      slug: utils.slug.makeSlug(name),
      releasedDate,
      price: +price,
      publisherId: userId,
    };

    if (description) {
      gameData.description = description;
    }

    if (discount) {
      gameData.discount = +discount;
    }

    if (metacritic) {
      gameData.metacritic = +metacritic;
    }

    if (files.backgroundImage) {
      const backgroundImageUpload = await utils.cloudinary.upload(
        files.backgroundImage[0].path
      );
      gameData.backgroundImageUrl = backgroundImageUpload.secure_url;
    }

    const newGame = await tx.game.create({
      data: gameData,
    });

    const gameGenresData = [];

    if (genres) {
      if (!Array.isArray(genres)) {
        genres = [genres];
      }

      for (let genre of genres) {
        let { id } = await tx.genre.findFirst({
          where: {
            name: genre,
          },
          select: {
            id: true,
          },
        });
        gameGenresData.push({ genreId: id, gameId: newGame.id });
      }

      await tx.gameGenre.createMany({ data: gameGenresData });
    }

    const gameTagsData = [];

    if (tags) {
      if (!Array.isArray(tags)) {
        tags = [tags];
      }

      for (let tag of tags) {
        let { id } = await tx.tag.findFirst({
          where: {
            name: tag,
          },
          select: {
            id: true,
          },
        });
        gameTagsData.push({ tagId: id, gameId: newGame.id });
      }

      await tx.gameTag.createMany({ data: gameTagsData });
    }

    const gamePlatformsData = [];

    if (platforms) {
      if (!Array.isArray(platforms)) {
        platforms = [platforms];
      }

      for (let platform of platforms) {
        let { id } = await tx.platform.findFirst({
          where: {
            name: platform,
          },
          select: {
            id: true,
          },
        });
        gamePlatformsData.push({ platformId: id, gameId: newGame.id });
      }

      await tx.gamePlatform.createMany({ data: gamePlatformsData });
    }

    const screenshotsData = [];

    if (files.screenshots) {
      for (const file of files.screenshots) {
        const result = await utils.cloudinary.upload(file.path);
        screenshotsData.push({
          imageUrl: result.secure_url,
          gameId: newGame.id,
        });
      }
      await tx.screenShot.createMany({ data: screenshotsData });
    }

    const createdGame = await repo.game.getGameByGameId(newGame.id);
    return createdGame;
  });
