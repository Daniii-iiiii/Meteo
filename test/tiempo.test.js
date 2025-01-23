const {obtenInformacionMeteo, procesaCodigoTiempo, procesaDireccionViento, procesaTemperatura, procesaVelocidadViento, infoTiempo }; = require("../src/tiempo.js");
obtenInformacionMeteo();
procesaCodigoTiempo();
procesaDireccionViento();
procesaTemperatura();
procesaVelocidadViento();

describe("Información Tiempo", () => {
  test("Sabemos que en Teis no nieva", () => {
    expect(infoTiempo() =>).toThrow("No estamos en Rusia");
  });
  test("La velocidad del viento nunca será mayor a: ¿200km?", () => {
    expect(procesaVelocidadViento()).toThrow(1);
  });
  test("La temperatura nunca superará: ¿40ºC?", () => {
    expect(procesaTemperatura()).toBe();
  });
  test("Siempre hay viento", () => {
    expect(procesaDireccionViento() =>).toBe("");
  });
  test("Codigo Tiempo", () => {
    expect(procesaCodigoTiempo()).toBe();
  });
});