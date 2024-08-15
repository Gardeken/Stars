import express from "express";
import ViteExpress from "vite-express";
import nodemailer from "nodemailer";

const app = express();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "gardeken1205@gmail.com",
    pass: "wlfd rhfz tffz nobz",
  },
});

/*transporter.sendMail({
  from: '"Stars" <dominicode.xyz@gmail.com>',
  to: `pedroignacio931@gmail.com`,
  subject: "Pedido",
  text: `Pedido de Pedro Centeno`,
  html: `
    `,
});
*/
ViteExpress.listen(app, 4000, () =>
  console.log("Server is listening on port 4000")
);
