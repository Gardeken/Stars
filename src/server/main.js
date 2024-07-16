import express from "express";
import ViteExpress from "vite-express";

const app = express();

ViteExpress.listen(app, 4000, () =>
  console.log("Server is listening on port 4000"),
);
