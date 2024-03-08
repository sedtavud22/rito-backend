const prisma = require("../config/prisma");

exports.getAll = async () => await prisma.genre.findMany();

exports.searchGenres = async (searchTerm) =>
  await prisma.genre.findMany({
    where: {
      slug: {
        contains: searchTerm,
      },
    },
  });
