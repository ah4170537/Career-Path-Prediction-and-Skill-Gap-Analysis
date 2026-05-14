const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 1 minute.`,
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP sent to:', to);
  } catch (err) {
    console.log('Email sending error:', err);
  }
};

module.exports = sendOTPEmail;