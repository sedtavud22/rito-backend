const express = require('express')
const c = require("../controller")
const authenticate = require("../middlewares/authenticate")

const likeRoute = express.Router()

likeRoute.post("/post/:postId",authenticate,c.like.toggleLikePost)
likeRoute.post("/comment/:commentId",authenticate,c.like.toggleLikeComment)

module.exports = likeRoute