const { PrismaClient, Role } = require("@prisma/client")
const prisma = new PrismaClient()

async function seeding() {
    await prisma.user.create({
        data: {
            username: "admin",
            password: "admin1234",
            isAdmin: true,
            firstName: "admin",
            lastName: "cc16",
            email: "admin@gmail.com",
        },
    })
}
seeding()
