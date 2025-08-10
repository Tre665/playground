import { WeatherApiResponse } from '../types/open-weather.types';
import { WeatherWidget, Widget } from './widgets.models';

export const mapWeatherDataToWidget = (
  widget: Widget,
  weatherData: WeatherApiResponse,
): WeatherWidget => {
  return {
    ...widget,
    weatherData: {
      temperature: weatherData.main.temp,
    },
  };
};
