import { Fragment, useEffect, useRef, useState } from "react";
import Nav from "../components/nav";

const Home = () => {
  const [tiempo, setTiempo] = useState(1);
  const tiempoId = useRef();
  useEffect(() => {
    tiempoId.current = setInterval(() => {
      setTiempo((prev) => {
        prev + 1;
        if (prev < 5) {
          return prev + 1;
        } else {
          return (prev = 0);
        }
      });
    }, 4000);
    return () => clearInterval(tiempoId.current);
  });
  function cambio() {
    if (tiempo === 1) {
      return "animation1";
    } else if (tiempo === 2) {
      return "animation2";
    } else if (tiempo === 3) {
      return "animation3";
    } else if (tiempo === 4) {
      return "animation4";
    } else if (tiempo === 5) {
      return "animation5";
    } else {
      return "";
    }
  }

  function cambio2() {
    if (tiempo === 1) {
      return "animation1-5";
    } else if (tiempo === 2) {
      return "animation2";
    } else if (tiempo === 3) {
      return "animation3";
    } else if (tiempo === 4) {
      return "animation4";
    } else if (tiempo === 5) {
      return "animation5";
    } else {
      return "";
    }
  }

  return (
    <Fragment>
      <Nav></Nav>
      <main className="container-main">
        <div className="container-video-text">
          <div className="container-texto-vid">
            <section className="eslogan">
              <h2>Creamos</h2>
              <h3>Recuerdos</h3>
            </section>
            <div className="container-btn-crea">
              <button>Crea tu cruadro</button>
            </div>
          </div>
          <div className="container-gif">
            <video autoPlay loop muted>
              <source src="src/client/assets/estrellas.mp4" type="video/mp4" />
            </video>
          </div>
          <img
            className="constelaciones img1"
            src="src/client/assets/constelaciones.webp"
          />
          <img
            className="constelaciones img2"
            src="src/client/assets/constelaciones2.webp"
          />
        </div>
        <div className="container-galery-text">
          <div className="text-galery">
            <h3>¿Qué es un mapa estelar?</h3>
          </div>
          <div className="container-galery">
            <img
              className={`image-galery ${cambio()} ${
                tiempo === 1 ? "opacity" : ""
              }`}
              src="src/client/assets/galery-image1.png"
              alt=""
            />
            <img
              className={`image-galery ${cambio()} ${
                tiempo === 2 ? "opacity" : ""
              }`}
              src="src/client/assets/galery-image2.png"
              alt=""
            />
            <img
              className={`image-galery ${cambio()} ${
                tiempo === 3 ? "opacity" : ""
              }`}
              src="src/client/assets/galery-image3.png"
              alt=""
            />
            <img
              className={`image-galery ${cambio()} ${
                tiempo === 4 ? "opacity" : ""
              }`}
              src="src/client/assets/galery-image4.png"
              alt=""
            />
            <img
              className={`image-galery ${cambio2()} ${
                tiempo === 5 ? "opacity" : ""
              } ${tiempo === 0 ? "animation0 opacity" : ""}`}
              src="src/client/assets/galery-image5.png"
              alt=""
            />
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
