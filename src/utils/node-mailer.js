const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp@gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

exports.sendMail = (message) => transporter.sendMail(message);
