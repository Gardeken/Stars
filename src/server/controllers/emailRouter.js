import express from "express";
const emailRouter = express.Router();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "stars.ve.25@gmail.com",
    pass: "aalk gzlw pilc emjc",
  },
});

emailRouter.post("/sendEmail", async (req, res) => {
  try {
    const { name, email, telf, medida, metodo, id, link, spotify } = req.body;
    let containerID = `<p>ID del mapa: ${id[0]}</p>`;
    if (id[2]) {
      containerID = `
      <p>ID del mapa 1: ${id[0]}</p>
      <p>ID del mapa 2: ${id[1]}</p> 
      <p>ID del mapa 3: ${id[2]}</p> 
      `;
    } else if (id[1]) {
      containerID = `
      <p>ID del mapa 1: ${id[0]}</p>
      <p>ID del mapa 2: ${id[1]}</p> 
      `;
    }
    let containerLink = `<a style="color: white; margin: 1rem; text-decoration: none; border-radius: .5rem; padding: .8rem; background-color: #846449;" download href="${link[0]}">Descargar mapa</a>`;
    if (link[2]) {
      containerLink = `
      <a style="color: white; margin: 1rem; text-decoration: none; border-radius: .5rem; padding: .8rem; background-color: #846449;" download href="${link[0]}">Descargar mapa 1</a>
      <a style="color: white; margin: 1rem; text-decoration: none; border-radius: .5rem; padding: .8rem; background-color: #846449;" download href="${link[1]}">Descargar mapa 2</a>
      <a style="color: white; margin: 1rem; text-decoration: none; border-radius: .5rem; padding: .8rem; background-color: #846449;" download href="${link[2]}">Descargar mapa 3</a>
      `;
    } else if (link[1]) {
      containerLink = `
      <a style="color: white; margin: 1rem; text-decoration: none; border-radius: .5rem; padding: .8rem; background-color: #846449;" download href="${link[0]}">Descargar mapa 1</a>
      <a style="color: white; margin: 1rem; text-decoration: none; border-radius: .5rem; padding: .8rem; background-color: #846449;" download href="${link[1]}">Descargar mapa 2</a>
      `;
    }

    const without = `<div style="text-align: center;">
      <p>Nombre: ${name}</p>
      <p style="text-decoration: none;">Correo: ${email}</p>
      <p>Telf: ${telf}</p>
      <p>Metodo: ${metodo}</p>
      <p>Medida: ${medida}</p>
      ${containerID}
      ${containerLink}
      </div>`;
    const withSP = `
      <div style="text-align: center;">
      <p>Nombre: ${name}</p>
      <p style="text-decoration: none;">Correo: ${email}</p>
      <p>Telf: ${telf}</p>
      <p>Metodo: ${metodo}</p>
      <p>Medida: ${medida}</p>
      ${containerID}
      <p>Link Spotify: ${spotify}</p>
      ${containerLink}
      </div>`;
    transporter.sendMail({
      from: '"Stars" <dominicode.xyz@gmail.com>',
      to: "stars.ve.25@gmail.com",
      subject: "Pedido",
      html: spotify ? withSP : without,
    });

    transporter.sendMail({
      from: '"Stars" <dominicode.xyz@gmail.com>',
      to: `${email}`,
      subject: "Pedido",
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
