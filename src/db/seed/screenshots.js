const screenshotData = require("../data/screenshots.json");

const screenshots = [];

screenshotData.forEach((game) =>
  game.results.forEach((screenshot) =>
    screenshots.push({ imageUrl: screenshot.image, gameId: game.gameId })
  )
);

exports.screenshots = screenshots;
