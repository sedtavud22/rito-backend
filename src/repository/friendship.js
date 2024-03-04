const prisma = require("../config/prisma")
const {FriendStatus} = require("../constant/enum")
const {userFilter} = require("../utils/user-filter")

exports.createFriendship = async(senderId,receiverId,status) =>{
    await prisma.friendShip.create({
        data:{senderId,receiverId,status}
    })}

exports.checkExistFriendship = async(userId1,userId2) =>{
    return await prisma.friendShip.findFirst({
        where:{
            AND:[
                {
                    OR:[
                        {status: FriendStatus.PENDING},
                        {status: FriendStatus.ACCEPTED}
                    ]
                },
                {
                    OR:[
                        {senderId: userId1 , receiverId:userId2},
                        {senderId: userId2 , receiverId:userId1}
                    ]
                }
            ]
        }
    })}




exports.findFriendship = async(where) =>{
    return await prisma.friendShip.findFirst({where})
}

exports.updateFriendship = async(id,data) => {
    return await prisma.friendShip.update({
        where:{id},
        data
})}

exports.findFriendsIDByUserId = async(userId) =>{
    const friendShips = await prisma.friendShip.findMany({
        where:{
            OR:[{senderId:userId},{receiverId:userId}],
            status:FriendStatus.ACCEPTED
        },
        select:{
            sender:{userFilter},
            receiver:{userFilter}
        }
    })
    const friendsId = friendShips.map(el => el.sender.id === userId ? el.receiver : el.sender)
    return friendsId
}

exports.deleteFriendship = async(id)=>{
    await prisma.friendShip.delete({
        where:{id}
    })
}
