const prisma = require("../config/prisma");

exports.getAll = async () => await prisma.tag.findMany();

exports.searchTags = async (searchTerm) =>
  await prisma.tag.findMany({
    where: {
      slug: {
        contains: searchTerm,
      },
    },
  });
