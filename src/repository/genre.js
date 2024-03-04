const prisma = require("../config/prisma");

exports.getAll = async () => await prisma.genre.findMany();

exports.findIdByName = async (name) =>
  await prisma.genre.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
    },
  });
