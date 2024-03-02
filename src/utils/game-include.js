exports.gameInclude = {
  gameGenres: {
    select: {
      genre: true,
    },
  },
  gameTags: {
    select: {
      tag: true,
    },
  },
  gamePlatforms: {
    select: {
      platform: true,
    },
  },
  screenshots: true,
  gameReviews: {
    include: {
      user: true,
    },
  },
};
