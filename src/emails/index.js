const sgMail = require("@sendgrid/mail");

const API_KEY =
  "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";

sgMail.setApiKey(API_KEY);

const message = {
  to: "juanjose1@live.it",
  from: "juanjose1@live.it",
  subject: "TEST",
  text: "HELLO THIS IS A TEST",
};

sgMail
  .send(message)
  .then((response) => console.log("Email sent!"))
  .catch((error) => console.log(error.message));
