const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "rrv34_node_dz@ukr.net",
    pass: "EXItGsQOaC7O6mSC",
  },
});

async function sendEmail({ userName, userEmail, userText }) {
  const output = `
    <h1 style="color: blue; font-size: 20px">Ви отримали листа від ${userName}</h1>
    <p>Його контактна пошта ${userEmail}</p>
    <p>Текст повідомлення ${userText}</p>
    <p style="color: green">Дякую, будьте здорові!</p>`;

  const info = await transporter.sendMail({
    from: "rrv34_node_dz@ukr.net", // sender address
    to: "slipknotmisha@gmail.com", // list of receivers
    subject: "Повідомлення для директора. Скарга", // Subject line
    text: userText, // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
