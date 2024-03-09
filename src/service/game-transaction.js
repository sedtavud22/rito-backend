const prisma = require("../config/prisma");
const repo = require("../repository");
const utils = require("../utils");

exports.create = (body, files, userId) =>
  prisma.$transaction(
    async (tx) => {
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
        gameData.backgroundImagePublicId = backgroundImageUpload.public_id;
      }

      const newGame = await tx.game.create({
        data: gameData,
      });

      const gameGenresData = [];

      if (genres) {
        const parsedGenres = JSON.parse(genres);

        for (let genre of parsedGenres) {
          gameGenresData.push({ genreId: genre.id, gameId: newGame.id });
        }

        await tx.gameGenre.createMany({ data: gameGenresData });
      }

      const gameTagsData = [];

      if (tags) {
        const parsedTags = JSON.parse(tags);

        for (let tag of parsedTags) {
          gameTagsData.push({ tagId: tag.id, gameId: newGame.id });
        }

        await tx.gameTag.createMany({ data: gameTagsData });
      }

      const gamePlatformsData = [];

      if (platforms) {
        const parsedPlatforms = JSON.parse(platforms);

        for (let platform of parsedPlatforms) {
          gamePlatformsData.push({
            platformId: platform.id,
            gameId: newGame.id,
          });
        }

        await tx.gamePlatform.createMany({ data: gamePlatformsData });
      }

      const screenshotsData = [];

      if (files.screenshots) {
        for (const file of files.screenshots) {
          const result = await utils.cloudinary.upload(file.path);
          screenshotsData.push({
            imageUrl: result.secure_url,
            publicId: result.public_id,
            gameId: newGame.id,
          });
        }
        await tx.screenShot.createMany({ data: screenshotsData });
      }

      const createdGame = await tx.game.findFirst({
        where: {
          id: newGame.id,
        },
        include: utils.gameInclusion.gameInclude,
      });

      return createdGame;
    },
    { timeout: 20000 }
  );

exports.update = (body, files, userId, gameId) =>
  prisma.$transaction(
    async (tx) => {
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
        deletedScreenshotIds,
      } = body;

      const deletedImagePublicIds = [];

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
        const { backgroundImagePublicId } = await tx.game.findFirst({
          where: {
            id: gameId,
          },
        });

        if (backgroundImagePublicId) {
          deletedImagePublicIds.push(backgroundImagePublicId);
        }
        const backgroundImageUpload = await utils.cloudinary.upload(
          files.backgroundImage[0].path
        );
        gameData.backgroundImageUrl = backgroundImageUpload.secure_url;
        gameData.backgroundImagePublicId = backgroundImageUpload.public_id;
      }

      await tx.game.update({
        where: {
          id: gameId,
        },
        data: gameData,
      });

      if (genres) {
        const parsedGenres = JSON.parse(genres);

        const initialGameGenres = await tx.gameGenre.findMany({
          where: {
            gameId,
          },
        });

        const deletedGameGenreIds = initialGameGenres
          .filter(
            (objInit) =>
              !parsedGenres.some((objNew) => +objInit.genreId === +objNew.id)
          )
          .map((obj) => obj.genreId);

        const newGameGenres = parsedGenres
          .filter(
            (objNew) =>
              !initialGameGenres.some(
                (objInit) => +objInit.genreId === +objNew.id
              )
          )
          .map((obj) => ({ genreId: obj.id, gameId }));

        if (newGameGenres.length > 0) {
          await tx.gameGenre.createMany({ data: newGameGenres });
        }
        if (deletedGameGenreIds.length > 0) {
          await tx.gameGenre.deleteMany({
            where: {
              genreId: {
                in: deletedGameGenreIds,
              },
            },
          });
        }
      }

      if (tags) {
        const parsedTags = JSON.parse(tags);

        const initialGameTags = await tx.gameTag.findMany({
          where: {
            gameId,
          },
        });

        const deletedGameTagIds = initialGameTags
          .filter(
            (objInit) =>
              !parsedTags.some((objNew) => +objInit.tagId === +objNew.id)
          )
          .map((obj) => obj.tagId);

        const newGameTags = parsedTags
          .filter(
            (objNew) =>
              !initialGameTags.some((objInit) => +objInit.tagId === +objNew.id)
          )
          .map((obj) => ({ tagId: obj.id, gameId }));

        if (newGameTags.length > 0) {
          await tx.gameTag.createMany({ data: newGameTags });
        }
        if (deletedGameTagIds.length > 0) {
          await tx.gameTag.deleteMany({
            where: {
              tagId: {
                in: deletedGameTagIds,
              },
            },
          });
        }
      }

      if (platforms) {
        const parsedPlatforms = JSON.parse(platforms);

        const initialGamePlatforms = await tx.gamePlatform.findMany({
          where: {
            gameId,
          },
        });

        const deletedGamePlatformIds = initialGamePlatforms
          .filter(
            (objInit) =>
              !parsedPlatforms.some(
                (objNew) => +objInit.platformId === +objNew.id
              )
          )
          .map((obj) => obj.platformId);

        const newGamePlatforms = parsedPlatforms
          .filter(
            (objNew) =>
              !initialGamePlatforms.some(
                (objInit) => +objInit.platformId === +objNew.id
              )
          )
          .map((obj) => ({ platformId: obj.id, gameId }));

        if (newGamePlatforms.length > 0) {
          await tx.gamePlatform.createMany({ data: newGamePlatforms });
        }
        if (deletedGamePlatformIds.length > 0) {
          await tx.gamePlatform.deleteMany({
            where: {
              platformId: {
                in: deletedGamePlatformIds,
              },
            },
          });
        }
      }

      if (deletedScreenshotIds) {
        const parsed = JSON.parse(deletedScreenshotIds);
        const deleted = await tx.screenShot.findMany({
          where: { id: { in: parsed } },
        });
        const deletedScreenshotPublicIds = deleted
          .map((obj) => obj.publicId)
          .filter((id) => id !== null);
        deletedImagePublicIds.push(...deletedScreenshotPublicIds);
        await tx.screenShot.deleteMany({ where: { id: { in: parsed } } });
      }

      const screenshotsData = [];

      if (files.screenshots) {
        for (const file of files.screenshots) {
          const result = await utils.cloudinary.upload(file.path);
          screenshotsData.push({
            imageUrl: result.secure_url,
            publicId: result.public_id,
            gameId,
          });
        }
        await tx.screenShot.createMany({ data: screenshotsData });
      }

      await utils.cloudinary.destroyMany(deletedImagePublicIds);

      const updatedGame = await tx.game.findFirst({
        where: {
          id: gameId,
        },
        include: utils.gameInclusion.gameInclude,
      });

      return updatedGame;
    },
    { timeout: 30000 }
  );
