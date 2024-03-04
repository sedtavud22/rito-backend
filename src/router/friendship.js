const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const {validateTargetUserId} = require("../middlewares/validator/validate-user")
const friendshipRoute = express.Router()

friendshipRoute.post("/:targetUserId",
    authenticate,
    validateTargetUserId,
    c.friendship.requestFriend
)

friendshipRoute.patch("/:targetUserId/accept",
    authenticate,
    validateTargetUserId,
    c.friendship.acceptFriend
)

friendshipRoute.patch("/:targetUserId/reject",
    authenticate,
    validateTargetUserId,
    c.friendship.rejectFriend
)

friendshipRoute.delete("/:targetUserId",
    authenticate,
    validateTargetUserId,
    c.friendship.cancelRequest
)




module.exports = friendshipRoute
