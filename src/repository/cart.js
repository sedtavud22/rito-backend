const prisma = require("../config/prisma");
const { gameInclusion } = require("../utils");

exports.create = async (userId, gameId) =>
  await prisma.cart.create({
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
  await prisma.cart.delete({
    where: {
      id,
    },
  });

exports.deleteCartItemsByUserId = async (userId) =>
  await prisma.cart.deleteMany({
    where: {
      userId,
    },
  });

exports.getCartItemsByUserId = async (userId) =>
  await prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      game: {
        include: gameInclusion.gameInclude,
      },
    },
  });
