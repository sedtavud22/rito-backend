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
      paymentMethod
    );

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    next(error);
  }
};

exports.getSessionStatus = async (req, res, next) => {
  try {
    console.log(req.query.session_id);
    const session = await repo.stripe.getPaymentSessionStatus(
      req.query.session_id
    );
    console.log(session);

    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
