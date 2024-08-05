import "./index.css";

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home";
import AppRouter from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<p>Cargando</p>}>
        <AppRouter></AppRouter>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
