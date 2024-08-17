import { Fragment, useEffect, useState } from "react";
import Mapa from "../components/mapa";
import { imageDb } from "./config";
import { getDownloadURL, list, ref, uploadBytes } from "firebase/storage";
import LocationR from "../components/locationR";

const token = import.meta.env.VITE_REACT_API_TOKEN;

const Creacion = () => {
  const [active, setActive] = useState(0);
  const [lista, setLista] = useState([]);
  function changeName() {
    const inputName = document.getElementById("inputName");
    const showName = document.getElementById("Name");
    if (inputName.value.length > 20) {
      inputName.value = inputName.value.slice(0, 20);
    }
    showName.innerText = inputName.value;
  }

  function changeMessage() {
    const inputMsg = document.getElementById("inputMsg");
    const showMsg = document.getElementById("messageShow");
    if (inputMsg.value.length > 130) {
      inputMsg.value = inputMsg.value.slice(0, 130);
    }
    showMsg.innerText = inputMsg.value;
  }

  function changeDate(e) {
    const inputDate = e.target;
    const inputTime = document.querySelector("#inputTime");
    const date = new Date(`${inputDate.value} ${inputTime.value}`);
    Celestial.date(date);
  }

  function changeTime() {
    const inputDate = document.querySelector("#inputDate");
    const inputTime = document.querySelector("#inputTime");
    if (!inputDate.value) {
      return alert("Debe ingresar una fecha primero");
    }
    const date = new Date(`${inputDate.value} ${inputTime.value}`);
    Celestial.date(date);
  }

  function changeCoor(e) {
    e.preventDefault();
    const inputLat = document.getElementById("inputLat");
    const inputLong = document.getElementById("inputLong");
    if (!inputLat.value || !inputLong.value) {
      return alert("No puede dejar los dos campos vacíos");
    }
    if (isNaN(inputLat.value) || isNaN(inputLong.value)) {
      return alert("Los datos que ha ingresado no son válidos");
    }
    Celestial.location([inputLat.value, inputLong.value]);
  }

  function changeLocation(e) {
    if (e.target.getAttribute("latitude")) {
      const result = document.querySelector("#result");
      result.classList.add("hidden");
      const inputUbi = document.querySelector("#inputUbi");
      inputUbi.value = e.target.textContent;
      const lat = e.target.getAttribute("latitude");
      const long = e.target.getAttribute("longitude");
      Celestial.location([lat, long]);
    }
  }

  function toggleCoor(e) {
    const containerCoor = document.getElementById("container-coor");
    const containerLocation = document.getElementById("container-location");
    const btnLoc = document.getElementById("btnLoc");
    const btnCoor = document.getElementById("btnSearchC");
    btnCoor.classList.remove("hidden");
    containerCoor.classList.remove("hidden");
    containerLocation.classList.add("hidden");
    e.target.classList.add("borderSelected");
    btnLoc.classList.remove("borderSelected");
  }

  function toggleLoc(e) {
    const containerCoor = document.getElementById("container-coor");
    const containerLocation = document.getElementById("container-location");
    const btnCoor = document.getElementById("btnCoor");
    const btnSearchC = document.getElementById("btnSearchC");
    btnSearchC.classList.add("hidden");
    containerCoor.classList.add("hidden");
    btnCoor.classList.remove("hidden");
    containerLocation.classList.remove("hidden");
    e.target.classList.add("borderSelected");
    btnCoor.classList.remove("borderSelected");
  }

  function imprimir() {
    const inputUbi2 = document.querySelector("#inputName");
    const inputUbi = document.querySelector("#inputUbi");
    const mapa = document.querySelector(".container-main-crear");

    domtoimage
      .toBlob(mapa, {
        width: 491.33864458,
        height: 680.31504634,
      })
      .then((dataUrl) => {
        const id = Date.now();
        const imageRef = ref(imageDb, `stars/mapas/${id}.png`);
        uploadBytes(imageRef, dataUrl).then((snapshot) => {
          getDownloadURL(snapshot.ref);
        });
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }

  useEffect(() => {
    buscarUbicación();
  }, [active]);

  async function buscarUbicación() {
    const inputUbi = document.querySelector("#inputUbi").value;
    const localizacion = await fetch(
      `https://geocode.maps.co/search?q=${inputUbi}&api_key=${token}`
    );
    const resultado = await localizacion.json();
    setLista(resultado);
  }
  let count = 0;
  return (
    <div className="container-crear-form">
      <div className="container-map">
        <Mapa></Mapa>
        <img src="/spotify-code.webp" className="spotify-code" alt="" />
      </div>
      <form id="formulario" className="formulario">
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputName">
            Nombres
          </label>
          <input
            className="inputCreate"
            onInput={changeName}
            type="text"
            id="inputName"
          />
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMsg">
            Mensaje
          </label>
          <textarea
            className="inputCreate message"
            onInput={changeMessage}
            id="inputMsg"
          ></textarea>
        </div>
        <div className="container-input-form">
          <div className="container-location">
            <label
              id="btnLoc"
              onClick={toggleLoc}
              className="labelCreate labelCoor borderSelected"
            >
              Ubicación
            </label>
            <label
              id="btnCoor"
              onClick={toggleCoor}
              className="labelCreate labelCoor"
              htmlFor=""
            >
              Avanzado
            </label>
          </div>
          <div id="container-location" className="container-search">
            <div className="location-input">
              <input
                placeholder="ej.. Caracas,Venezuela"
                className="inputCreate search"
                type="text"
                id="inputUbi"
              />
              <div
                onClick={changeLocation}
                id="result"
                className="result hidden"
              >
                {lista.map((i) => {
                  const { display_name, lat, lon } = i;
                  count++;
                  return (
                    <LocationR
                      key={count}
                      name={display_name}
                      latitude={lat}
                      longitude={lon}
                    ></LocationR>
                  );
                })}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                const result = document.querySelector("#result");
                result.classList.remove("hidden");
                setActive(active + 1);
              }}
              className="btnLocation"
            >
              Buscar
            </button>
          </div>
          <div className="searchForm">
            <div id="container-coor" className="container-search hidden">
              <div className="container-coor">
                <label className="labelCreate" htmlFor="inputLat">
                  Latitud
                </label>
                <input className="inputCreate" type="text" id="inputLat" />
              </div>
              <div className="container-coor">
                <label className="labelCreate" htmlFor="inputLong">
                  Longitud
                </label>
                <input className="inputCreate" type="text" id="inputLong" />
              </div>
            </div>
            <div className="container-btn-search">
              <button
                onClick={changeCoor}
                className="btn-search hidden"
                id="btnSearchC"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputDate">
            Fecha
          </label>
          <input
            onChange={changeDate}
            className="inputCreate"
            type="date"
            id="inputDate"
          />
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputTime">
            Hora
          </label>
          <input
            onChange={changeTime}
            className="inputCreate"
            type="time"
            id="inputTime"
          />
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMarco">
            Marco
          </label>
          <select className="inputCreate" id="inputMarco">
            <option selected disabled>
              ...
            </option>
          </select>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputQR">
            Código QR
          </label>
          <input className="checkCreate" type="checkbox" id="inputQR" />
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputSpotify">
            Spotify Code
          </label>
          <input
            className="inputCreate"
            type="text"
            id="inputSpotify"
            placeholder="Introduzca el código aquí"
          />
        </div>
      </form>
    </div>
  );
};

export default Creacion;
