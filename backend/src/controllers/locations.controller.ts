import { FastifyRequest, FastifyReply } from 'fastify';
import { fetchCoordinatesForCity } from '../services/open-weather.service';
import { mapToDto } from '../types/geolocation.mappings';

/** Gets location suggestions for a given query string (city name) */
export const getLocationsForCity = async (
  request: FastifyRequest<{ Querystring: { query: string } }>,
  reply: FastifyReply,
) => {
  const { query } = request.query;
  if (!query) {
    return reply.status(400).send({ message: 'Query is required' });
  }

  try {
    const locations = await fetchCoordinatesForCity(query);
    const mappedLocations = locations.map((location) => mapToDto(location));
    return reply.send(mappedLocations);
  } catch (err) {
    request.server.log.error(`Failed to fetch locations for query: ${query} \n${err}`);
    return reply.status(500).send({ message: 'Internal server error' });
  }
};
