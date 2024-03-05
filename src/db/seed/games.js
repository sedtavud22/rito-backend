const results = require("../data/games.json");

const mockPrices = [
  99, 115, 149, 159, 199, 220, 275, 289, 299, 315, 319, 349, 369, 389, 399, 400,
  495, 499, 549, 559, 590, 599, 647, 699, 719, 739, 799, 809, 1189, 1190, 1197,
  1290, 1490, 1499, 1600, 1899, 1979,
];

exports.games = results.map((game) => ({
  id: game.id,
  isVerified: true,
  name: game.name,
  slug: game.slug,
  description: game.description,
  releasedDate: new Date(game.released),
  price: mockPrices[Math.floor(Math.random() * mockPrices.length)],
  backgroundImageUrl: game.background_image,
  metacritic: game.metacritic,
  publisherId: 1,
}));

const gameGenres = [];

results.forEach((game) =>
  game.genres.forEach((genre) =>
    gameGenres.push({ gameId: game.id, genreId: genre.id })
  )
);

exports.gameGenres = gameGenres;

const gameTags = [];

results.forEach((game) =>
  game.tags.forEach((tag) => gameTags.push({ gameId: game.id, tagId: tag.id }))
);

exports.gameTags = gameTags;

const gamePlatforms = [];

results.forEach((game) =>
  game.platforms.forEach((platform) =>
    gamePlatforms.push({ gameId: game.id, platformId: platform.platform.id })
  )
);

exports.gamePlatforms = gamePlatforms;
