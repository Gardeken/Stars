import { Fragment } from "react";
import Nav from "../components/nav";

const Home = () => {
  return (
    <Fragment>
      <Nav></Nav>
      <main className="container-main">
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
      </main>
    </Fragment>
  );
};

export default Home;
