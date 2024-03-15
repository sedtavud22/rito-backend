const repo = require("../repository")
const {CustomError} = require("../config/error")


exports.getAll = async(req,res,next) =>{
    try{
        const {postId} = req.params
        console.log(postId)
        const comments = await repo.comment.getAllCommentFromPostId(+postId)
        res.status(200).json({comments})
    }catch(err){
        next(err)
    }
}

exports.createComment = async(req,res,next) =>{
    try{
       
        const comment = await repo.comment.createComment(req.body)
        res.status(200).json({comment})
    }catch(err){
        next(err)
    }
}

