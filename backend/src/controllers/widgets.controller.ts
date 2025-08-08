import { FastifyRequest, FastifyReply } from 'fastify';
import { Widget } from '../models/widgets.models';

export const getAllWidgets = async (request: FastifyRequest, reply: FastifyReply) => {
  const db = request.server.mongo?.db;
  const widgets = await db?.collection<Widget>('widgets').find().toArray();
  return reply.send(widgets);
};
