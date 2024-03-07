const repo = require("../repository");
const utils = require("../utils");
const { CustomError } = require("../config/error");

exports.createSession = async (req, res, next) => {
  const { paymentMethod } = req.body;

  try {
    const cartData = await repo.cart.getCartItemsByUserId(req.user.id);

    const lineItems = cartData.map((item) => ({
      price_data: {
        currency: "thb",
        product_data: {
          name: item.game.name,
          images: [item.game.backgroundImageUrl],
        },
        unit_amount_decimal: item.game.price * 100,
      },
      quantity: 1,
    }));

    const session = await repo.stripe.createPaymentSession(
      lineItems,
      paymentMethod,
      req.user.email
    );

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    next(error);
  }
};

exports.getSessionStatus = async (req, res, next) => {
  try {
    const session = await repo.stripe.getPaymentSession(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAfterPayment = async (req, res, next) => {
  const { sessionId, cartData } = req.body;

  try {
    const session = await repo.stripe.getPaymentSession(sessionId);
    if (!session || session.payment_status !== "paid") {
      throw new CustomError(
        "Payment session does not exists",
        "PAYMENT_SESSION_NOT_FOUND",
        402
      );
    }

    await repo.payment.updateAfterPayment(cartData, req.user.id);

    const gameCollections = await repo.gameCollection.getByUserId(req.user.id);
    res.status(200).json({ gameCollections });
  } catch (error) {
    next(error);
  }
};
