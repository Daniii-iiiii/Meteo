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
};

const procesaCodigoTiempo = () => {
  let codigoTiempo = respuestaAPIenJSON.current.weather_code;
  console.log(codigoTiempo);
  const emojiTiempo = infoTiempo[codigoTiempo];
  console.log(emojiTiempo);
};

const procesaDireccionTiempo = () => {
  let direccionTiempo = respuestaAPIenJSON.current.wind_direction_10m;
  console.log(direccionTiempo);
  if (direccionTiempo > 0) {
    console.log("🧭");
  }
};

const procesaTemperatura = () => {
  let codigoTemperatura = respuestaAPIenJSON.current.temperature_2m;
  console.log(codigoTemperatura);
  if (codigoTemperatura < 10) {
    console.log("🥶");
  }
};

const procesaVelocidadViento = () => {
  let velocidadViento = respuestaAPIenJSON.current.wind_speed_10m;
  console.log(velocidadViento);
  if (velocidadViento < 10) {
    console.log("🐢");
  }
};

const main = async () => {
  await obtenInformacionMeteo(teisLatitud, teisLongitud);
  procesaCodigoTiempo();
  procesaDireccionTiempo();
  procesaTemperatura();
  procesaVelocidadViento();
};

main();
