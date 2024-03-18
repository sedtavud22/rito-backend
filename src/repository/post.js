const prisma = require("../config/prisma")

exports.getAll = async() =>
    await prisma.communityPost.findMany({
        include:{
            user:{
                select:{
                    id:true,
                    displayName:true,
                    profileImageUrl:true
                }
            },
            game:{
                select:{
                    id:true,
                    name:true,
                    backgroundImageUrl:true
                }
            },
            comments:true,
            PostLike:true
        }
    })

exports.getPostById = async(id) =>
    await prisma.communityPost.findFirst({
        where:{id},
        include:{
            user:{
                select:{
                    id:true,
                    displayName:true,
                    profileImageUrl:true
                }
            },
            game:{
                select:{
                    id:true,
                    name:true,
                    backgroundImageUrl:true
                }
            },
            comments:true,
            PostLike:true
        }
    })

exports.createPost = async(data)=> await prisma.communityPost.create({data})
exports.updatePost = async(id,data)=> await prisma.communityPost.update({
    where:{id},data
})

exports.deletePost = async(id)=> await prisma.communityPost.delete({where:{id}})

