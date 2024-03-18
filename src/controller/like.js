const repo = require("../repository")
const {CustomError} = require("../config/error")

exports.toggleLikePost = async (req,res,next) => {
    const userId =  req.user.id
    const {postId} = req.params
    console.log(userId,postId,req.params)
    try{
        const likePost = await repo.like.findLikePost(userId,+postId)
        if(!likePost){
            await repo.like.likePost(userId,+postId)
            return res.status(200).json({message:"like post"})
        }
        if(likePost){
            await repo.like.dislikePost(userId,+postId)
            return res.status(200).json({message:"dislike post"})
        }
    }catch(err){
        next(err)
    }
}

exports.toggleLikeComment = async (req,res,next) => {
    const userId =  req.user.id
    const {commentId} = req.params
    console.log(userId,commentId,req.params)
    try{
        const likeComment = await repo.like.findLikeComment(userId,+commentId)
        if(!likeComment){
            await repo.like.likeComment(userId,+commentId)
            return res.status(200).json({message:"like comment"})
        }
        if(likeComment){
            await repo.like.dislikeComment(userId,+commentId)
            return res.status(200).json({message:"dislike comment"})
        }
    }catch(err){
        next(err)
    }
}
