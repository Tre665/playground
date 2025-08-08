import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';
import { addWidget, getAllWidgets, removeWidget } from '../controllers/widgets.controller';
import { CreateWidgetPayload } from '../types/widgets.types';

const widgets: FastifyPluginAsync = async (
  server: FastifyInstance,
  opts: unknown,
): Promise<void> => {
  server.get('/widgets', async function (request, reply) {
    return getAllWidgets(request, reply);
  });

  server.post(
    '/widgets',
    async function (request: FastifyRequest<{ Body: CreateWidgetPayload }>, reply) {
      return addWidget(request, reply);
    },
  );

  server.delete(
    '/widgets/:id',
    async function (request: FastifyRequest<{ Params: { id: string } }>, reply) {
      return removeWidget(request, reply);
    },
  );
};

export default widgets;
