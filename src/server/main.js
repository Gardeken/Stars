import express from "express";
import ViteExpress from "vite-express";
import emailRouter from "./controllers/emailRouter.js";

const app = express();
app.use(express.json());

app.use("/api/email", emailRouter);

ViteExpress.listen(app, 4000, () =>
  console.log("Server is listening on port 4000")
);
