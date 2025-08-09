import { GeolocationDto, OpenWeatherLocation } from './geolocation.types';

export const mapToDto = (geolocation: OpenWeatherLocation): GeolocationDto => {
  const { name, local_names, country, state, ...rest } = geolocation;

  const fullName = [name, state, country].filter((part) => !!part).join(' ');

  return {
    name,
    fullName,
    ...rest,
  };
};
