import fetch from "node-fetch";

const teisLatitud = 42.2576;
const teisLongitud = -8.683;
let respuestaAPIenJSON = "";
const infoTiempo = {
  0: "☀️",
  1: "☁️",
  2: "☁️",
  3: "☁️",
  45: "🌥️",
  48: "🌥️",
  51: "🌦️",
  53: "🌦️",
  55: "🌦️",
  56: "🌨️",
  57: "🌨️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  66: "🌨️",
  67: "🌨️",
  71: "🌨️",
  73: "🌨️",
  75: "🌨️",
  77: "❄️",
  80: "🌧️",
  81: "🌧️",
  82: "🌧️",
  85: "❄️🌩️",
  86: "❄️🌩️",
  95: "🌩️",
  96: "⛈️",
  99: "⛈️",
};

const obtenInformacionMeteo = async (latitud, longitud) => {
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m`;
  let respuestaAPI = await fetch(apiURL);
  respuestaAPIenJSON = await respuestaAPI.json();
  console.log(respuestaAPI.ok);
};
/* Se intentó hacer:
 try {
  let respuestaAPI = await fetch(URL);
  if (!respuestaAPI.ok) {
    throw new Error(`Error en la solicitud`);
  }catch (error)
  {
  throw new Error(`Error al obtener datos de la API:
  ${error.message}`);
} */
const procesaCodigoTiempo = () => {
  let codigoTiempo = respuestaAPIenJSON.current.weather_code;
  const emojiTiempo = infoTiempo[codigoTiempo];
  console.log(emojiTiempo);
};

const procesaDireccionViento = () => {
  let direccionViento = respuestaAPIenJSON.current.wind_direction_10m;
  console.log(direccionViento);
  switch (true) {
    case direccionViento >= 315 && direccionViento < 45:
      console.log("NO/NE🌬️");
      break;
    case direccionViento >= 45 && direccionViento < 135:
      console.log("NE/E/SE🌬️");
      break;
    case direccionViento >= 135 && direccionViento < 215:
      console.log("SE/S/SO🌬️");
      break;
    case direccionViento >= 215 && direccionViento < 315:
      console.log("SO/O/NO🌬️");
      break;
  }
};

/* console.log(direccionViento);
  if (direccionViento > 0) {
    console.log("🧭");
  }
};  */
const procesaTemperatura = () => {
  let codigoTemperatura = respuestaAPIenJSON.current.temperature_2m;
  console.log(codigoTemperatura + " ºC");
  if (codigoTemperatura < 10) {
    console.log("Frío🥶");
  } else {
    console.log("Se está bien👌");
  }
};
/* Las promesas van con Resolve y Reject, en este caso utilizamos:
 if (codigoTemperatura < 10) {
(resolve)console.log("Frío🥶");
  } else {
(reject)console.log("Se está bien👌");
  } */
/* if (codigoTemperatura < 10) {
    console.log("🥶");
  }
}; */
/* if (codigoTemperatura < 10) {
    console.log("🥶");
  }
}; */
const procesaVelocidadViento = () => {
  let velocidadViento = respuestaAPIenJSON.current.wind_speed_10m;
  console.log(velocidadViento + " Km/h");
  if (velocidadViento < 10) {
    console.log("🐢");
  } else {
    console.log("🚀");
  }
};

const main = async () => {
  await obtenInformacionMeteo(teisLatitud, teisLongitud);
  procesaCodigoTiempo();
  procesaDireccionViento();
  procesaTemperatura();
  procesaVelocidadViento();
};

main();
module.exports = {
  obtenInformacionMeteo,
  procesaCodigoTiempo,
  procesaDireccionViento,
  procesaTemperatura,
  procesaVelocidadViento,
  infoTiempo,
};
