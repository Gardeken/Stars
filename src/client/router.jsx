import { Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Plantillas from "./views/plantillas";
import Creacion from "./views/creacion";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/Plantillas" element={<Plantillas></Plantillas>} />
      <Route path="/Crear" element={<Creacion></Creacion>} />
    </Routes>
  );
};

export default AppRouter;
