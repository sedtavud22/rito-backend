const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentSession = async (lineItems, paymentMethod, email) =>
  await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: lineItems,
    payment_method_types: [paymentMethod],
    customer_email: email,
    mode: "payment",
    return_url: `${process.env.WEB_DOMAIN}/checkout-return?session_id={CHECKOUT_SESSION_ID}`,
  });

exports.getPaymentSession = async (sessionId) =>
  await stripe.checkout.sessions.retrieve(sessionId);
