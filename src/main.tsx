import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import "./App.css";

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// Las rutas vienen prerenderizadas (scripts/prerender.mjs): se hidrata ese HTML.
// En `pnpm dev` el #root solo trae el comentario <!--app-html--> y se renderiza de cero.
if (root.firstElementChild) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
