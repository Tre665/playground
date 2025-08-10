import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateWidgetPayloadDto } from '../types/widgets.types';
import { WidgetService } from '../services/widget.service';

/** Gets all widgets from the data store */
export const getAllWidgets = async (request: FastifyRequest, reply: FastifyReply) => {
  const db = request.server.mongo?.db;
  if (!db) {
    request.log.error('Failed to connect to database');
    return reply.status(500).send({ message: 'Internal server error' });
  }
  const widgetService = new WidgetService(db);
  try {
    const widgets = await widgetService.fetchAllWidgets();
    return reply.send(widgets);
  } catch (err) {
    request.log.error(`Failed to fetch widgets \n${err}`);
    return reply.status(500).send({ message: 'Internal server error' });
  }
};

/** Adds a new widget to the data store */
export const addWidget = async (
  request: FastifyRequest<{ Body: CreateWidgetPayloadDto }>,
  reply: FastifyReply,
) => {
  const db = request.server.mongo?.db;
  if (!db) {
    request.log.error('Failed to connect to database');
    return reply.status(500).send({ message: 'Internal server error' });
  }

  const { location, userId } = request.body;

  const widgetService = new WidgetService(db);

  try {
    const newWidget = await widgetService.createWidget(location, userId);
    return reply.status(201).send(newWidget);
  } catch (err) {
    request.server.log.error(`Failed to create widget \n${err}`);
    return reply.status(500).send({ message: 'Internal server error' });
  }
};

/** Removes a widget from the data store */
export const removeWidget = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  const db = request.server.mongo?.db;
  if (!db) {
    request.log.error('Failed to connect to database');
    return reply.status(500).send({ message: 'Internal server error' });
  }

  const { id } = request.params;

  const widgetService = new WidgetService(db);

  try {
    const deletedCount = await widgetService.removeWidget(id);
    if (deletedCount < 1) {
      return reply.status(404).send({ message: 'Widget not found' });
    } else {
      return reply.status(204).send();
    }
  } catch (err) {
    return reply.status(500).send({ message: 'Internal server error' });
  }
};
