const prisma = require("../config/prisma");
const { gameInclusion } = require("../utils");

exports.getByUserId = async (userId) =>
  prisma.gameCollection.findMany({
    where: {
      userId,
    },
    include: {
      game: {
        include: gameInclusion.gameInclude,
      },
    },
  });
