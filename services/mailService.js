const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

module.exports = (email, txt, url, attachments) => {
  if (!email) return false;

  const mailOptions = {
    from: "",
    to: email,
    subject: "",
    html: ``,
  };
  if (attachments) {
    mailOptions["attachments"] = attachments;
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};
