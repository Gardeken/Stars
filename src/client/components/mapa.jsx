import { Fragment } from "react";
import { useEffect } from "react";
import QRCode from "react-qr-code";

const Mapa = ({
  qr,
  isChecked,
  isCheckedSP,
  isCheckedM,
  color,
  isCheckedN,
  isCheckedConst,
}) => {
  /*document.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false
  );*/

  let config = {
    width: 0, // Default width, 0 = full parent element width;
    // height is determined by projection
    projection: "aitoff", // Map projection used: see below
    projectionRatio: null, // Optional override for default projection ratio
    transform: "equatorial", // Coordinate transformation: equatorial (default),
    // ecliptic, galactic, supergalactic
    center: null, // Initial center coordinates in set transform
    // [longitude, latitude, orientation] all in degrees
    // null = default center [0,0,0]
    orientationfixed: true, // Keep orientation angle the same as center[2]
    geopos: null, // optional initial geographic position [lat,lon] in degrees,
    // overrides center
    follow: "zenith", // on which coordinates to center the map, default: zenith, if location enabled,
    // otherwise center
    zoomlevel: null, // initial zoom level 0...zoomextend; 0|null = default, 1 = 100%, 0 < x <= zoomextend
    zoomextend: 10, // maximum zoom level
    adaptable: false, // Sizes are increased with higher zoom-levels
    interactive: false, // Enable zooming and rotation with mousewheel and dragging
    form: false, // Display form for interactive settings. Needs a div with
    // id="celestial-form", created automatically if not present
    location: false, // Display location settings. Deprecated, use formFields below
    formFields: {
      location: false, // Set visiblity for each group of fields with the respective id
      general: false,
      stars: false,
      constellations: false,
      lines: false,
      other: false,
      download: false,
    },
    advanced: false, // Display fewer form fields if false
    daterange: [], // Calender date range; null: displaydate-+10; [n<100]: displaydate-+n; [yr]: yr-+10;
    // [yr, n<100]: [yr-n, yr+n]; [yr0, yr1]
    controls: false, // Display zoom controls
    lang: "", // Global language override for names, any name setting that has the chosen language available
    // Default: desig or empty string for designations, other languages as used anywhere else
    culture: "", // Source of constellations and star names, default "iau", other: "cn" Traditional Chinese
    container: "celestial-map", // ID of parent element, e.g. div, null = html-body
    datapath: "/data", // Path/URL to data files, empty = subfolder 'data'
    stars: {
      show: true, // Show stars
      limit: 4.2, // Show only stars brighter than limit magnitude
      colors: false, // Show stars in spectral colors, if not use default color
      style: { fill: "#ffffff", opacity: 1 }, // Default style for stars
      designation: false, // Show star names (Bayer, Flamsteed, Variable star, Gliese or designation,
      // i.e. whichever of the previous applies first); may vary with culture setting
      designationType: "desig", // Which kind of name is displayed as designation (fieldname in starnames.json)
      designationStyle: {
        fill: "#ffffff",
        font: "15px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif",
        align: "left",
        baseline: "top",
      },
      designationLimit: 2.5, // Show only names for stars brighter than nameLimit
      propername: false, // Show proper name (if present)
      propernameType: "name", // Languge for proper name, default IAU name; may vary with culture setting
      // (see list below of languages codes available for stars)
      propernameStyle: {
        fill: "#ffffff",
        font: "1px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif",
        align: "right",
        baseline: "bottom",
      },
      propernameLimit: 1.5, // Show proper names for stars brighter than propernameLimit
      size: 2, // Maximum size (radius) of star circle in pixels
      exponent: -0.25, // Scale exponent for star size, larger = more linear
      data: "stars.6.json", // Data source for stellar data,
      // number indicates limit magnitude
    },
    constellations: {
      names: false, // Show constellation names
      namesType: "iau", // Type of name Latin (iau, default), 3 letter designation (desig) or other language (see list below)
      nameStyle: {
        fill: "#cccc99",
        align: "center",
        baseline: "middle",
        font: [
          "14px Helvetica, Arial, sans-serif", // Style for constellations
          "12px Helvetica, Arial, sans-serif", // Different fonts for diff.
          "11px Helvetica, Arial, sans-serif",
        ],
      }, // ranked constellations
      lines: isCheckedConst, // Show constellation lines, style below
      lineStyle: { stroke: "#cccccc", width: 0.7, opacity: 0.4 },
      bounds: false, // Show constellation boundaries, style below
      boundStyle: {
        stroke: "#cccc00",
        width: 0,
        opacity: 0.8,
        dash: [2, 4],
      },
    },
    dsos: {
      show: false, // Show Deep Space Objects
      limit: 6, // Show only DSOs brighter than limit magnitude
      colors: true, // // Show DSOs in symbol colors if true, use style setting below if false
      style: { fill: "#cccccc", stroke: "#cccccc", width: 2, opacity: 1 }, // Default style for dsos
      names: true, // Show DSO names
      namesType: "name", // Type of DSO ('desig' or language) name shown
      // (see list below for languages codes available for dsos)
      nameStyle: {
        fill: "#cccccc",
        font: "11px Helvetica, Arial, serif",
        align: "left",
        baseline: "top",
      }, // Style for DSO names
      nameLimit: 6, // Show only names for DSOs brighter than namelimit
      size: null, // Optional seperate scale size for DSOs, null = stars.size
      exponent: 1.4, // Scale exponent for DSO size, larger = more non-linear
      data: "dsos.bright.json", // Data source for DSOs,
      // opt. number indicates limit magnitude
      symbols: {
        //DSO symbol styles, 'stroke'-parameter present = outline
        gg: { shape: "circle", fill: "#ff0000" }, // Galaxy cluster
        g: { shape: "ellipse", fill: "#ff0000" }, // Generic galaxy
        s: { shape: "ellipse", fill: "#ff0000" }, // Spiral galaxy
        s0: { shape: "ellipse", fill: "#ff0000" }, // Lenticular galaxy
        sd: { shape: "ellipse", fill: "#ff0000" }, // Dwarf galaxy
        e: { shape: "ellipse", fill: "#ff0000" }, // Elliptical galaxy
        i: { shape: "ellipse", fill: "#ff0000" }, // Irregular galaxy
        oc: { shape: "circle", fill: "#ffcc00", stroke: "#ffcc00", width: 1.5 }, // Open cluster
        gc: { shape: "circle", fill: "#ff9900" }, // Globular cluster
        en: { shape: "square", fill: "#ff00cc" }, // Emission nebula
        bn: { shape: "square", fill: "#ff00cc", stroke: "#ff00cc", width: 2 }, // Generic bright nebula
        sfr: { shape: "square", fill: "#cc00ff", stroke: "#cc00ff", width: 2 }, // Star forming region
        rn: { shape: "square", fill: "#00ooff" }, // Reflection nebula
        pn: { shape: "diamond", fill: "#00cccc" }, // Planetary nebula
        snr: { shape: "diamond", fill: "#ff00cc" }, // Supernova remnant
        dn: { shape: "square", fill: "#999999", stroke: "#999999", width: 2 }, // Dark nebula grey
        pos: {
          shape: "marker",
          fill: "#cccccc",
          stroke: "#cccccc",
          width: 1.5,
        }, // Generic marker
      },
    },
    mw: {
      show: false, // Show Milky Way as filled multi-polygon outlines
      style: { fill: "#ffffff", opacity: 0.15 }, // Style for MW layers
    },
    lines: {
      // Display & styles for graticule & some planes
      graticule: {
        show: false,
        stroke: "#cccccc",
        width: 0.6,
        opacity: 0.8,
        // grid values: "outline", "center", or [lat,...] specific position
        lon: {
          pos: [""],
          fill: "#eee",
          font: "10px Helvetica, Arial, sans-serif",
        },
        // grid values: "outline", "center", or [lon,...] specific position
        lat: {
          pos: [""],
          fill: "#eee",
          font: "10px Helvetica, Arial, sans-serif",
        },
      },
      equatorial: { show: false, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },
      ecliptic: { show: false, stroke: "#66cc66", width: 1.3, opacity: 0.7 },
      galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },
      supergalactic: {
        show: false,
        stroke: "#cc66cc",
        width: 1.3,
        opacity: 0.7,
      },
    },
    background: {
      // Background style
      fill: "#000000", // Area fill
      opacity: 1,
      stroke: "#000000", // Outline
      width: 1.5,
    },
    horizon: {
      //Show horizon marker, if location is set and map projection is all-sky
      show: false,
      stroke: "#cccccc", // Line
      width: 1.0,
      fill: "#000000", // Area below horizon
      opacity: 0.5,
    },
    daylight: {
      //Show day sky as a gradient, if location is set and map projection is hemispheric
      show: false,
    },
  };

  useEffect(() => {
    Celestial.display(config);
  }, [isCheckedConst]);

  return (
    <div className="container-main-crear">
      <div className={!color ? null : "borderBlack"} id="celestial-map">
        <div className={isCheckedM ? "moon" : "moon hidden"}></div>
        {isCheckedN ? (
          <h2 id="Name" className={!color ? "name" : "name colorBlack"}>
            Pedro Centeno
          </h2>
        ) : (
          <h2
            id="Name"
            className={
              !color ? "name nameBottom" : "name nameBottom bg-white colorBlack"
            }
          >
            Pedro Centeno
          </h2>
        )}
        <div className="borderWhite"></div>
      </div>
      <div className={!color ? "bg-black" : "bg-black bg-white"}></div>
      <span
        id="dateShow"
        className={!color ? "date-show" : "date-show colorBlack"}
      >
        Agosto 14, 2024
      </span>
      <span
        id="locatioShow"
        className={!color ? "location-show" : "location-show colorBlack"}
      >
        Caracas, Venezuela
      </span>
      {isChecked || isCheckedSP ? (
        <span
          className={!color ? "message-show" : "message-show  colorBlack"}
          id="messageShow"
        >
          Te amo mucho, eres lo mejor que me ha pasado hasta ahora y quiero que
          sigamos por muchos años mas
        </span>
      ) : (
        <span
          className={
            !color
              ? "message-show message-prev"
              : "message-show message-prev colorBlack"
          }
          id="messageShow"
        >
          Te amo mucho, eres lo mejor que me ha pasado hasta ahora y quiero que
          sigamos por muchos años mas
        </span>
      )}

      {isChecked ? (
        <QRCode className="QRCode" value={qr} size={60}></QRCode>
      ) : (
        ""
      )}
    </div>
  );
};

export default Mapa;
