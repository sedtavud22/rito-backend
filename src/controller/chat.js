const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.getHistoryChat = async (req, res, next) => {
  const { receiverId } = req.params;
  try {
    const chats = await repo.chat.getHistoryChat(req.user.id, +receiverId);
    res.status(200).json({ chats });
  } catch (error) {
    next(error);
  }
};
