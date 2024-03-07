const prisma = require("../config/prisma");

exports.updateAfterPayment = (cartData, userId) =>
  prisma.$transaction(async (tx) => {
    // 1.Create Order
    const order = await tx.order.create({
      data: {
        userId,
      },
    });

    const orderItemsDataArray = cartData.map((item) => ({
      orderId: order.id,
      gameId: item.gameId,
    }));

    // 2.Create Orderitems
    const orderItems = await tx.orderItem.createMany({
      data: orderItemsDataArray,
    });

    const gameCollectionsDataArray = cartData.map((item) => ({
      userId,
      gameId: item.gameId,
    }));

    // 3.Create GameCollection
    const gameCollections = await tx.gameCollection.createMany({
      data: gameCollectionsDataArray,
    });

    return gameCollections;
  });
