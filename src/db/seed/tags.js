const tagData = require("../data/tags.json");

const results = [];

tagData.forEach((el) => results.push(...el.results));

exports.tags = results.map((tag) => ({
  id: tag.id,
  name: tag.name,
  slug: tag.slug,
  backgroundImageUrl: tag.image_background,
}));
