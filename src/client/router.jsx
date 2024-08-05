import { Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Plantillas from "./views/plantillas";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/Plantillas" element={<Plantillas></Plantillas>} />
    </Routes>
  );
};

export default AppRouter;
