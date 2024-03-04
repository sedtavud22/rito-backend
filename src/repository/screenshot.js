const prisma = require("../config/prisma");

exports.createMany = async (dataArray) =>
  await prisma.screenShot.createMany({ data: dataArray });
