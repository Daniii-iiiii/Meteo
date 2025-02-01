const fetch = require('node-fetch');

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
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`;

  try {
    let respuestaAPI = await fetch(apiURL);
    respuestaAPIenJSON = await respuestaAPI.json();
  } catch (error) {
    console.error(`Error al obtener datos de la API: ${error.message}`);
  }
};

const procesaCodigoTiempo = () => {
  if (!respuestaAPIenJSON || !respuestaAPIenJSON.current_weather) return;
  let codigoTiempo = respuestaAPIenJSON.current_weather.weathercode;
  console.log(infoTiempo[codigoTiempo] || "❓");
};

const procesaDireccionViento = () => {
  if (!respuestaAPIenJSON || !respuestaAPIenJSON.current_weather) return;
  let direccionViento = respuestaAPIenJSON.current_weather.winddirection;
  
  switch (true) {
    case direccionViento >= 315 || direccionViento < 45:
      console.log(`${direccionViento}° NO/NE🌬️`);
      break;
    case direccionViento >= 45 && direccionViento < 135:
      console.log(`${direccionViento}° NE/E/SE🌬️`);
      break;
    case direccionViento >= 135 && direccionViento < 215:
      console.log(`${direccionViento}° SE/S/SO🌬️`);
      break;
    case direccionViento >= 215 && direccionViento < 315:
      console.log(`${direccionViento}° SO/O/NO🌬️`);
      break;
  }
};

const procesaTemperatura = () => {
  if (!respuestaAPIenJSON || !respuestaAPIenJSON.current_weather) return;
  let temperatura = respuestaAPIenJSON.current_weather.temperature;
  console.log(`${temperatura} °C`);
  console.log(temperatura < 10 ? "Frío🥶" : "Se está bien👌");
};

const procesaVelocidadViento = () => {
  if (!respuestaAPIenJSON || !respuestaAPIenJSON.current_weather) return;
  let velocidadViento = respuestaAPIenJSON.current_weather.windspeed;
  console.log(`${velocidadViento} Km/h`);
  console.log(velocidadViento < 10 ? "🐢" : "🚀");
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
};