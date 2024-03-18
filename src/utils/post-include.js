exports.postInclude = {
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