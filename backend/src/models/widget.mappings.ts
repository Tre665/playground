import { WeatherApiResponse } from '../types/open-weather.types';
import { WeatherWidget, Widget } from './widgets.models';

/** combines the data of a persisted widget with weather data*/
export const mapWeatherDataToWidget = (
  widget: Widget,
  weatherData: WeatherApiResponse,
): WeatherWidget => {
  return {
    ...widget,
    // only temperature for now, more data would be available
    weatherData: {
      temperature: weatherData.main.temp,
    },
  };
};
