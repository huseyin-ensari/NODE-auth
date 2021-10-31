const nodemailer = require('nodemailer');

const sendEmail = async (mailOptions) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    service: 'Gmail',
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
