import express from "express";
const emailRouter = express.Router();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "gardeken1205@gmail.com",
    pass: "wlfd rhfz tffz nobz",
  },
});

emailRouter.post("/sendEmail", async (req, res) => {
  try {
    const { name, email, telf, medida, metodo, id, link, spotify } = req.body;
    console.log(spotify);
    const without = `<div style="text-align: center;">
      <p>Nombre: ${name}</p>
      <p style="text-decoration: none;">Correo: ${email}</p>
      <p>Telf: ${telf}</p>
      <p>Metodo: ${metodo}</p>
      <p>Medida: ${medida}</p>
      <p>ID del mapa: ${id}</p>
      <a style="color: white; margin: 1rem; text-decoration: none; border-radius: .5rem; padding: .8rem; background-color: #846449;" download href="${link}">Descargar mapa</a>
      </div>`;
    const withSP = `
      <div style="text-align: center;">
      <p>Nombre: ${name}</p>
      <p style="text-decoration: none;">Correo: ${email}</p>
      <p>Telf: ${telf}</p>
      <p>Metodo: ${metodo}</p>
      <p>Medida: ${medida}</p>
      <p>ID del mapa: ${id}</p>
      <p>Link Spotify: ${spotify}</p>
      <a style="color: white; margin: 1rem; text-decoration: none; border-radius: .5rem; padding: .8rem; background-color: #846449;" download href="${link}">Descargar mapa</a>
      </div>`;
    transporter.sendMail({
      from: '"Stars" <dominicode.xyz@gmail.com>',
      to: `${email}`,
      subject: "Pedido",
      text: `Pedido de ${name}`,
      html: spotify ? withSP : without,
    });

    transporter.sendMail({
      from: '"Stars" <dominicode.xyz@gmail.com>',
      to: `${email}`,
      subject: "Pedido",
      text: `Pedido de ${name}`,
      html: `<p style="text-align: center;">Gracias por realizar su pedido, le estaremos contactando dentro de poco.</p>`,
    });
    res.status(200).json({
      message: "Se ha enviado el correo con éxito",
    });
  } catch (error) {
    res.status(400).json({ message: "Hubo un error inesperado" });
    console.log(error);
  }
});

export default emailRouter;
