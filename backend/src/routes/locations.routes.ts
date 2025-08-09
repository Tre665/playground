import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import { getLocationsForCity } from '../controllers/locations.controller';

const locations: FastifyPluginAsync = async (
  server: FastifyInstance,
  opts: unknown,
): Promise<void> => {
  server.get(
    '/locations',
    async function (request: FastifyRequest<{ Querystring: { query: string } }>, reply) {
      return getLocationsForCity(request, reply);
    },
  );
};

export default locations;
