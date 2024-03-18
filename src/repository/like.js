const prisma = require("../config/prisma")

exports.findLikePost = async(userId,postId) =>
    await prisma.postLike.findFirst({
        where:{
            AND:[
                {postLikerId:userId},
                {postId}
            ]
        }
    })

exports.likePost = async(userId,postId) =>
    await prisma.postLike.create({
        data:{
            postLikerId:userId,
            postId
        }
    })

exports.dislikePost = async(userId,postId) =>
    await prisma.postLike.deleteMany({
        where:{
            AND:[
                {postLikerId:userId},
                {postId}
            ]
        }
    })
    
exports.findLikeComment = async(userId,commentId) =>
    await prisma.commentLike.findFirst({
        where:{
            AND:[
                {commentLikerId:userId},
                {commentId}
            ]
        }
    })

exports.likeComment = async(userId,commentId) =>
    await prisma.commentLike.create({
        data:{
            commentLikerId:userId,
            commentId
        }
    })

exports.dislikeComment = async(userId,commentId) =>
    await prisma.commentLike.deleteMany({
        where:{
            AND:[
                {commentLikerId:userId},
                {commentId}
            ]
        }
    })