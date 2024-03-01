const genreData = require("../data/genres.json")

const { results } = genreData

exports.genres = results.map((genre) => ({
    id: genre.id,
    name: genre.name,
    slug: genre.slug,
    backgroundImageUrl: genre.image_background,
}))
