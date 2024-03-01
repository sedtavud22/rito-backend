const platformData = require("../data/platforms.json")

const results = []

platformData.forEach((el) => results.push(...el.results))

exports.platforms = results.map((platform) => ({
    id: platform.id,
    name: platform.name,
    slug: platform.slug,
}))
