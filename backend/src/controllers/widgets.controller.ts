import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateWidget, Widget } from '../models/widgets.models';
import { CreateWidgetPayload } from '../types/widgets.types';

/** Gets all widgets from the data store */
export const getAllWidgets = async (request: FastifyRequest, reply: FastifyReply) => {
  const db = request.server.mongo?.db;
  const widgets = await db?.collection<Widget>('widgets').find().toArray();
  return reply.send(widgets);
};

/** Adds a new widget to the data store */
export const addWidget = async (
  request: FastifyRequest<{ Body: CreateWidgetPayload }>,
  reply: FastifyReply,
) => {
  const { body, server } = request;
  const { location, userId } = body;

  if (!location) {
    return reply.status(400).send({ message: 'Location is required' });
  }

  const newWidget: CreateWidget = {
    location,
    userId: userId ? new server.mongo.ObjectId(userId) : null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const db = server.mongo?.db;
  const result = await db?.collection<CreateWidget>('widgets').insertOne(newWidget);

  const { acknowledged = false, insertedId = null } = result || {};

  if (!acknowledged || !insertedId) {
    return reply.status(500).send({ message: 'Failed to create widget' });
  }

  return reply.status(201).send({ _id: insertedId, ...newWidget });
};

export const removeWidget = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  const { params, server } = request;
  const id = params.id;

  if (!server.mongo.ObjectId.isValid(id)) {
    return reply.status(400).send({ message: 'Invalid id' });
  }

  const widgetId = new server.mongo.ObjectId(id);

  server.log.info(`Removing widget with id ${widgetId}`);

  const db = server.mongo?.db;
  const result = await db?.collection<Widget>('widgets').deleteOne({ _id: widgetId });

  const { acknowledged = false, deletedCount = 0 } = result || {};

  if (!acknowledged) {
    return reply.status(500).send({ message: 'Failed to delete widget' });
  }

  if (deletedCount < 1) {
    return reply.status(404).send({ message: 'Widget not found' });
  }

  return reply.status(204).send();
};
