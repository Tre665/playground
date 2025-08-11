import fp from 'fastify-plugin';
import { WidgetService } from '../services/widget.service';
import { InMemoryCache } from '../cache/in-memory-cache';
import { WeatherApiResponse } from '../types/open-weather.types';

export interface WidgetServicePluginOptions {
  // Specify Support plugin options here
}

/** This plugin adds the widget service to the Fastify instance */
export default fp<WidgetServicePluginOptions>(async (fastify, opts) => {
  const db = fastify.mongo?.db;
  if (!db) {
    throw new Error('MongoDB not available');
  }

  const weatherDataCache = new InMemoryCache<WeatherApiResponse>();

  const widgetService = new WidgetService(db, weatherDataCache);
  fastify.decorate('widgetService', widgetService);
});

declare module 'fastify' {
  interface FastifyInstance {
    widgetService: WidgetService;
  }
}
