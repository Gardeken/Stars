import { useState, useEffect } from "react";

const ContainerReseñas = () => {
  const imagenesOriginales = [
    "/reseña-1.webp",
    "/reseña-2.webp",
    "/reseña-3.webp",
    "/reseña-4.webp",
    "/reseña-5.webp",
    "/reseña-6.webp",
    "/reseña-7.webp",
  ];

  const imagenes = [...imagenesOriginales, ...imagenesOriginales.slice(0, 4)];

  const [index, setIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [esMovil, setEsMovil] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth < 700);
    window.addEventListener("resize", handleResize);

    const intervalo = setInterval(() => {
      setTransitionEnabled(true);
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => {
      clearInterval(intervalo);
      window.removeEventListener("resize", handleResize);
    };
  }, [index]);

  const manejarTransitionEnd = () => {
    if (index >= imagenesOriginales.length) {
      setTransitionEnabled(false);
      setIndex(0);
    }
  };

  const multiplicador = esMovil ? 100 : 25;

  return (
    <div className="container-reseñas-v2">
      <div
        className="slider-movil"
        onTransitionEnd={manejarTransitionEnd}
        style={{
          transform: `translateX(-${index * multiplicador}%)`,
          transition: transitionEnabled ? "transform 0.6s ease-in-out" : "none",
          display: "flex",
          width: "100%",
        }}
      >
        {imagenes.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Reseña ${i + 1}`}
            className="imagen-carrusel"
          />
        ))}
      </div>
    </div>
  );
};

export default ContainerReseñas;
