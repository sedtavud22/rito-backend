const prisma = require("../config/prisma");

exports.createMany = async (dataArray) =>
  await prisma.gamePlatform.createMany({ data: dataArray });
