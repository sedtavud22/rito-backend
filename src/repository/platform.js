const prisma = require("../config/prisma");

exports.getAll = async () => await prisma.platform.findMany();
