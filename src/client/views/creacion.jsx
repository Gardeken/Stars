import { Fragment, useEffect, useState } from "react";
import Mapa from "../components/mapa";
import { imageDb } from "./config";
import { getDownloadURL, list, ref, uploadBytes } from "firebase/storage";
import LocationR from "../components/locationR";
import YesorNo from "../components/yesorno";
const token = import.meta.env.VITE_REACT_API_TOKEN;

let meses = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const Creacion = () => {
  const [active, setActive] = useState(0);
  const [lista, setLista] = useState([]);
  const [qr, setQR] = useState(
    "https://open.spotify.com/intl-es/track/4a9tbd947vo9K8Vti9JwcI?si=b6b12cb70cb84015"
  );
  let [checked, setIsChecked] = useState(false);
  let [checkedSP, setIsCheckedSP] = useState(false);
  let [checkedM, setIsCheckedM] = useState(false);
  let [checkedC, setIsCheckedC] = useState(false);
  let [checkedN, setIsCheckedN] = useState(false);

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
    const dateShow = document.querySelector("#dateShow");
    const listD = inputDate.value.split("-");
    dateShow.innerText = `${meses[listD[1]]} ${listD[2]}, ${listD[0]}`;
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
    const locatioShow = document.querySelector("#locatioShow");
    locatioShow.innerText = `${Number(inputLat.value).toFixed(4)}°N, ${Number(
      inputLong.value
    ).toFixed(4)}°E`;
    Celestial.location([inputLat.value, inputLong.value]);
  }

  function changeLocation(e) {
    if (e.target.getAttribute("latitude")) {
      const result = document.querySelector("#result");
      result.classList.add("hidden");
      const locatioShow = document.querySelector("#locatioShow");
      const name = e.target.textContent;
      const inputUbi = document.querySelector("#inputUbi");
      inputUbi.value = name;
      const lat = e.target.getAttribute("latitude");
      const long = e.target.getAttribute("longitude");
      const lista = name.split(",");
      locatioShow.innerText = `${lista[0]}, Venezuela`;
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

  function changeColor() {
    setIsCheckedC(!checkedC);
  }

  function moveName() {
    setIsCheckedN(!checkedN);
  }

  function displayMoon() {
    setIsCheckedM(!checkedM);
  }

  function displayInputSP() {
    if (checked) {
      setIsCheckedSP(false);
      alert("Solo puede seleccionar uno a la vez");
    } else {
      setIsCheckedSP(!checkedSP);
    }
  }

  function displayInput() {
    if (checkedSP) {
      setIsChecked(false);
      alert("Solo puede seleccionar uno a la vez");
    } else {
      setIsChecked(!checked);
    }
  }

  function changeQR(e) {
    setQR(e.target.value);
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
        uploadBytes(imageRef, dataUrl);
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
        <Mapa
          color={checkedC}
          qr={qr}
          isChecked={checked}
          isCheckedSP={checkedSP}
          isCheckedM={checkedM}
          isCheckedN={checkedN}
        ></Mapa>
        <img
          src={!checkedC ? "/spcode-b.jpeg" : "/spcode-w.jpeg"}
          className={checkedSP ? "spotify-code" : "spotify-code hidden"}
          alt=""
        />
      </div>
      <form id="formulario" className="formulario">
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputName">
            Nombres
          </label>
          <input
            placeholder="Coloque el nombre o las iniciales"
            className="inputCreate"
            onInput={changeName}
            type="text"
            id="inputName"
          />
        </div>
        <div className="container-input-form">
          <label className="labelCreate">
            Ubicación del nombre o iniciales
          </label>
          <YesorNo
            text1={"Arriba"}
            text2={"Abajo"}
            checked={checkedN}
            input={"inputN"}
          ></YesorNo>
          <input
            className="hidden"
            onChange={moveName}
            type="checkbox"
            id="inputN"
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
          <label className="labelCreate" htmlFor="inputM">
            Activar Luna
          </label>
          <YesorNo
            text1={"Si"}
            text2={"No"}
            checked={checkedM}
            input={"inputM"}
          ></YesorNo>
          <input
            type="checkbox"
            className="hidden"
            onChange={displayMoon}
            id="inputM"
          />
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
            <div className="btnLocation">
              <button
                className="btn-search"
                onClick={(e) => {
                  e.preventDefault();
                  const result = document.querySelector("#result");
                  result.classList.remove("hidden");
                  setActive(active + 1);
                }}
              >
                Buscar
              </button>
            </div>
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
            Medidas
          </label>
          <select className="inputCreate" id="inputMarco">
            <option selected disabled>
              ...
            </option>
          </select>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputM">
            Color
          </label>
          <YesorNo
            text1={"Blanco"}
            text2={"Negro"}
            checked={checkedC}
            input={"inputColor"}
          ></YesorNo>
          <input
            type="checkbox"
            className="hidden"
            onChange={changeColor}
            id="inputColor"
          />
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputQR">
            Código QR
          </label>
          <div>
            <YesorNo
              text1={"Si"}
              text2={"No"}
              checked={checked}
              input={"inputQR"}
            ></YesorNo>
            <input
              className="hidden"
              onChange={displayInput}
              type="checkbox"
              id="inputQR"
            />
            {checked ? (
              <input
                className="inputCreate inputQR"
                type="text"
                onChange={changeQR}
                placeholder="Introduzca el link aquí"
              />
            ) : null}
          </div>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputSpotify">
            Spotify Code
          </label>
          <YesorNo
            text1={"Si"}
            text2={"No"}
            checked={checkedSP}
            input={"inputSP"}
          ></YesorNo>
          <input
            className="hidden"
            onChange={displayInputSP}
            type="checkbox"
            id="inputSP"
          />
          {checkedSP ? (
            <input
              className="inputCreate"
              type="text"
              id="inputSpotify"
              placeholder="Introduzca el código aquí"
            />
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Creacion;
