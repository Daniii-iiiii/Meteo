const fetch = require('node-fetch');

const { 
    obtenInformacionMeteo, 
    procesaCodigoTiempo, 
    procesaDireccionViento, 
    procesaTemperatura, 
    procesaVelocidadViento 
} = require('../src/tiempo.js');

jest.mock('node-fetch');

describe('currentweather', () => {
    let mockResponse;

    beforeEach(() => {
        mockResponse = {
            current_weather: {
                weathercode: 1,
                winddirection: 90,
                temperature: 15,
                windspeed: 5
            }
        };

        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('obtenInformacionMeteo API', async () => {
        await obtenInformacionMeteo(42.2576, -8.683);
        expect(fetch).toHaveBeenCalledWith(
            'https://api.open-meteo.com/v1/forecast?latitude=42.2576&longitude=-8.683&current_weather=true'
        );
    });

    test.each([
        { weathercode: 1, expected: '☁️' },
        { weathercode: 999, expected: '❓' }
    ])('procesaCodigoTiempo tiene que enseñar el mensaje correcto de $weathercode', async ({ weathercode, expected }) => {
        mockResponse.current_weather.weathercode = weathercode;
        await obtenInformacionMeteo(42.2576, -8.683);
        console.log = jest.fn();
        procesaCodigoTiempo();
        expect(console.log).toHaveBeenCalledWith(expected);
    });

    test.each([
        { winddirection: 30, expected: '30° NO/NE🌬️' },
        { winddirection: 90, expected: '90° NE/E/SE🌬️' },
        { winddirection: 180, expected: '180° SE/S/SO🌬️' },
        { winddirection: 270, expected: '270° SO/O/NO🌬️' }
    ])('procesaDireccionViento tiene que enseñar el mensaje correcto de $winddirection en °', async ({ winddirection, expected }) => {
        mockResponse.current_weather.winddirection = winddirection;
        await obtenInformacionMeteo(42.2576, -8.683);
        console.log = jest.fn();
        procesaDireccionViento();
        expect(console.log).toHaveBeenCalledWith(expected);
    });

    test.each([
        { temperature: 15, expected: 'Se está bien👌' },
        { temperature: 5, expected: 'Frío🥶' }
    ])('procesaTemperatura tiene que enseñar el mensaje correcto de $temperature en °C', async ({ temperature, expected }) => {
        mockResponse.current_weather.temperature = temperature;
        await obtenInformacionMeteo(42.2576, -8.683);
        console.log = jest.fn();
        procesaTemperatura();
        expect(console.log).toHaveBeenCalledWith(`${temperature} °C`);
        expect(console.log).toHaveBeenCalledWith(expected);
    });

    test.each([
        { windspeed: 5, expected: '🐢' },
        { windspeed: 15, expected: '🚀' }
    ])('procesaVelocidadViento tiene que enseñar el mensaje correcto de $windspeed en Km/h', async ({ windspeed, expected }) => {
        mockResponse.current_weather.windspeed = windspeed;
        await obtenInformacionMeteo(42.2576, -8.683);
        console.log = jest.fn();
        procesaVelocidadViento();
        expect(console.log).toHaveBeenCalledWith(`${windspeed} Km/h`);
        expect(console.log).toHaveBeenCalledWith(expected);
    });
});
