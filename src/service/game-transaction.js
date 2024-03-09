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
