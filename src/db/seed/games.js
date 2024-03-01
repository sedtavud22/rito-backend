const results = require("../data/games.json");

exports.games = results.map((game) => ({
  id: game.id,
  isVerified: true,
  name: game.name,
  slug: game.slug,
  description: game.description,
  releasedDate: new Date(game.released),
  price: 12,
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

exports.screenshots = results.map((game) => ({
  gameId: game.id,
  imageUrl: game.background_image_additional,
}));

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
