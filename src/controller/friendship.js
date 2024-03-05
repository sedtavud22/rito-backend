const repo = require("../repository")
const {CustomError} = require("../config/error")
const { FriendStatus } = require("../constant/enum")


exports.requestFriend = async(req,res,next) =>{
    const userId = req.user.id
    const targetUserId = req.targetUserId

    try{
        const isExistUser = await repo.user.get({id:targetUserId})
        if(!isExistUser){
            throw new CustomError("no user founded","WRONG_INPUT",400)
        }
    
        const isRequested = await repo.friendship.checkExistFriendship(userId,targetUserId)
        console.log(isRequested);
        if(isRequested){
            throw new CustomError("request already exist","WRONG_INPUT",400)
        }
        const status = FriendStatus.PENDING
        await repo.friendship.createFriendship(userId,targetUserId,status)
        res.status(200).json({message:"request done"})
    }catch(err){
        next(err)
    }
}


exports.acceptFriend = async(req,res,next) =>{
    const userId = req.user.id
    const targetUserId = req.targetUserId
    try{
        const pendingFriendship = await repo.friendship.findFriendship({
            status: FriendStatus.PENDING,
            senderId: targetUserId,
            receiverId: userId
        })
        console.log(pendingFriendship);
        if(!pendingFriendship){
            throw new CustomError("no request found","WRONG_INPUT",400)
        }
        await repo.friendship.updateFriendship(
            pendingFriendship.id,
            {status:FriendStatus.ACCEPTED}
        )
        res.status(200).json({message:"accepted request"})
    }catch(err){
        next(err)
    }
}

exports.rejectFriend = async(req,res,next) =>{
    const userId = req.user.id
    const targetUserId = req.targetUserId
    try{
        const pendingFriendship = await repo.friendship.findFriendship({
            status: FriendStatus.PENDING,
            senderId: targetUserId,
            receiverId: userId
        })
        if(!pendingFriendship){
            throw new CustomError("no request found","WRONG_INPUT",400)
        }
        await repo.friendship.updateFriendship(
            pendingFriendship.id,
            {status:FriendStatus.REJECTED}
        )
        res.status(200).json({message:"rejected request"})
    }catch(err){
        next(err)
    }
}

exports.cancelRequest = async(req,res,next) =>{
    const userId = req.user.id
    const targetUserId = req.targetUserId
    try{
        const pendingFriendship = await repo.friendship.findFriendship({
            status: FriendStatus.PENDING,
            senderId: userId,
            receiverId: targetUserId
        })
        await repo.friendship.deleteFriendship(pendingFriendship.id)
        res.status(200).json({message:"cancel request"})
    }catch(err){
        next(err)
    }
}


exports.getAllFriendbyUserId = async(req,res,next) =>{
    const targetUserId = req.targetUserId
    try{
        const allFriends = await repo.friendship.findFriendsIDByUserId(targetUserId)
        res.status(200).json(allFriends)
    }catch(err){
        next(err)
    }
}

