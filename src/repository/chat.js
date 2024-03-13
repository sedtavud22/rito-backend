const prisma = require("../config/prisma");

exports.create = async (data) =>
  await prisma.chat.create({
    data,
    include: {
      chatSender: {
        select: {
          id: true,
          username: true,
          displayName: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true,
          isAdmin: true,
        },
      },
      chatReceiver: {
        select: {
          id: true,
          username: true,
          displayName: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true,
          isAdmin: true,
        },
      },
    },
  });

exports.getHistoryChat = async (senderId, receiverId) =>
  await prisma.chat.findMany({
    where: {
      OR: [
        { AND: [{ chatSenderId: senderId, chatReceiverId: receiverId }] },
        { AND: [{ chatSenderId: receiverId, chatReceiverId: senderId }] },
      ],
    },
    include: {
      chatSender: {
        select: {
          id: true,
          username: true,
          displayName: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true,
          isAdmin: true,
        },
      },
      chatReceiver: {
        select: {
          id: true,
          username: true,
          displayName: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true,
          isAdmin: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

exports.getAllChatForAdmin = async (adminId) =>
  await prisma.chat.findMany({
    where: {
      chatReceiverId: adminId,
    },
    distinct: ["chatSenderId", "chatReceiverId"],
    include: {
      chatSender: {
        select: {
          id: true,
          username: true,
          displayName: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true,
          isAdmin: true,
        },
      },
      chatReceiver: {
        select: {
          id: true,
          username: true,
          displayName: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true,
          isAdmin: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });
