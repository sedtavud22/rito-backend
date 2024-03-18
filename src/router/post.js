const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const upload = require("../middlewares/upload")

const postRoute = express.Router()

postRoute.get("/",c.post.getAll)
postRoute.get("/search/:query",c.post.getSearchPost)
postRoute.get("/:postId",c.post.getPostById)
postRoute.post("/",
    authenticate,
    upload.single("imgUrl"),
    c.post.createPost)
postRoute.patch("/:postId",c.post.editPost)
postRoute.delete("/:postId",c.post.deletePost)

module.exports = postRoute