import { Location } from './location';

export interface WeatherWidgetData {
  _id: string;
  location: Location;
  temperature?: number;
}
