import { Fragment, useState } from "react";
import Mapa from "../components/mapa";
import { imageDb } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const token = import.meta.env.VITE_REACT_API_TOKEN;

const Creacion = () => {
  function filtrarFecha(e) {
    const inputDate = document.querySelector("#inputDate");
    setTimeout(() => {
      inputDate.value = inputDate.value.replace("-", "/");
    }, 100);
  }

  function cambiarLat() {
    const inputUbi = document.querySelector("#inputUbi");
    const inputLat = document.querySelector("#lat");
    inputLat.value = inputUbi.value;
  }

  function cambiarLon() {
    const inputUbi2 = document.querySelector("#inputName");
    const inputUbi = document.querySelector("#inputUbi");
    const inputLon = document.querySelector("#lon");

    inputLon.value = inputUbi2.value;
    let event = new Event("change");
    inputLon.dispatchEvent(event);
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

  async function buscarUbicación() {
    const inputUbi = document.querySelector("#inputUbi").value;
    const localizacion = await fetch(
      `https://geocode.maps.co/search?q=${inputUbi}&api_key=${token}`
    );
    const resultado = await localizacion.json();
    console.log(resultado);
  }

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
          <input className="inputCreate" type="text" id="inputName" />
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMsg">
            Mensaje
          </label>
          <input className="inputCreate message" type="text" id="inputMsg" />
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputUbi">
            Ubicación
          </label>
          <div className="container-search">
            <input className="inputCreate search" type="text" id="inputUbi" />
            <button>Buscar</button>
          </div>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputDate">
            Fecha
          </label>
          <input className="inputCreate" type="date" id="inputDate" />
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputTime">
            Hora
          </label>
          <input className="inputCreate" type="time" id="inputTime" />
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
