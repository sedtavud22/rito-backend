const prisma = require("../config/prisma");

exports.createMany = async (dataArray) =>
  await prisma.gameGenre.createMany({ data: dataArray });
