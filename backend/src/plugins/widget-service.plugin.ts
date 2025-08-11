import fp from 'fastify-plugin';
import { WidgetService } from '../services/widget.service';
import { InMemoryCache } from '../cache/in-memory-cache';
import { WeatherApiResponse } from '../types/open-weather.types';

export interface WidgetServicePluginOptions {
  cacheTtl?: number;
}

/** This plugin adds the widget service to the Fastify instance */
export default fp<WidgetServicePluginOptions>(async (fastify, opts) => {
  const db = fastify.mongo?.db;
  if (!db) {
    throw new Error('MongoDB not available');
  }

  const weatherDataCache = new InMemoryCache<WeatherApiResponse>(opts.cacheTtl);

  const widgetService = new WidgetService(db, weatherDataCache);
  fastify.decorate('widgetService', widgetService);
});

declare module 'fastify' {
  interface FastifyInstance {
    widgetService: WidgetService;
  }
}
