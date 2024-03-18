const prisma = require("../config/prisma")
const {postInclusion} = require("../utils")

exports.getAll = async() =>
    await prisma.communityPost.findMany({
        include:postInclusion.postInclude
    })

exports.getPostById = async(id) =>
    await prisma.communityPost.findFirst({
        where:{id},
        include:postInclusion.postInclude
    })

exports.createPost = async(data)=> await prisma.communityPost.create({
    data,
    include:postInclusion.postInclude
})

exports.updatePost = async(id,data)=> await prisma.communityPost.update({
    where:{id},
    data,
    include:postInclusion.postInclude
})

exports.deletePost = async(id)=> await prisma.communityPost.delete({where:{id}})

