import Fastify from 'fastify';
import dotenv from 'dotenv';
import { app } from './app';
import fastifyMongo from '@fastify/mongodb';
import fastifyCors from '@fastify/cors';
import { Env } from '../env';

dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const environment: Env = (process.env.NODE_ENV ?? 'development') as Env;
const cacheTtl = process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 5 * 60 * 1000;

// Configure logger
const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

// Instantiate Fastify with some config
const server = Fastify({
  logger: envToLogger[environment] ?? true,
});

// Setup connection to MongoDB
server.register(fastifyMongo, {
  url: process.env.MONGODB_URI,
  database: process.env.MONGODB_DB ?? 'weather-widgets',
  forceClose: true,
});

server.register(fastifyCors, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
});

// Register your application as a normal plugin.
server.register(app, { cacheTtl });

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    server.log.info(`[ ready ] http://${host}:${port}`);
  }
});
