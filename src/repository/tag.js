const prisma = require("../config/prisma");

exports.getAll = async () => await prisma.tag.findMany();

exports.findIdByName = async (name) =>
  await prisma.tag.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
    },
  });
