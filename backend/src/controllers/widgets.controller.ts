import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateWidget, Widget } from '../models/widgets.models';
import { CreateWidgetPayload } from '../types/widgets.types';
import { ObjectId } from '@fastify/mongodb';

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
  const { location, userId } = request.body;

  if (!location) {
    return reply.status(400).send({ message: 'Location is required' });
  }

  const newWidget: CreateWidget = {
    location,
    userId: userId ? new ObjectId(userId) : null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const db = request.server.mongo?.db;
  const result = await db?.collection<CreateWidget>('widgets').insertOne(newWidget);

  if (!result?.insertedId || !result?.insertedId) {
    return reply.status(500).send({ message: 'Failed to create widget' });
  }

  return reply.status(201).send({ _id: result.insertedId, ...newWidget });
};
