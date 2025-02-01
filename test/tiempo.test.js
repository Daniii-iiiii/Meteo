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

    test('obtenInformacionMeteo fetches data from API', async () => {
        await obtenInformacionMeteo(42.2576, -8.683);
        expect(fetch).toHaveBeenCalledWith('https://api.open-meteo.com/v1/forecast?latitude=42.2576&longitude=-8.683&current_weather=true');
    });

    test('procesaCodigoTiempo logs correct weather icon', async () => {
        console.log = jest.fn();
        await obtenInformacionMeteo(42.2576, -8.683);
        procesaCodigoTiempo();
        expect(console.log).toHaveBeenCalledWith('☁️');
    });

    test('procesaDireccionViento logs correct wind direction for NE/E/SE', async () => {
        mockResponse.current_weather.winddirection = 90;
        await obtenInformacionMeteo(42.2576, -8.683);
        console.log = jest.fn();
        procesaDireccionViento();
        expect(console.log).toHaveBeenCalledWith('90° NE/E/SE🌬️');
    });

    test('procesaDireccionViento logs correct wind direction for NO/NE', async () => {
        mockResponse.current_weather.winddirection = 30;
        await obtenInformacionMeteo(42.2576, -8.683);
        console.log = jest.fn();
        procesaDireccionViento();
        expect(console.log).toHaveBeenCalledWith('30° NO/NE🌬️');
    });

    test('procesaDireccionViento logs correct wind direction for SE/S/SO', async () => {
        mockResponse.current_weather.winddirection = 180;
        await obtenInformacionMeteo(42.2576, -8.683);
        console.log = jest.fn();
        procesaDireccionViento();
        expect(console.log).toHaveBeenCalledWith('180° SE/S/SO🌬️');
    });

    test('procesaDireccionViento logs correct wind direction for SO/O/NO', async () => {
        mockResponse.current_weather.winddirection = 270;
        await obtenInformacionMeteo(42.2576, -8.683);
        console.log = jest.fn();
        procesaDireccionViento();
        expect(console.log).toHaveBeenCalledWith('270° SO/O/NO🌬️');
    });

    test('procesaTemperatura logs correct temperature and message', async () => {
        console.log = jest.fn();
        await obtenInformacionMeteo(42.2576, -8.683);
        procesaTemperatura();
        expect(console.log).toHaveBeenCalledWith('15 °C');
        expect(console.log).toHaveBeenCalledWith('Se está bien👌');
    });

    test('procesaVelocidadViento logs correct wind speed and message', async () => {
        console.log = jest.fn();
        await obtenInformacionMeteo(42.2576, -8.683);
        procesaVelocidadViento();
        expect(console.log).toHaveBeenCalledWith('5 Km/h');
        expect(console.log).toHaveBeenCalledWith('🐢');
    });
});