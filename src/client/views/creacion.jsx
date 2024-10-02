import { Fragment, useEffect, useState } from "react";
import Mapa from "../components/mapa";
import { imageDb } from "./config";
import { getDownloadURL, list, ref, uploadBytes } from "firebase/storage";
import LocationR from "../components/locationR";
import YesorNo from "../components/yesorno";
const token = import.meta.env.VITE_REACT_API_TOKEN;
const url = new URLSearchParams(window.location.search);

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
  document.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false
  );
  let [img, setImg] = useState();
  let [infoObj, setInfoObj] = useState({
    id: [],
    link: [],
  });
  let [contador, setContador] = useState(1);
  const urlCant = url.get("cantidad");
  const [active, setActive] = useState(false);
  const [lista, setLista] = useState([]);
  const [qr, setQR] = useState(
    "https://open.spotify.com/intl-es/track/4a9tbd947vo9K8Vti9JwcI?si=b6b12cb70cb84015"
  );
  let [checked, setIsChecked] = useState(false);
  let [checkedSP, setIsCheckedSP] = useState(false);
  let [checkedM, setIsCheckedM] = useState(false);
  let [checkedC, setIsCheckedC] = useState(false);
  let [checkedN, setIsCheckedN] = useState(false);
  let [checkedConst, setIsCheckedConst] = useState(false);
  let [checkedBG, setIsCheckedBG] = useState(false);
  let [checkedContact, setIsCheckedContact] = useState(false);
  let [checkedCant, setIsCheckedCant] = useState(false);
  let [total, setTotal] = useState(0);
  let [images, setImages] = useState([]);

  function mensajeCantidad() {
    if (urlCant > 1) {
      setIsCheckedN(true);
      setIsCheckedCant(true);
    }
  }

  function quitarMsg() {
    setIsCheckedCant(!checkedCant);
  }

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
      locatioShow.innerText = `${lista[0]}, ${lista[lista.length - 1]}`;
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

  function changeTypography(e, id) {
    const block = document.querySelector(`#${id}`);
    block.classList.remove("Alice");
    block.classList.remove("Lustria");
    block.classList.remove("Inter");
    block.classList.remove("Tinos");
    block.classList.remove("Arimo");

    block.classList.add(e.target.value);
  }

  function changeWeight(e, id) {
    const block = document.querySelector(`#${id}`);
    block.classList.remove("Light");
    block.classList.remove("Regular");
    block.classList.remove("Bold");

    block.classList.add(e.target.value);
  }

  function moveName() {
    setIsCheckedN(!checkedN);
  }

  function displayMoon() {
    setIsCheckedM(!checkedM);
  }

  function displayConst() {
    setIsCheckedConst(!checkedConst);
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

  function displayContact(e) {
    e.preventDefault();
    const medida = document.querySelector("#inputMedida");
    if (!medida.value) {
      return alert("Debe seleccionar una medida previamente");
    }
    setIsCheckedContact(!checkedContact);
  }

  function changeQR(e) {
    setQR(e.target.value);
  }

  function Totalizar(e) {
    const value = e.target.value;
    if (value === "13x18cm") {
      setTotal(15);
    } else if (value === "15x20cm") {
      setTotal(20);
    } else if (value === "20x25cm") {
      setTotal(25);
    }
  }

  function cambiarEstilos(medida) {
    const containerMain = document.querySelector(".container-main-crear");
    const Celestialmap = document.querySelector("#celestial-map");
    const bgBlack = document.querySelector(".bg-black");
    const locatioShow = document.querySelector("#locatioShow");
    const messageShow = document.querySelector("#messageShow");
    const dateShow = document.querySelector("#dateShow");
    const nameShow = document.querySelector("#Name");
    const moon = document.querySelector(".moon");
    const qr = document.querySelector("#QRCode");
    const spotify = document.querySelector("#spotify");
    const borderWhite = document.querySelector(".borderWhite");
    const quitarCM = medida.split("cm");
    const medidaCM = quitarCM[0];
    bgBlack.classList.add(`bg${medidaCM}`);
    containerMain.classList.add(`container${medidaCM}`);
    Celestialmap.classList.add(`map${medidaCM}`);
    borderWhite.classList.add(`borderWhite${medidaCM}`);
    moon.classList.add(`moon${medidaCM}`);
    locatioShow.classList.add(`location-show${medidaCM}`);
    dateShow.classList.add(`date-show${medidaCM}`);
    spotify.classList.add(`spotify-code${medidaCM}`);
    if (messageShow.classList.contains("message-prev")) {
      messageShow.classList.add(`message-show${medidaCM}`);
      messageShow.classList.add(`message-prev${medidaCM}`);
    } else {
      messageShow.classList.add(`message-show${medidaCM}`);
    }
    qr ? qr.classList.add(`QRCode${medidaCM}`) : null;
    if (nameShow.classList.contains("nameBottom")) {
      nameShow.classList.add(`name${medidaCM}`);
      nameShow.classList.add(`nameBottom${medidaCM}`);
    } else {
      nameShow.classList.add(`name${medidaCM}`);
    }
  }

  function retirarEstilos(medida) {
    const containerMain = document.querySelector(".container-main-crear");
    const Celestialmap = document.querySelector("#celestial-map");
    const bgBlack = document.querySelector(".bg-black");
    const locatioShow = document.querySelector("#locatioShow");
    const messageShow = document.querySelector("#messageShow");
    const dateShow = document.querySelector("#dateShow");
    const nameShow = document.querySelector("#Name");
    const moon = document.querySelector(".moon");
    const qr = document.querySelector("#QRCode");
    const borderWhite = document.querySelector(".borderWhite");
    const quitarCM = medida.split("cm");
    const medidaCM = quitarCM[0];
    bgBlack.classList.remove(`bg${medidaCM}`);
    containerMain.classList.remove(`container${medidaCM}`);
    Celestialmap.classList.remove(`map${medidaCM}`);
    borderWhite.classList.remove(`borderWhite${medidaCM}`);
    moon.classList.remove(`moon${medidaCM}`);
    locatioShow.classList.remove(`location-show${medidaCM}`);
    dateShow.classList.remove(`date-show${medidaCM}`);
    messageShow.classList.remove(`message-show${medidaCM}`);
    messageShow.classList.remove(`message-prev${medidaCM}`);
    spotify.classList.remove(`spotify-code${medidaCM}`);
    nameShow.classList.remove(`name${medidaCM}`);
    nameShow.classList.remove(`nameBottom${medidaCM}`);
    qr ? qr.classList.remove(`QRCode${medidaCM}`) : null;
  }

  async function enviarEmail(obj) {
    try {
      const response = await axios.post("/api/email/sendEmail", obj);
    } catch (error) {
      console.log(error);
    }
  }

  function saveImage(e) {
    e.preventDefault();
    const containerMain = document.querySelector(".container-main-crear");
    const inputMedida = document.querySelector("#inputMedida");
    if (!inputMedida.value) {
      return alert("Por favor ingrese la medida del mapa");
    }
    setIsCheckedBG(true);
    if (inputMedida.value === "13x18cm") {
      ancho = 491;
      alto = 680;
      cambiarEstilos(inputMedida.value);
    } else if (inputMedida.value === "15x20cm") {
      ancho = 566;
      alto = 755;
      cambiarEstilos(inputMedida.value);
    } else if (inputMedida.value === "20x25cm") {
      ancho = 755;
      alto = 944;
      cambiarEstilos(inputMedida.value);
    }
    try {
      html2canvas(containerMain, { scale: 3 }).then((canvas) => {
        const id = Date.now();
        canvas.toBlob((result) => {
          const imageRef = ref(
            imageDb,
            `stars/mapas/${infoObj.name} - ${id}.png`
          );
          images.push({ imageRef, result });
          retirarEstilos(inputMedida.value);
          setIsCheckedBG(false);
          setContador(contador + 1);
          let listID = infoObj.id;
          listID.push(id);
          alert("Mapa creado con éxito");
        });
      });
    } catch (error) {
      setIsCheckedBG(false);
      alert("Hubo un error al crear la imagen");
    }
  }

  async function crearMapa(e) {
    e.preventDefault();
    const containerMain = document.querySelector(".container-main-crear");
    const inputMedida = document.querySelector("#inputMedida");
    const inputName = document.querySelector("#inputNombre");
    const inputEmail = document.querySelector("#inputEmail");
    const inputTelf = document.querySelector("#inputTelf");
    const inputMetodo = document.querySelector("#inputMetodo");
    const inputSpotify = document.querySelector("#inputSpotify");
    if (!inputMedida.value) {
      return alert("Por favor ingrese la medida del mapa");
    }
    if (
      !inputEmail.value ||
      !inputName.value ||
      !inputMetodo.value ||
      !inputTelf.value
    ) {
      return alert("No puede dejar los campos vacíos");
    }
    setIsCheckedBG(true);
    let listID = infoObj.id;
    let listLink = infoObj.link;
    infoObj.name = inputName.value;
    infoObj.email = inputEmail.value;
    infoObj.telf = inputTelf.value;
    infoObj.medida = inputMedida.value;
    infoObj.metodo = inputMetodo.value;
    inputSpotify ? (infoObj.spotify = inputSpotify.value) : null;
    inputEmail.value = "";
    inputName.value = "";
    inputTelf.value = "";
    inputMetodo.value = "";
    if (inputMedida.value === "13x18cm") {
      ancho = 491;
      alto = 680;
      cambiarEstilos(inputMedida.value);
    } else if (inputMedida.value === "15x20cm") {
      ancho = 566;
      alto = 755;
      cambiarEstilos(inputMedida.value);
    } else if (inputMedida.value === "20x25cm") {
      ancho = 755;
      alto = 944;
      cambiarEstilos(inputMedida.value);
    }
    try {
      html2canvas(containerMain, { scale: 3 }).then((canvas) => {
        const id = Date.now();
        listID.push(id);
        canvas.toBlob((result) => {
          const imageRef = ref(
            imageDb,
            `stars/mapas/${infoObj.name} - ${id}.png`
          );
          images.push({ imageRef, result });
          images.forEach((i) => {
            uploadBytes(i.imageRef, i.result).then((snapshot) =>
              getDownloadURL(snapshot.ref).then((url) => {
                listLink.push(url);
                if (contador == urlCant) {
                  enviarEmail(infoObj);
                }
                contador++;
              })
            );
          });
          retirarEstilos(inputMedida.value);
          setIsCheckedContact(false);
          setIsCheckedBG(false);
          alert("Mapa creado con éxito");
        });
      });
    } catch (error) {
      setIsCheckedBG(false);
      alert("Hubo un error al crear la imagen");
    }
  }

  useEffect(() => {
    mensajeCantidad();
  }, []);

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
      <div className={checkedCant ? "container-message-cant" : "hidden"}>
        <div className="message-cant">
          <p>Los mapas serán creados por separado</p>
          <button onClick={quitarMsg} className="btnSearch">
            Aceptar
          </button>
        </div>
      </div>
      <div
        className={
          checkedContact ? "container-contactar" : "container-contactar hidden"
        }
      >
        <div className="contactar-inputs">
          <div className="container-close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="close-contact"
              onClick={displayContact}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h3>Información de contacto</h3>
          <div>
            <label className="labelCreate" htmlFor="inputNombre">
              Nombre de contacto
            </label>
            <input className="inputCreate" type="text" id="inputNombre" />
          </div>
          <div>
            <label className="labelCreate" htmlFor="inputEmail">
              Correo
            </label>
            <input className="inputCreate" type="email" id="inputEmail" />
          </div>
          <div>
            <label className="labelCreate" htmlFor="inputTelf">
              Teléfono
            </label>
            <input className="inputCreate" type="number" id="inputTelf" />
          </div>
          <h3>Método de pago</h3>
          <div>
            <label className="labelCreate" htmlFor="inputMetodo">
              Escoger método de pago
            </label>
            <select className="inputCreate" id="inputMetodo">
              <option selected disabled value="">
                ...
              </option>
              <option value="Efectivo">Efectivo</option>
              <option value="Pago móvil">Pago móvil</option>
            </select>
          </div>
          <button onClick={crearMapa} className="btn-create">
            Crear Mapa
          </button>
        </div>
      </div>
      <div className={checkedBG ? "bg-create" : "hidden"}>Cargando...</div>
      <div className="container-map">
        <Mapa
          isCheckedConst={checkedConst}
          color={checkedC}
          qr={qr}
          isChecked={checked}
          isCheckedSP={checkedSP}
          isCheckedM={checkedM}
          isCheckedN={checkedN}
        ></Mapa>
        <p className="WM">stars</p>
        <img
          src={!checkedC ? "/spcode-b.jpeg" : "/spcode-w.jpeg"}
          id="spotify"
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
        <div
          className={
            urlCant > 1
              ? "container-input-form formyn hidden"
              : "container-input-form formyn"
          }
        >
          <label htmlFor="inputN" className="labelCreate">
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
        <div className="container-input-form formyn">
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
                className="btnSearch"
                onClick={(e) => {
                  e.preventDefault();
                  const result = document.querySelector("#result");
                  result.classList.remove("hidden");
                  setActive(!active);
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
        <div className="container-input-form formyn">
          <label className="labelCreate" htmlFor="inputConst">
            Activar constelaciones
          </label>
          <YesorNo
            checked={checkedConst}
            text1={"Si"}
            text2={"No"}
            input={"inputConst"}
          ></YesorNo>
          <input
            onChange={displayConst}
            className="hidden"
            type="checkbox"
            id="inputConst"
          />
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
        <div
          className={
            contador > 1
              ? "container-input-form hidden"
              : "container-input-form"
          }
        >
          <label className="labelCreate" htmlFor="inputMedida">
            Medidas
          </label>
          <select onChange={Totalizar} className="inputCreate" id="inputMedida">
            <option value={""} selected disabled>
              ...
            </option>
            <option value="13x18cm">13x18cm</option>
            <option value="15x20cm">15x20cm</option>
            <option value="20x25cm">20x25cm</option>
          </select>
        </div>
        <div className="container-input-form formyn">
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
        <div className="container-input-form formyn">
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
        <div className="container-input-form formyn">
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
        <h3 className="tituloT">Tipografías</h3>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMedida">
            Nombre o iniciales
          </label>
          <select
            onChange={(e) => {
              changeTypography(e, "Name");
            }}
            className="inputCreate"
            id="inputMedida"
          >
            <option value={""} selected disabled>
              ...
            </option>
            <option value="Alice">Alice</option>
            <option value="Lustria">Lustria</option>
            <option value="Inter">Inter</option>
            <option value="Tinos">Tinos</option>
          </select>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMedida">
            Mensaje
          </label>
          <select
            onChange={(e) => {
              changeTypography(e, "messageShow");
            }}
            className="inputCreate"
            id="inputMedida"
          >
            <option value={""} selected disabled>
              ...
            </option>
            <option value="Alice">Alice</option>
            <option value="Lustria">Lustria</option>
            <option value="Inter">Inter</option>
            <option value="Tinos">Tinos</option>
          </select>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMedida">
            Fecha
          </label>
          <select
            onChange={(e) => {
              changeTypography(e, "dateShow");
            }}
            className="inputCreate"
            id="inputMedida"
          >
            <option value={""} selected disabled>
              ...
            </option>
            <option value="Alice">Alice</option>
            <option value="Lustria">Lustria</option>
            <option value="Inter">Inter</option>
            <option value="Tinos">Tinos</option>
          </select>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMedida">
            Ubicación
          </label>
          <select
            onChange={(e) => {
              changeTypography(e, "locatioShow");
            }}
            className="inputCreate"
            id="inputMedida"
          >
            <option value={""} selected disabled>
              ...
            </option>
            <option value="Alice">Alice</option>
            <option value="Lustria">Lustria</option>
            <option value="Inter">Inter</option>
            <option value="Tinos">Tinos</option>
          </select>
        </div>
        <h3 className="tituloT">Grosor de las Tipografías</h3>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMedida">
            Nombre o iniciales
          </label>
          <select
            onChange={(e) => {
              changeWeight(e, "Name");
            }}
            className="inputCreate"
            id="inputMedida"
          >
            <option value={""} selected disabled>
              ...
            </option>
            <option value="Light">Light</option>
            <option value="Regular">Regular</option>
            <option value="Bold">Bold</option>
          </select>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMedida">
            Mensaje
          </label>
          <select
            onChange={(e) => {
              changeWeight(e, "messageShow");
            }}
            className="inputCreate"
            id="inputMedida"
          >
            <option value={""} selected disabled>
              ...
            </option>
            <option value="Light">Light</option>
            <option value="Regular">Regular</option>
            <option value="Bold">Bold</option>
          </select>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMedida">
            Fecha
          </label>
          <select
            onChange={(e) => {
              changeWeight(e, "dateShow");
            }}
            className="inputCreate"
            id="inputMedida"
          >
            <option value={""} selected disabled>
              ...
            </option>
            <option value="Light">Light</option>
            <option value="Regular">Regular</option>
            <option value="Bold">Bold</option>
          </select>
        </div>
        <div className="container-input-form">
          <label className="labelCreate" htmlFor="inputMedida">
            Ubicación
          </label>
          <select
            onChange={(e) => {
              changeWeight(e, "locatioShow");
            }}
            className="inputCreate"
            id="inputMedida"
          >
            <option value={""} selected disabled>
              ...
            </option>
            <option value="Light">Light</option>
            <option value="Regular">Regular</option>
            <option value="Bold">Bold</option>
          </select>
        </div>
        <div className="total">Total: ${total}</div>
        <div className="btnCreateM">
          <button
            className="btn-search"
            onClick={contador == urlCant ? displayContact : saveImage}
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Creacion;
