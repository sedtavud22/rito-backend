const prisma = require("../config/prisma");

exports.getAll = async () => await prisma.platform.findMany();

exports.findIdByName = async (name) =>
  await prisma.platform.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
    },
  });
