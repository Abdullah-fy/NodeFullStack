const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log('Transporter error:', error);
    } else {
      console.log('Server is ready to send emails');
    }
  });

  // define the email options
  const mailOptions = {
    from: 'noiressence01@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
