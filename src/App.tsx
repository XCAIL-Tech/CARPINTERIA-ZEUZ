import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import AcercaDe from "./pages/AcercaDe";
import Contacto from "./pages/Contacto";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:categoria" element={<Productos />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/preguntas-frecuentes" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
