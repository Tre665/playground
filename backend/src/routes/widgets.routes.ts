import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { getAllWidgets } from '../controllers/widgets.controller';

const widgets: FastifyPluginAsync = async (
  server: FastifyInstance,
  opts: unknown,
): Promise<void> => {
  server.get('/widgets', async function (request, reply) {
    return getAllWidgets(request, reply);
  });
};

export default widgets;
