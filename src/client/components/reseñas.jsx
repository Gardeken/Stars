import { useState, useEffect, useRef } from "react";

const ContainerReseñas = () => {
  const [tiempoR, setTiempoR] = useState(0);
  const tiempoRId = useRef();

  useEffect(() => {
    tiempoRId.current = setInterval(
      () => {
        setTiempoR((prev) => {
          prev + 1;
          if (prev < 7) {
            return prev + 1;
          } else {
            return (prev = 0);
          }
        });
      },
      tiempoR == 7 ? 500 : 3000
    );
    return () => clearInterval(tiempoRId.current);
  });

  function cambioR() {
    switch (tiempoR) {
      case 1:
        return "animation1-R";
      case 2:
        return "animation2-R";
      case 3:
        return "animation3-R";
      case 4:
        return "animation4-R";
      case 5:
        return "animation5-R";
      case 6:
        return "animation6-R";
      case 7:
        return "animation7-R";
      default:
        return "";
    }
  }

  function cambioR1() {
    switch (tiempoR) {
      case 1:
        return "animation1-R";
      case 2:
        return "animation2-R";
      case 3:
        return "animation3-R";
      case 4:
        return "animation4-1";
      case 5:
        return "animation5-1";
      case 6:
        return "animation6-1";
      case 7:
        return "animation7-1";
      default:
        return "";
    }
  }

  return (
    <div className="container-reseñas">
      <img className={`reseña-1 ${cambioR1()}`} src="/reseña-1.webp" alt="" />
      <img className={`reseña-2 ${cambioR1()}`} src="/reseña-2.webp" alt="" />
      <img className={`reseña-3 ${cambioR1()}`} src="/reseña-3.webp" alt="" />
      <img className={`reseña-4 ${cambioR()}`} src="/reseña-4.webp" alt="" />
      <img className={`reseña-5 ${cambioR()}`} src="/reseña-5.webp" alt="" />
      <img className={`reseña-6 ${cambioR()}`} src="/reseña-6.webp" alt="" />
      <img className={`reseña-7 ${cambioR()}`} src="/reseña-7.webp" alt="" />
    </div>
  );
};

export default ContainerReseñas;
