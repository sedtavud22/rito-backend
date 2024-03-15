const repo = require("../repository")
const {CustomError} = require("../config/error")
const service = require("../service")

exports.getAll = async (req,res,next) =>{
    try{
        const posts = await repo.post.getAll()
        res.status(200).json({posts})
    }catch(err){
        next(err)
    }
}

exports.createPost = async (req,res,next) =>{
    try{
        
        const post = await repo.post.createPost(req.body)
        res.status(200).json({post})
    }catch(err){
        next(err)
    }
}