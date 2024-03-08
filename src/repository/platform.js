const prisma = require("../config/prisma");

exports.getAll = async () => await prisma.platform.findMany();

exports.searchPlatforms = async (searchTerm) =>
  await prisma.platform.findMany({
    where: {
      slug: {
        contains: searchTerm,
      },
    },
  });
