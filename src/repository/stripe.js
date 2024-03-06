const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentSession = async (lineItems, paymentMethod) =>
  await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: lineItems,
    payment_method_types: [paymentMethod],
    mode: "payment",
    return_url: `${process.env.WEB_DOMAIN}/checkout-return?session_id={CHECKOUT_SESSION_ID}`,
  });

exports.getPaymentSessionStatus = async (sessionId) =>
  await stripe.checkout.sessions.retrieve(sessionId);
