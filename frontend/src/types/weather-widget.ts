import { Location } from './location';

export interface WeatherWidgetData {
  _id: string;
  location: Location;

  weatherData?: WeatherData;
}

export interface WeatherData {
  temperature?: number;
}
