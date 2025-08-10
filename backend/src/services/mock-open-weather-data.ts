import { WeatherApiResponse } from '../types/open-weather.types';

// todo(tre): remove after testing or move to permanent test case
/** Simple response from the OpenWeather API that can be used for testing and save request limits*/
export const mockWeatherApiResponse: WeatherApiResponse = {
  coord: {
    lon: 9.1829,
    lat: 48.7758,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 27.02,
    feels_like: 27.26,
    temp_min: 26.48,
    temp_max: 28.24,
    pressure: 1025,
    humidity: 47,
    sea_level: 1025,
    grnd_level: 984,
  },
  visibility: 10000,
  wind: {
    speed: 3.09,
    deg: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 1754833553,
  sys: {
    type: 1,
    id: 1274,
    country: 'DE',
    sunrise: 1754798955,
    sunset: 1754851688,
  },
  timezone: 7200,
  id: 2825297,
  name: 'Stuttgart',
  cod: 200,
};
