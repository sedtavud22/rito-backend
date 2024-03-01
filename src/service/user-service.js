const prisma = require ('../config/prisma')



exports.createUser = data => prisma.users.create({data})