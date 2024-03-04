const prisma = require("../config/prisma");

exports.createMany = async (dataArray) =>
  await prisma.gameTag.createMany({ data: dataArray });
