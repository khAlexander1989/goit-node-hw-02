const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(data) {
  const senderEmail = "khsanchos@gmail.com";

  try {
    await sgMail.send({ ...data, from: senderEmail });
    // console.log(`email: ${{ ...data, from: senderEmail }} has sent`);
    return true;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  sendEmail,
};
