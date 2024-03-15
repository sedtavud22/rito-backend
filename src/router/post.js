const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const upload = require("../middlewares/upload")

const postRoute = express.Router()

postRoute.get("/",c.post.getAll)
postRoute.post("/",
    authenticate,
    upload.single("imgUrl"),
    c.post.createPost)

module.exports = postRoute