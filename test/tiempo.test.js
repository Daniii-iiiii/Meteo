import {
  obtenInformacionMeteo, 
  procesaCodigoTiempo, 
  procesaDireccionViento, 
  procesaTemperatura, 
  procesaVelocidadViento 
} from "../src/tiempo.js"; // Ruta del código

let respuestaAPIenJSON;


  test("obtenInformacionMeteo debe obtener datos de la API correctamente", async () => {
    // Simulamos la llamada a la API
    await obtenInformacionMeteo(42.2576, -8.683); // Coordenadas de Teis
    // Asegúrate de que la API haya actualizado la variable correctamente
    expect(respuestaAPIenJSON).toHaveProperty("current");
  });

  test("procesaCodigoTiempo debe devolver el emoji correcto", () => {
    respuestaAPIenJSON = { current: { weather_code: 0 } }; // Simulando respuesta de API
    const consoleSpy = jest.spyOn(console, "log");
    procesaCodigoTiempo();
    expect(consoleSpy).toHaveBeenCalledWith("☀️");
    consoleSpy.mockRestore();
  });

  test("procesaDireccionViento debe clasificar correctamente la dirección", () => {
    respuestaAPIenJSON = { current: { wind_direction_10m: 50 } };
    const consoleSpy = jest.spyOn(console, "log");
    procesaDireccionViento();cd
    expect(consoleSpy).toHaveBeenCalledWith("NE/E/SE🌬️");
    consoleSpy.mockRestore();
  });

  test("procesaTemperatura debe clasificar correctamente la temperatura", () => {
    respuestaAPIenJSON = { current: { temperature_2m: 8 } };
    const consoleSpy = jest.spyOn(console, "log");
    procesaTemperatura();
    expect(consoleSpy).toHaveBeenCalledWith("8 ºC");
    expect(consoleSpy).toHaveBeenCalledWith("Frío🥶");
    consoleSpy.mockRestore();
  });

  test("procesaVelocidadViento debe clasificar correctamente la velocidad", () => {
    respuestaAPIenJSON = { current: { wind_speed_10m: 15 } };
    const consoleSpy = jest.spyOn(console, "log");
    procesaVelocidadViento();
    expect(consoleSpy).toHaveBeenCalledWith("15 Km/h");
    expect(consoleSpy).toHaveBeenCalledWith("🚀");
    consoleSpy.mockRestore();
  });
