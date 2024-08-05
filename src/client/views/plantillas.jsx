import { Fragment } from "react";
import Nav from "../components/nav";

const Plantillas = () => {
  return (
    <Fragment>
      <Nav></Nav>
      <main className="container-main-plantillas">
        <h1 className="titulo-plantillas">Plantillas</h1>
        <div className="container-plantillas">
          <div className="plantilla">
            <img
              className="img-plantilla img-plantilla-1"
              src="/plantilla-1.webp"
              alt=""
            />
            <h4>Un mapa estelar</h4>
          </div>
          <div className="plantilla">
            <img className="img-plantilla" src="/plantilla-2.webp" alt="" />
            <h4>Dos mapas estelares</h4>
          </div>
          <div className="plantilla">
            <img className="img-plantilla" src="/plantilla-3.webp" alt="" />
            <h4>Tres mapas estelares</h4>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Plantillas;
