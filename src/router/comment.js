const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")

const commentRoute = express.Router()

commentRoute.get("/:postId",c.comment.getAll)
commentRoute.post("/",c.comment.createComment)

module.exports = commentRoute