const prisma = require("../config/prisma");
const { gameInclusion } = require("../utils");

exports.getByUserId = async (userId) =>
  await prisma.wishlist.findMany({
    where: {
      userId,
    },
    include: {
      game: {
        include: gameInclusion.gameInclude,
      },
    },
  });

exports.create = async (userId, gameId) =>
  await prisma.wishlist.create({
    data: {
      userId,
      gameId,
    },
    include: {
      game: {
        include: gameInclusion.gameInclude,
      },
    },
  });

exports.delete = async (id) =>
  await prisma.wishlist.delete({
    where: {
      id,
    },
  });

exports.deleteAllByUserId = async (userId) =>
  await prisma.wishlist.deleteMany({
    where: {
      userId,
    },
  });
