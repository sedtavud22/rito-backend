const prisma = require("../config/prisma");
const { gameInclusion } = require("../utils");

exports.getAll = async () =>
  await prisma.game.findMany({
    where: {
      deletedAt: null,
      isVerified: true,
    },
    include: gameInclusion.gameInclude,
  });

exports.getGameByGameId = async (id) =>
  await prisma.game.findFirst({
    where: {
      deletedAt: null,
      isVerified: true,
      id,
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
    include: gameInclusion.gameInclude,
  });

exports.getGamesByTagId = async (tagId) =>
  await prisma.game.findMany({
    where: {
      gameTags: {
        some: {
          tagId,
        },
      },
    },
    include: gameInclusion.gameInclude,
  });

exports.getGamesByGenreId = async (genreId) =>
  await prisma.game.findMany({
    where: {
      gameGenres: {
        some: {
          genreId,
        },
      },
    },
    include: gameInclusion.gameInclude,
  });

exports.create = async (data) =>
  await prisma.game.create({
    data,
  });

exports.update = async (id, data) =>
  await prisma.game.update({
    where: {
      id,
    },
    data,
  });