const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seeds = require("../src/db/seed");

async function seeding() {
  try {
    await prisma.$transaction([
      prisma.user.create({
        data: {
          username: "admin",
          password: "admin1234",
          isAdmin: true,
          firstName: "admin",
          lastName: "cc16",
          email: "admin@gmail.com",
        },
      }),
      prisma.game.createMany({ data: seeds.games.games }),
      prisma.genre.createMany({ data: seeds.genres.genres }),
      prisma.tag.createMany({ data: seeds.tags.tags, skipDuplicates: true }),
      prisma.platform.createMany({ data: seeds.platforms.platforms }),
      prisma.screenShot.createMany({ data: seeds.games.screenshots }),
      prisma.gamePlatform.createMany({ data: seeds.games.gamePlatforms }),
      prisma.gameGenre.createMany({ data: seeds.games.gameGenres }),
      prisma.gameTag.createMany({
        data: seeds.games.gameTags,
        skipDuplicates: true,
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
}
seeding();
