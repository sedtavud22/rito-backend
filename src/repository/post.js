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

exports.createPost = async(data)=> await prisma.communityPost.create({data})


