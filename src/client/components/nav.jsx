const Nav = () => {
  function animacionNav() {
    const links = document.querySelector(".container-links-sec-nav");
    links.classList.toggle("animacion-click-nav");
  }
  return (
    <nav className="navbar">
      <h1 className="logo">
        <a href="/">
          <img className="imageStars" src="/LOGOS STARS.png" alt="" />
        </a>
        <a href="/">Stars</a>
      </h1>
      <div className="container-links-nav">
        <a className="link-nav" href="/">
          Inicio
        </a>
        <a className="link-nav" href="#aboutus">
          Sobre nosotros
        </a>
      </div>
      <div onClick={animacionNav} className="svg-ham">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="svg-ham"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <div className="container-links-sec-nav">
        <a className="link-nav" href="/">
          Inicio
        </a>
        <a className="link-nav" href="/#aboutus">
          Sobre nosotros
        </a>
      </div>
    </nav>
  );
};

export default Nav;
