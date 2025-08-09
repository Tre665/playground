import { OpenWeatherLocation } from '../types/geolocation.types';

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
