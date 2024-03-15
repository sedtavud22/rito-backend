const prisma = require("../config/prisma")

exports.getAllCommentFromPostId = async(postId) =>
    await prisma.comment.findMany({
        where:{communityPostId:postId},
        include:{
            commentLike:true,
            user:{
                select:{
                    id:true,
                    displayName:true,
                    profileImageUrl:true
                }
            }
        }
    })

exports.createComment = async(data) => await prisma.comment.create({data})
