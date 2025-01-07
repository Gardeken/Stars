import { useState, useEffect, useRef } from "react";

const ContainerReseñas = () => {
  const [tiempoR, setTiempoR] = useState(0);
  const tiempoRId = useRef();

  useEffect(() => {
    tiempoRId.current = setInterval(() => {
      setTiempoR((prev) => {
        prev + 1;
        if (prev < 5) {
          return prev + 1;
        } else {
          return (prev = 0);
        }
      });
    }, 3000);
    return () => clearInterval(tiempoRId.current);
  });

  function cambioR() {
    if (tiempoR === 1) {
      return "animation1-R";
    } else if (tiempoR === 2) {
      return "animation2-R";
    } else if (tiempoR === 3) {
      return "animation3-R";
    } else if (tiempoR === 4) {
      return "animation4-R";
    } else if (tiempoR === 5) {
      return "animation5-R";
    } else {
      return "";
    }
  }

  return (
    <div className="container-reseñas">
      <img className={`reseña-1 ${cambioR()}`} src="/reseña-1.webp" alt="" />
      <img className={`reseña-2 ${cambioR()}`} src="/reseña-2.webp" alt="" />
      <img className={`reseña-3 ${cambioR()}`} src="/reseña-3.webp" alt="" />
      <img className={`reseña-4 ${cambioR()}`} src="/reseña-4.webp" alt="" />
      <img className={`reseña-5 ${cambioR()}`} src="/reseña-5.webp" alt="" />
      <img className={`reseña-6 ${cambioR()}`} src="/reseña-6.webp" alt="" />
      <img className={`reseña-7 ${cambioR()}`} src="/reseña-7.webp" alt="" />
    </div>
  );
};

export default ContainerReseñas;
