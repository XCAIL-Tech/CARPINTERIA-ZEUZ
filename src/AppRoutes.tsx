import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import AcercaDe from "./pages/AcercaDe";
import Contacto from "./pages/Contacto";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";

/** Rutas compartidas entre el navegador (BrowserRouter) y el prerender (StaticRouter). */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/:categoria" element={<Productos />} />
      <Route path="/acerca-de" element={<AcercaDe />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/preguntas-frecuentes" element={<Faq />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
