const Nav = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">stars</h1>
      <div className="container-links-nav">
        <a className="link-nav" href="/">
          Inicio
        </a>
        <a className="link-nav" href="/about">
          Sobre nosotros
        </a>
        <a className="link-nav" href="/contact">
          Contactanos
        </a>
      </div>
    </nav>
  );
};

export default Nav;
