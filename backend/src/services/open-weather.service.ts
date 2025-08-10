import { OpenWeatherLocation } from '../types/geolocation.types';
import { WeatherApiResponse } from '../types/open-weather.types';
import { mockWeatherApiResponse } from './mock-open-weather-data';

/** Fetches the coordinates for a given city from the OpenWeather API */
export const fetchCoordinatesForCity = async (city: string): Promise<OpenWeatherLocation[]> => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('OPEN_WEATHER_API_KEY is not found. Please set it in your environment.');
  }

  try {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // todo(tre): add proper type checking
    return data as OpenWeatherLocation[];
  } catch (err) {
    throw err;
  }
};

/** Fetches the weather data for a given location from the OpenWeather API */
export const fetchCurrentWeatherForLocation = async ({
  lat,
  long,
  units = 'metric',
}: {
  lat: number;
  long: number;
  units?: 'standard' | 'metric' | 'imperial';
}): Promise<WeatherApiResponse> => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('OPEN_WEATHER_API_KEY is not found. Please set it in your environment.');
  }

  // todo(tre): remove after testing
  // mock weather data
  // return new Promise((resolve) => {
  //   setTimeout(() => resolve(mockWeatherApiResponse), 300);
  // });

  //real code

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${lat}&lon=${long}&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // todo(tre): add proper type checking
    return data as WeatherApiResponse;
  } catch (err) {
    throw err;
  }
};
