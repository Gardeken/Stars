import { Fragment } from "react";
import Nav from "../components/nav";

const Home = () => {
  return (
    <Fragment>
      <Nav></Nav>
      <main className="container-main">
        <div className="container-gif">
          <video autoPlay loop muted>
            <source src="src/client/assets/estrellas.mp4" type="video/mp4" />
          </video>
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
