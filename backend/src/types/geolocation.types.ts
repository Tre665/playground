/** Response from the OpenWeather API */
export interface OpenWeatherLocation {
  name: string;
  lat: number;
  lon: number;
  local_names?: Record<string, string>;
  country: string;
  state?: string;
}

/** Mapped response from the OpenWeather API */
export interface GeolocationDto
  extends Omit<OpenWeatherLocation, 'local_names' | 'country' | 'state'> {
  fullName: string;
}
