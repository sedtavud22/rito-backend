const repo = {
  user: require("./user"),
  game: require("./game"),
  genre: require("./genre"),
  tag: require("./tag"),
  platform: require("./platform"),
  screenshot: require("./screenshot"),

  // gameGenre: require("./game-genre"),
  // gameTag: require("./game-tag"),
  // gamePlatform: require("./game-platform"),

  cart: require("./cart"),
  friendship: require("./friendship"),
  stripe: require("./stripe"),
  gameCollection: require("./game-collection"),
  wishlist: require("./wishlist"),
  chat: require("./chat"),
  post: require("./post"),
  comment: require("./comment"),
  like: require("./like")
};
module.exports = repo;
