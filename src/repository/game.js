const prisma = require("../config/prisma");
const { gameInclusion } = require("../utils");

exports.getAll = async (page) =>
  await prisma.game.findMany({
    where: {
      deletedAt: null,
      isVerified: true,
    },
    include: gameInclusion.gameInclude,
    skip: gameInclusion.gameSkip(page),
    take: gameInclusion.gameTake,
  });

exports.getRandomIds = async (count = 3) =>
  await prisma.$queryRaw`SELECT id FROM games WHERE deleted_at IS NULL AND is_verified = true ORDER BY rand() LIMIT ${count}`;

exports.searchGames = async (searchTerm, page) =>
  await prisma.game.findMany({
    where: {
      AND: [
        { deletedAt: null },
        { isVerified: true },
        {
          OR: [
            {
              slug: {
                contains: searchTerm,
              },
            },
            {
              gameTags: {
                some: {
                  tag: {
                    slug: {
                      contains: searchTerm,
                    },
                  },
                },
              },
            },
            {
              gameGenres: {
                some: {
                  genre: {
                    slug: {
                      contains: searchTerm,
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    },
    include: gameInclusion.gameInclude,
    skip: gameInclusion.gameSkip(page),
    take: gameInclusion.gameTake,
  });

exports.getGameByGameId = async (id) =>
  await prisma.game.findFirst({
    where: {
      deletedAt: null,
      id,
    },
    include: gameInclusion.gameInclude,
  });

exports.getGamesByGameIds = async (idArray) =>
  await prisma.game.findMany({
    where: {
      deletedAt: null,
      id: {
        in: idArray,
      },
    },
    include: gameInclusion.gameInclude,
  });

exports.getGamesByUserId = async (userId) =>
  await prisma.game.findMany({
    where: {
      deletedAt: null,
      isVerified: true,
      gameCollections: {
        some: {
          userId,
        },
      },
    },
    include: { ...gameInclusion.gameInclude, gameCollections: true },
  });

exports.getGamesByTagId = async (tagId, page) =>
  await prisma.game.findMany({
    where: {
      gameTags: {
        some: {
          tagId,
        },
      },
      isVerified: true,
      deletedAt: null,
    },
    include: gameInclusion.gameInclude,
    skip: gameInclusion.gameSkip(page),
    take: gameInclusion.gameTake,
  });

exports.getGamesByGenreId = async (genreId, page) =>
  await prisma.game.findMany({
    where: {
      gameGenres: {
        some: {
          genreId,
        },
      },
      isVerified: true,
      deletedAt: null,
    },
    include: gameInclusion.gameInclude,
    skip: gameInclusion.gameSkip(page),
    take: gameInclusion.gameTake,
  });

exports.getUnverified = async () =>
  await prisma.game.findMany({
    where: {
      isVerified: false,
      deletedAt: null,
    },
    include: { user: true, ...gameInclusion.gameInclude },
  });

exports.create = async (data) => await prisma.game.create({ data });

exports.update = async (id, data) =>
  await prisma.game.update({
    where: {
      id,
    },
    data,
    include: gameInclusion.gameInclude,
  });
