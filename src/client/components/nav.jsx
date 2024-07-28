const Nav = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <a href="">Stars</a>
      </h1>
      <div className="container-links-nav">
        <a className="link-nav" href="/">
          Inicio
        </a>
        <a className="link-nav" href="#aboutus">
          Sobre nosotros
        </a>
      </div>
    </nav>
  );
};

export default Nav;
